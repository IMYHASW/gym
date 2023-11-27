import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import AdminService from "../../services/AdminService";
const { Option } = Select;
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
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
export default function ForgetPassword() {
  const [form] = Form.useForm();
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPhone, setAdminPhone] = useState("");
  const [adminNewPassword, setAdminNewPassword] = useState("");
  const navigate = useNavigate();
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  const changePassword = () => {
    console.log("changePassword", adminUsername, adminNewPassword, adminPhone);
    if (adminUsername !== "" && adminPhone !== "" && adminNewPassword !== "") {
      var pattern = /^\w{6,18}$/; //长度在6-18之间，只能包含字符、数字和下划线
      var pattern2 = /^1\d{10}/; //以1开头，由数字组成的的长度为11的字符串
      if (!pattern.test(adminUsername)) {
        alert("用户名不符合规范");
        return Promise.reject(
          new Error("用户名长度在6-18之间,只能包含字符、数字和下划线")
        );
      } else if (!pattern.test(adminNewPassword)) {
        alert("密码不符合规范");
        return Promise.reject(
          new Error("密码长度在6-18之间,只能包含字符、数字和下划线")
        );
      } else if (!pattern2.test(adminPhone)) {
        alert("请输入正确的手机号");
        return Promise.reject(new Error("手机号格式有误"));
      }

      AdminService.forgetPassword(adminUsername, adminNewPassword, adminPhone)
        .then((response) => {
          console.log("forgetPassword:response.data", response.data);
          if (response.data === "" || response.data === null) {
            alert("密码修改失败");
          } else {
            alert("密码修改成功，请重新登录");
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("填写信息不能存在空值");
      console.log("填写信息不能存在空值");
    }
  };
  //   const onFinish = (values) => {
  //     console.log("Received values of form: ", values);
  //   };

  return (
    <div>
      <Row>
        <Col span={8}></Col>
        <Col span={8}>
          <Form
            style={{ paddingTop: "120px" }}
            size="large"
            {...formItemLayout}
            form={form}
            name="changePassword"
            // onFinish={onFinish}
            initialValues={{
              prefix: "86",
            }}
            scrollToFirstError
          >
            <Form.Item
              name="username"
              label="用户名"
              tooltip="用户名将会用于账号登录,长度在6-18之间,只能包含字符、数字和下划线"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                  whitespace: true,
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    var pattern = /^\w{6,18}$/; //长度在6-18之间，只能包含字符、数字和下划线
                    if (!pattern.test(value)) {
                      return Promise.reject(
                        new Error(
                          "用户名长度在6-18之间,只能包含字符、数字和下划线"
                        )
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input
                value={adminUsername}
                onChange={(e) => {
                  setAdminUsername(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item
              name="newPassword"
              label="新密码"
              rules={[
                {
                  required: true,
                  message: "Please input your new password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    var pattern = /^\w{6,18}$/; //长度在6-18之间，只能包含字符、数字和下划线
                    if (!pattern.test(value)) {
                      return Promise.reject(
                        new Error(
                          "密码长度在6-18之间,只能包含字符、数字和下划线"
                        )
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password
                value={adminNewPassword}
                onChange={(e) => {
                  setAdminNewPassword(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item
              name="phone"
              label="绑定的手机号"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
                {
                  pattern: /^1\d{10}$/,
                  message: "手机号格式错误！",
                },
              ]}
            >
              <Input
                addonBefore={prefixSelector}
                style={{
                  width: "100%",
                }}
                onChange={(e) => setAdminPhone(e.target.value)}
              />
            </Form.Item>

            {/* <Form.Item
              label="验证码"
              extra="We must make sure that your are a human."
            >
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    name="captcha"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: "Please input the captcha you got!",
                      },
                    ]}
                    captchaTextRender={(timing, count) => {
                      if (timing) {
                        return `${count} ${"获取验证码"}`;
                      }
                      return "获取验证码";
                    }}
                    onGetCaptcha={async () => {
                      message.success("获取验证码成功！验证码为：1234");
                    }}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Button>获取验证码</Button>
                </Col>
              </Row>
            </Form.Item> */}

            <Form.Item {...tailFormItemLayout}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginLeft: "165px", marginTop: "30px" }}
                onClick={changePassword}
              >
                确认修改
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={8}></Col>
      </Row>
    </div>
  );
}
