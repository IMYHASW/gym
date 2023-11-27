/*
 * @Date: 2023-03-13 15:55:35
 * @Author: Wu Jialing
 * @LastEditTime: 2023-05-11 09:12:56
 * @FilePath: /adminfrontend/src/pages/MemberManagement/AddMember/index.jsx
 * @Description: 注册新会员
 */

import { Col, Form, Input, Row, message, Button, Radio, DatePicker, Upload } from "antd";
import Avatar from "antd";
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { useState } from "react";
import MemberServices from "../../../services/MemberServices";
import { memberConstant } from "../../Constant/AllConstant";
import axios from "axios";
import moment from "moment";

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

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
}

const beforeUpload = (file) => {
    const isJpgOrPng = (file.type === "image/jpeg" || file.type === "image/png");
    if (!isJpgOrPng) {
        message.error("只能上传 JPN/PNG 格式的图片！")
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error("图片大小不能超过 2MB!")
    }
    return isJpgOrPng && isLt2M
}



function AddMember() {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [avatar, setAvatar] = useState(null)
    const [imageUrl, setImageUrl] = useState();

    const onFinish = (values) => {
        console.log("registerNewMember-values", values)
        setLoading(true)
        const formData = new FormData();
        formData.append("username", values.username)
        formData.append("phoneNumber", values.phoneNumber)
        formData.append("password", values.password)
        if (!(values.gender === null || values.gender === "" || values.gender===undefined)) {
            formData.append("gender", values.gender)
        }
        if (!(values.birthday === null || values.birthday === "" || values.birthday===undefined)) {
            // let time = new Date(JSON.stringify(values.birthday))
            let time = moment(values.birthday).format('YYYY-MM-DD')
            console.log("birthday",time);
            formData.append("birthday", time)
        }
        if (!(values.address === null || values.address === "" || values.address===undefined)) {
            formData.append("address", values.address)
        }
        if (!(values.avatar === null || values.avatar === "" || values.avatar===undefined)) {
            formData.append("avatar", values.avatar)
        }
        if (!(values.height === null || values.height === "" || values.height===undefined)) {
            formData.append("height", values.height)
        }
        if (!(values.weight === null || values.weight === "" || values.weight===undefined)) {
            formData.append("weight", values.weight)
        }
        console.log("formData-height", formData.get("height"));
        console.log("formData-avatar", formData.get("avatar"));
        MemberServices.createMember(formData).then(
            (response) => {
                console.log("success-response", response);
                message.success("成功注册会员 " + response.data + " !")
                form.resetFields()
            }
        ).catch(error => {
            message.error(error.response.data + "，注册会员失败！")
        })
    }
    const onFinishFailed = (errorInfo) => {
        console.log("registerNewMember-errorInfo", errorInfo)
        message.error("注册会员失败: " + errorInfo.errorFields[0].errors)

    }
    const handleAvatarChange = (info) => {
        // console.log("2222");
        console.log(info);
        setAvatar(info.file.originFileObj)
        // if (info.file.status === "uploading") {
        //     setLoading(true)
        //     return;
        // }
        if (info.file.status === "done") {
            console.log("1111");
            setAvatar(info.file.originFileObj)
            // getBase64(info.file.originFileObj, (url) => {
            // setLoading(false)
            // setImageUrl(url)
            // })
        }
    }
    const uploadButton = (
        <div >
            {loading ? <div><LoadingOutlined /><div >Upload</div></div>
                :
                <div><PlusOutlined /><div >Upload</div></div>}
            {/* <div >Upload</div> */}
        </div>
    )
    const normFile = (e) => {
        console.log("Upload event:", e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    }
    return (
        <Row >
            <Col span={1}></Col>
            <Col span={22} style={{ padding: "40px", backgroundColor: "rgba(255,255,255,1)", alignContent: "center" }}>
                <div
                    style={{
                        textAlign: "center",
                        fontFamily: "serif",
                        fontSize: "35px",
                        padding: "20px",
                    }}>
                    添加新会员
                </div>
                <div>
                    <Form
                        {...formItemLayout}
                        form={form}
                        name="register-new-member"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        style={{
                            maxWidth: "100%",
                        }}
                        // autoComplete="false"
                        size="large"
                    >
                        <Form.Item
                            label="用户名"
                            name={memberConstant.username}
                            rules={[{
                                required: true,
                                message: "用户名不能为空"
                            }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="手机号"
                            name={memberConstant.phoneNumber}
                            rules={[{
                                required: true,
                                message: "手机号不能为空"
                            }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={memberConstant.password}
                            label="密码"
                            rules={[{
                                required: true,
                                message: "请输入密码！"
                            }]}
                            hasFeedback
                        >
                            <Input.Password autoComplete="on" />
                        </Form.Item>
                        <Form.Item
                            name="confirm"
                            label="确认密码"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: "请确认你的密码"
                                }, ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve()
                                        }
                                        return Promise.reject(new Error('两次密码输入不一致！'))
                                    }
                                })
                            ]}
                        >
                            <Input.Password autoComplete="on" />
                        </Form.Item>
                        <Form.Item
                            label="性别"
                            name={memberConstant.gender}
                        >
                            <Radio.Group>
                                <Radio value="男">男</Radio>
                                <Radio value="女">女</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="生日"
                            name={memberConstant.birthday}
                        >
                            <DatePicker />
                        </Form.Item>
                        <Form.Item
                            label="地址"
                            name="address"
                        >
                            <Input />
                        </Form.Item>
                        {/* <Form.Item
                            label="照片"
                            name={memberConstant.avatar}
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                        >
                            <Upload
                                name={memberConstant.photo}
                                listType="picture-card"
                                // action={null}
                                // maxCount={1}
                                beforeUpload={beforeUpload}
                                onChange={handleAvatarChange}
                            >
                                {
                                    imageUrl ? (
                                        <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                                    ) : (
                                        uploadButton
                                    )
                                }
                            </Upload>
                        </Form.Item> */}
                        <Form.Item
                            label="身高/cm"
                            name={memberConstant.height}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="体重/kg"
                            name={memberConstant.weight}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 12, span: 16, }}>
                            <Button type="primary" htmlType="submit">注册</Button>
                        </Form.Item>

                    </Form>
                </div>
            </Col>
            <Col span={1}></Col>
        </Row>
    );
}

export default AddMember;