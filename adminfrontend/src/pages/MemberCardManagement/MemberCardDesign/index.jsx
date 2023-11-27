/*
 * @Date: 2023-03-15 10:26:45
 * @Author: Wu Jialing
 * @LastEditTime: 2023-04-21 17:35:13
 * @FilePath: /adminfrontend/src/pages/MemberCardManagement/MemberCardDesign/index.jsx
 * @Description: 设计会员卡
 */
import { Col, Form, Input, Row, message, Button, Radio, DatePicker, Upload, Space } from "antd";
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { useState } from "react";
import { Group } from "@ant-design/pro-components";
import MemberCardDesignService from "../../../services/MemberCardDesignService";

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
function MemberCardDesign() {
    const [form] = Form.useForm()
    const [isTimesCard, setIsTimesCard] = useState(false)
    const onFinish = (values) => {
        console.log("MemberCardDesign-onFinish", values)
        const MemberCardDesign = {
            "type": values.type,
            "duration": isTimesCard ? values.durationTimes : values.duration,
            "durationUnit": isTimesCard ? values.durationUnitTmes : values.durationUnit,
            "price": values.price,
            "used": values.used
        }
        MemberCardDesignService.createMemberCardDesign(MemberCardDesign).then((response) => {
            console.log("response", response)
            if (response.data.result === "succeed") {
                message.success(response.data.message)
            } else if (response.data.result === "failed") {
                message.error(response.data.message)
            }
        })
    }
    const onFinishFailed = (errorInfo) => {
        console.log("MemberCardDesign-onFinishFailed", errorInfo)
        message.error("存在错误信息：" + errorInfo.errorFields[0].errors)
    }
    const onReset = () => {
        form.resetFields();
    }
    return (
        <Row>
            <Col span={1}></Col>
            <Col span={22} style={{ padding: "40px", backgroundColor: "rgba(255,255,255,1)", alignContent: "center" }}>
                <div style={{
                    textAlign: "center",
                    fontFamily: "serif",
                    fontSize: "35px",
                    padding: "20px",
                }}>
                    添加会员卡种类
                </div>
                <div>
                    <Form
                        {...formItemLayout}
                        form={form}
                        name="member-card-design"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        style={{
                            maxWidth: "100%",
                        }}
                        size="large"
                    >
                        <Form.Item
                            label="会员卡类型"
                            name="type"
                            rules={[{
                                required: true,
                                message: "请选择会员卡类型"
                            }]}
                        >
                            <Radio.Group>
                                <Radio value="消费卡">消费卡</Radio>
                             </Radio.Group>
                        </Form.Item>

                        <Form.Item
                            label="期限单位"
                            name="durationUnit"
                            rules={[{
                                required: true,
                                message: "请选择会员卡期限单位"
                            }]}
                        >
                            <Radio.Group>
                                <Radio value="日" >日</Radio>
                                <Radio value="周" >周</Radio>
                                <Radio value="月" >月</Radio>
                                <Radio value="季" >季</Radio>
                                <Radio value="年" >年</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item
                            label="期限（时间限制）"
                            name="duration"
                            rules={[{
                                required: true,
                                message: "请选择会员卡期限"
                            }]}
                        >
                            <Radio.Group>
                                <Radio value="1">1</Radio>
                                <Radio value="2">2</Radio>
                                <Radio value="3">3</Radio>
                                <Radio value="4">4</Radio>
                                <Radio value="5">5</Radio>
                                <Radio value="6">6</Radio>
                            </Radio.Group>

                        </Form.Item>



                        <Form.Item
                            label="会员卡价格"
                            name="price"
                            rules={[{
                                required: true,
                                message: "价格不能为空"
                            }]}
                        >
                            <Input suffix="￥ RMB" />
                        </Form.Item>
                        <Form.Item
                            label="是否启用"
                            name="used"
                            rules={[{
                                required: true,
                                message: "请选择是否启用"
                            }]}>
                            <Radio.Group>
                                <Radio value={true}>启用</Radio>
                                <Radio value={false}>禁用</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
                            <Space>
                                <Button type="primary" htmlType="sumbit">
                                    新增
                                </Button>
                                <Button htmlType="button" onClick={onReset}>
                                    重置
                                </Button>
                            </Space>

                        </Form.Item>
                    </Form>
                </div>
            </Col>
            <Col span={1}></Col>
        </Row>
    );
}

export default MemberCardDesign;
