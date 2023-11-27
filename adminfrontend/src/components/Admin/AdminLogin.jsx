import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from "@ant-design/icons";
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from "@ant-design/pro-components";
import { message, Space, Tabs } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminService from "../../services/AdminService";
import { getValue } from "@testing-library/user-event/dist/utils";
const iconStyles = {
  marginInlineStart: "16px",
  color: "rgba(0, 0, 0, 0.2)",
  fontSize: "24px",
  verticalAlign: "middle",
  cursor: "pointer",
};
function AdminLogin() {
  const [loginType, setLoginType] = useState("account");

  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminPhone, setAdminPhone] = useState("");
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    const admin = { adminUsername, adminPassword };
    console.log("onfinish:", admin);
    if (
      adminUsername !== "" &&
      adminPassword !== "" &&
      adminUsername.length !== 0 &&
      adminPassword.length !== 0
    ) {
      AdminService.adminLogin(admin)
        .then((response) => {
          console.log("adminLogin-response.data:", response.data);
          if (response.data.adminUsername == admin.adminUsername) {
            window.localStorage.setItem("adminUsername",adminUsername)
            navigate("/dashboard/check-in-management/check-in-management-add");
            // navigate("/dashboard?username="+adminUsername);
          } else {
            alert("用户名或者密码有误", response.data);
          }
        })
        .catch((error) => {
          console.log("@@Error", error);
        });
    } else {
      console.log("不能为空");
    }
  };

  return (
    <div style={{ backgroundColor: "white"}}>
      <LoginForm
        logo="logo192.png"
        title="好身材健身房"
        subTitle="好身材健身房管理后台系统"
        // actions={
        //   <Space>
        //     其他登录方式
        //     <AlipayCircleOutlined style={iconStyles} />
        //     <TaobaoCircleOutlined style={iconStyles} />
        //     <WeiboCircleOutlined style={iconStyles} />
        //   </Space>
        // }
        onFinish={onFinish}
        // onValuesChange={(changeValues) => {
        //   console.log("LoginForm-changeValues:", changeValues);
        //   setAdminUsername(changeValues.adminUsername)
        //   setAdminPassword(changeValues.adminPassword)
        //   console.log("@@##",adminUsername,adminPassword)
        // }}
      >
        <Tabs
          centered
          activeKey={loginType}
          onChange={(activeKey) => setLoginType(activeKey)}
        >
          <Tabs.TabPane key={"account"} tab={"账号密码登录"} />
          {/* <Tabs.TabPane key={"phone"} tab={"手机号登录"} /> */}
        </Tabs>
        {loginType === "account" && (
          <>
            <ProFormText
              name="adminUsername"
              fieldProps={{
                size: "large",
                prefix: <UserOutlined className={"prefixIcon"} />,
              }}
              placeholder={"用户名"}
              rules={[
                {
                  required: true,
                  message: "请输入用户名!",
                },
                {
                  pattern: /^\w{6,18}$/,
                  message: "用户名长度在6-18之间,只能包含字符、数字和下划线",
                },
              ]}
              onChange={(e) => {
                setAdminUsername(e.target.value);
              }}
            />

            <ProFormText.Password
              name="adminPassword"
              fieldProps={{
                size: "large",
                prefix: <LockOutlined className={"prefixIcon"} />,
              }}
              placeholder={"密码"}
              rules={[
                {
                  required: true,
                  message: "请输入密码！",
                },
                {
                  pattern: /^\w{6,18}$/,
                  message: "密码长度在6-18之间,只能包含字符、数字和下划线",
                },
              ]}
              onChange={(e) => {
                setAdminPassword(e.target.value);
              }}
            />
          </>
        )}
        {/* {loginType === "phone" && (
          <>
            <ProFormText
              fieldProps={{
                size: "large",
                prefix: <MobileOutlined className={"prefixIcon"} />,
              }}
              name="adminPhone"
              placeholder={"手机号"}
              rules={[
                {
                  required: true,
                  message: "请输入手机号！",
                },
                {
                  pattern: /^1\d{10}$/,
                  message: "手机号格式错误！",
                },
              ]}
              onChange={(e) => {
                setAdminPhone(e.target.value);
              }}
            />
            <ProFormCaptcha
              fieldProps={{
                size: "large",
                prefix: <LockOutlined className={"prefixIcon"} />,
              }}
              captchaProps={{
                size: "large",
              }}
              placeholder={"请输入验证码"}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${"获取验证码"}`;
                }
                return "获取验证码";
              }}
              name="captcha"
              rules={[
                {
                  required: true,
                  message: "请输入验证码！",
                },
              ]}
              onGetCaptcha={async () => {
                message.success("获取验证码成功！验证码为：1234");
              }}
            />
          </>
        )} */}
        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          {/* <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox> */}
          <div
            style={{
              float: "right",
            }}
          >
            <Link to="/changepassword">修改密码</Link>
            &nbsp;&nbsp;&nbsp;
            <Link to="/forgetpassword">忘记密码</Link>
            &nbsp;&nbsp;&nbsp;
            <Link to="/adminRegister">
              {/* <a>注册</a> */}
              注册
            </Link>
          </div>
        </div>
      </LoginForm>
    </div>
  );
}

export default AdminLogin;
