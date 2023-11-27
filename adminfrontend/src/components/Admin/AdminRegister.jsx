import React, { useState } from "react";
import { Button, Checkbox, Col, Form, Input, Row, Select } from "antd";
import { Navigate, useNavigate } from "react-router-dom";
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

export default function AdminRegister() {
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminConfirmPassword, setAdminConfirmPassword] = useState("");
  const [adminPhone, setAdminPhone] = useState("");
  const [adminGender, setAdminGender] = useState("");
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const createAdmin = (e) => {
    const admin = { adminUsername, adminPassword, adminPhone, adminGender };
    if (
      adminUsername !== "" &&
      adminPassword !== "" &&
      adminConfirmPassword !== "" &&
      adminPhone !== "" &&
      adminGender !== ""
    ) {
      console.log("admin:", admin);

      var pattern = /^\w{6,18}$/; //长度在6-18之间，只能包含字符、数字和下划线
      var pattern2 = /^1\d{10}/; //以1开头，由数字组成的的长度为11的字符串
      if (!pattern.test(adminUsername)) {
        alert("用户名不符合规范");
        return Promise.reject(
          new Error("用户名长度在6-18之间,只能包含字符、数字和下划线")
        );
      } else if (!pattern.test(adminPassword)) {
        alert("密码不符合规范");
        return Promise.reject(
          new Error("密码长度在6-18之间,只能包含字符、数字和下划线")
        );
      } else if (!(adminPassword === adminConfirmPassword)) {
        alert("两次密码请保持一致");
        return Promise.reject(new Error("两次密码请保持一致"));
      } else if (!pattern2.test(adminPhone)) {
        alert("请输入正确的手机号");
        return Promise.reject(new Error("手机号格式有误"));
      }

      AdminService.createAdmin(admin)
        .then((response) => {
          console.log("createAdmin-response.data:", response.data);
          if (response.data === "Register successfully") {
            navigate("/"); //adminLogin
          } else {
            alert(response.data);
          }
        })
        .catch((error) => {
          console.log("@@Error", error);
        });
    } else {
      alert("填写信息不能存在空值")
      console.log("注册信息存在空值");
    }
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
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

  return (
    <div>
      <Row>
        <Col span={8}></Col>
        <Col span={8} style={{ paddingTop: "150px" }}>
          <Form
            size="large"
            {...formItemLayout}
            form={form}
            name="register"
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            scrollToFirstError
            initialValues={{ prefix: "86" }}
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
                    // console.log("@getFieldValue",value)
                    var pattern = /^\w{6,18}$/; //长度在6-18之间，只能包含字符、数字和下划线
                    if (!pattern.test(value)) {
                      return Promise.reject(
                        new Error(
                          "用户名长度在6-18之间,只能包含字符、数字和下划线"
                        )
                      );
                    }
                  },
                }),
              ]}
            >
              <Input
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="密码"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    // console.log("@getFieldValue",value)
                    var pattern = /^\w{6,18}$/; //长度在6-18之间，只能包含字符、数字和下划线
                    if (!pattern.test(value)) {
                      return Promise.reject(
                        new Error(
                          "密码长度在6-18之间,只能包含字符、数字和下划线"
                        )
                      );
                    }
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="再次确认密码"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    // console.log("@getFieldValue",value)
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                value={adminConfirmPassword}
                onChange={(e) => setAdminConfirmPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="phone"
              label="请输入你的手机号"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    // console.log("@getFieldValue",value)
                    var pattern = /^1\d{10}/; //以1开头，由数字组成的的长度为11的字符串
                    if (!pattern.test(value)) {
                      return Promise.reject(
                        new Error("手机号格式有误，请输入正确的手机号")
                      );
                    } else {
                      return Promise.resolve();
                    }
                  },
                }),
              ]}
            >
              <Input
                addonBefore={prefixSelector}
                style={{
                  width: "100%",
                }}
                value={adminPhone}
                onChange={(e) => setAdminPhone(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="gender"
              label="性别"
              rules={[
                {
                  required: true,
                  message: "Please select gender!",
                },
              ]}
            >
              <Select
                placeholder="选择你的性别"
                onChange={(value) => setAdminGender(value)}
              >
                <Option value="male">男</Option>
                <Option value="female">女</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error("Should accept agreement")),
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox>
                I have read the <a href="">agreement</a>
              </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={(e) => createAdmin(e)}
              >
                注册
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={8}></Col>
      </Row>
    </div>
  );
}
// export default AdminRegister;
