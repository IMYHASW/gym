import React, { useState } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import { useNavigate } from "react-router-dom";
import AdminService from "../../services/AdminService";

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
export default function ChangePassword() {
  const [form] = Form.useForm();
  const [adminUsername, setAdminUsername] = useState("");
  const [adminOldPassword, setAdminOldPassword] = useState("");
  const [adminNewPassword, setAdminNewPassword] = useState("");
  const navigate = useNavigate();

  const changePassword = () => {
    var pattern = /^\w{6,18}$/; //长度在6-18之间，只能包含字符、数字和下划线
    if (
      adminUsername !== "" &&
      adminOldPassword !== "" &&
      adminNewPassword !== ""
    ) {
      if (!pattern.test(adminUsername)) {
        alert("用户名不符合规范");
        return Promise.reject(
          new Error("用户名长度在6-18之间,只能包含字符、数字和下划线")
        );
      } else if (!pattern.test(adminOldPassword)) {
        alert("旧密码输入不符合规范");
        return Promise.reject(
          new Error("密码长度在6-18之间,只能包含字符、数字和下划线")
        );
      } else if (!pattern.test(adminNewPassword)) {
        alert("新密码输入不符合规范");
        return Promise.reject(
          new Error("密码长度在6-18之间,只能包含字符、数字和下划线")
        );
      }

      AdminService.changePassword(
        adminUsername,
        adminOldPassword,
        adminNewPassword
      )
        .then((response) => {
          console.log("changepassword:response.data", response.data);
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
              name="oldPassword"
              label="原密码"
              rules={[
                {
                  required: true,
                  message: "Please input your old password!",
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
                value={adminOldPassword}
                onChange={(e) => {
                  setAdminOldPassword(e.target.value);
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
