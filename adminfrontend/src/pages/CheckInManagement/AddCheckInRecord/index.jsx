/*
 * @Date: 2023-03-12 23:09:13
 * @Author: Wu Jialing
 * @LastEditTime: 2023-05-16 08:40:16
 * @FilePath: /adminfrontend/src/pages/CheckInManagement/AddCheckInRecord/index.jsx
 * @Description: 添加签到/签退记录
 */

import { Button, Col, Form, Input, Radio, Row, message, Space } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CheckInService from "../../../services/CheckInService";

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 6,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 14,
        },
    },
};

function AddCheckInRecord() {
    const [form] = Form.useForm()
    const navigate = useNavigate();
    const onFinish = (values) => {
        const AddCheckInVo = {
            "checkInMethod": values.checkInMethod,
            "number": values.number,
            "operator": window.localStorage.getItem("adminUsername"),
        }
        console.log("AddCheckInVo", AddCheckInVo)
        CheckInService.addCheckIn(AddCheckInVo).then(
            (response) => {
                message.success(response.data)
                form.resetFields()
                // navigate("/app/checkinmanagement/checkinrecordlist")
            }
        ).catch(
            (error) => {
                console.log("@@2", error)
                message.error(error.response.data)
            })
    }
    const onFinishFailed = (errorInfo) => {
        console.log("add-record-onFinishFailed-errorInfo", errorInfo)
        // message.success("333")
        message.error("签到失败: " + errorInfo.errorFields[0].errors)

    }
    return (
        <div>
            <Row>
                <Col span={1}></Col>
                <Col span={22} style={{
                    backgroundColor: "rgba(255,255,255,1)",
                    alignContent: "center"
                }}>
                    <div
                        style={{
                            textAlign: "center",
                            fontFamily: "serif",
                            fontSize: "35px",
                            padding: "20px",
                        }}>
                        添加签到记录
                    </div>
                    <div style={{ marginTop: "20px" }}>
                        <Form
                            {...formItemLayout}
                            name="add-record"
                            layout="horizontal"
                            style={{
                                maxWidth: "100%",
                            }}
                            form={form}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            size="large"
                        >
                            <Form.Item
                                label="签到方式"
                                name="checkInMethod"
                                rules={[{
                                    required: true,
                                    message: "签到方式不能为空！"
                                }]}>
                                <Radio.Group >
                                    <Space>
                                        {/* <Radio value={"手机号"}>手机号</Radio> */}
                                        <Radio value={"会员卡号"}>会员卡号</Radio>
                                    </Space>

                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                label="卡号"
                                rules={[{
                                    required: true,
                                    message: "会员卡号不能为空！"
                                }]}
                                name="number"
                            >
                                <Input maxLength={10}></Input>
                            </Form.Item>
                            <Form.Item
                                wrapperCol={{
                                    offset: 12,
                                    span: 16,
                                }}>
                                <Button type="primary" htmlType="submit">签到</Button>
                            </Form.Item>

                        </Form>
                    </div>
                </Col>
                <Col span={1}></Col>
            </Row>
        </div>);
}

export default AddCheckInRecord;
