import React from 'react';
import { Col, Form, Input, Row, message, Button, Radio, DatePicker, Upload } from "antd";
import { useState } from "react";
import AdminService from '../../../services/AdminService';
import { memberConstant } from "../../Constant/AllConstant";



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

function ModifyData() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [avatar, setAvatar] = useState(null)
  const [imageUrl, setImageUrl] = useState();

  const onFinish = (values) => {
      console.log("registerNewMember-values", values)
      setLoading(true)
      const formData = new FormData();
      formData.append("username", window.localStorage.getItem("adminUsername"))
      formData.append("phoneNumber", values.phoneNumber)
      if (!(values.gender === null || values.gender === "" || values.gender===undefined)) {
          formData.append("gender", values.gender)
      }
      AdminService.changeMessage(formData).then(
          (response) => {
              console.log("success-response", response);
              message.success("修改成功 " + response.data + " !")
              form.resetFields()
          }
      ).catch(error => {
          message.error(error.response.data + "，修改失败！")
      })
  }
  const onFinishFailed = (errorInfo) => {
      console.log("registerNewMember-errorInfo", errorInfo)
      message.error("修改失败: " + errorInfo.errorFields[0].errors)

  }
  console.log("用户名："+ window.localStorage.getItem("adminUsername"));
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
                  修改资料
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
                              disabled: true,
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
                          label="性别"
                          name={memberConstant.gender}
                      >
                          <Radio.Group>
                              <Radio value="男">男</Radio>
                              <Radio value="女">女</Radio>
                          </Radio.Group>
                      </Form.Item>
                      <Form.Item wrapperCol={{ offset: 12, span: 16, }}>
                          <Button type="primary" htmlType="submit">修改</Button>
                      </Form.Item>

                  </Form>
              </div>
          </Col>
          <Col span={1}></Col>
      </Row>
  );
}

export default ModifyData;
