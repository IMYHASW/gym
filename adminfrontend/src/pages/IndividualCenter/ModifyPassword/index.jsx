import React from "react";
import { Button, Form, Input, Divider } from "antd";
// import "./modifyPassword.css";
import "../modify.css"
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 14,
    span: 16,
  },
};
export default function ModifyPassword() {
  const [form] = Form.useForm();
  const onFinish = (value) => {
    console.log("modify-password-finish:value", value);
  };
  return (
    <div className="modify">
      <div className="modify-header">
        <div className="modify-header-left">
          <span>修改密码</span>
        </div>
        <div className="modify-header-right">
          <span style={{ color: "#FF3B30" }}>*</span>
          &nbsp;&nbsp;&nbsp;
          <span>为必填项</span>
        </div>
      </div>
      <Divider />
      <div className="modify-container">
        <Form
          {...formItemLayout}
          form={form}
          name="modify-password"
          onFinish={onFinish}
          size="large"
        >
          <Form.Item
            name="oldPassword"
            label="原密码"
            rules={[
              {
                required: true,
                message: "请输入您的原密码",
              },
            ]}
            hasFeedback
          >
            <Input.Password></Input.Password>
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="新密码"
            rules={[
              {
                required: true,
                message: "请设置你的新密码",
              },
            ]}
            hasFeedback
          >
            <Input.Password></Input.Password>
          </Form.Item>
          <Form.Item
            name="confirm"
            label="再次确认新密码"
            dependencies={["newPassword"]}
            hasFeedback
            rules={[
              {
                reuqired: true,
                message: "请与新密码保持一致",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("两次密码输入不一致！"));
                },
              }),
            ]}
          >
            <Input.Password></Input.Password>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              提交修改
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
