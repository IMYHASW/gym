/*
 * @Date: 2023-03-13 22:55:20
 * @Author: Wu Jialing
 * @LastEditTime: 2023-04-20 23:06:53
 * @FilePath: /adminfrontend/src/pages/MemberCardManagement/AddMemberCard/index.jsx
 * @Description: 
 */
import { Col, Form, Input, Row, message, Button, Radio, Space } from "antd";
import { useEffect, useState } from "react";
import MemberCardDesignService from "../../../services/MemberCardDesignService";
import MemberCardService from "../../../services/MemberCardService";
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
function AddMemberCard() {
    const [form] = Form.useForm()
    const [memberCardDesigns, setMemberCardDesigns] = useState([])
    const onFinish = (values) => {
        console.log("AddMemberCard-values", values)
        const formData = new FormData()
        formData.append("memberBindingMethod",values.memberBindingMethod)
        formData.append("number",values.number)
        formData.append("memberCardDesignId",values.memberCardDesignId)
        if(!(values.remark === null || values.remark === ""||values.remark === undefined)){
            formData.append("remark",values.remark)
        }
        MemberCardService.addMemberCard(formData).then(
            response => {
                message.success(response.data)
                form.resetFields()
            },
        ).catch(error=>{
                message.error(error.response.data)
            }) 
    }
    const onFinishFailed = (errorInfo) => {
        console.log("AddMemberCardd-errorInfo", errorInfo)
        message.error("注册会员卡: " + errorInfo.errorFields[0].errors)
    }
    const getMemberCardsType = () => {
        const tempMemberCardDesigns = []
        MemberCardDesignService.getAllMemberCardDesignWhichIsUsed().then(
            response => {
                response.data.map(memberCardDesign => {
                    tempMemberCardDesigns.push({
                        "key":memberCardDesign.id,
                        "id": memberCardDesign.id,
                        "type": memberCardDesign.type,
                        "duration": memberCardDesign.duration,
                        "durationUnit": memberCardDesign.durationUnit,
                        "price": memberCardDesign.price,
                    })
                })
                setMemberCardDesigns(tempMemberCardDesigns)
                console.log("memberCardDesigns",memberCardDesigns)
            }
        )
    }

    useEffect(() => {
        getMemberCardsType()
    }, [])
    return (
        <Row>
            <Col span={1}></Col>
            <Col span={22} style={{ padding: "40px", backgroundColor: "rgba(255,255,255,1)", alignContent: "center" }}>
                <div
                    style={{
                        textAlign: "center",
                        fontFamily: "serif",
                        fontSize: "35px",
                        padding: "20px",
                    }}>
                    开通会员卡/会员卡续费
                </div>
                <div>
                    <Form
                        {...formItemLayout}
                        form={form}
                        name="register-new-member-card"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        style={{
                            maxWidth: "100%",
                        }}
                        size="large"
                    >
                        <Form.Item
                            label="会员绑定方式"
                            name="memberBindingMethod"
                            rules={[{
                                required: true,
                                message: "会员绑定方式不能为空"
                            }]}>
                            <Radio.Group>
                                <Radio value="phoneNumber">通过手机号绑定</Radio>
                                <Radio value="memberId">通过会员ID绑定</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="绑定号码"
                            name="number"
                            rules={[{
                                required: true,
                                message: "绑定号码不能为空"
                            }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="成为会员"
                            name="memberCardDesignId"
                            rules={[{
                                required: true,
                                message: "请选择办卡类型"
                            }]}>
                            <Radio.Group>
                
                                {/* <Space wrap size="middle" align="start">
                                     */}
                                     <Row>
                                     {
                                    memberCardDesigns.map((memberCardDesign) => {
                                        return (
                                        <Col span={4} key={memberCardDesign.id}>
                                            <Radio key={memberCardDesign.id} value={memberCardDesign.id}>
                                            ￥{memberCardDesign.price}元 / {memberCardDesign.duration}{memberCardDesign.durationUnit}
                                        </Radio>
                                        </Col>
                                        )
                                    })
                                } 
                                     </Row>
                                {/* </Space> */}
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="备注"
                            name="remark"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 11, span: 16, }}>
                            <Button type="primary" htmlType="submit">立即开通</Button>
                        </Form.Item>

                    </Form>
                </div>
            </Col>
            <Col span={1}></Col>
        </Row>
    );
}

export default AddMemberCard;
