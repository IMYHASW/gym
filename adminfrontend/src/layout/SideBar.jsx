import React, { useEffect, useState } from "react";
import {
  DesktopOutlined,
  PayCircleOutlined,
  PieChartOutlined,
  UserOutlined,
  CarryOutOutlined,
  AppstoreOutlined,
  AccountBookOutlined
} from "@ant-design/icons";
import { Menu, Layout } from "antd";
import "../App.css";
import { useLocation, useNavigate } from "react-router-dom";

const { Sider } = Layout;
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("个人中心", "individual-center", <UserOutlined />, [
    getItem("修改资料", "modify-data"),
    getItem("修改密码", "modify-password"),
    // getItem("修改头像", "modify-picture"),
  ]),
  getItem("会员打卡管理", "check-in-management", <CarryOutOutlined />, [
    getItem("会员打卡", "check-in-management-add"),
    getItem("打卡记录", "check-in-management-list"),
  ]),
  getItem("教练管理", "coach-management", <UserOutlined />, [
    getItem("教练列表", "coach-list"),
    getItem("注册教练信息", "add-coach")
  ]),
  getItem("会员管理", "member-management", <UserOutlined />, [
    getItem("会员列表", "member-management-list"),
    getItem("注册会员", "member-management-add"),
  ]),
  getItem("会员卡管理", "member-card-management", <PieChartOutlined />, [
    getItem("会员卡注册/续费", "member-card-management-add"),
    getItem("已注册会员卡列表", "member-card-management-list"),
    getItem("设计会员卡","member-card-management-design"),
    getItem("已有会员卡种类","member-card-management-design-list"),
  ]),
  getItem("课程管理", "class-management", <AppstoreOutlined />, [
    getItem("课程列表", "classes-list"),
    getItem("创建课程", "add-class"),
  ]
  ),
  getItem("订单管理", "order-management", <AccountBookOutlined />, [
    getItem("全部订单", "orders-list"),
  ]),
  getItem("器材管理", "equipment-management", <AppstoreOutlined />, [
    getItem("全部器材", "equipment-management-list"),
    getItem("添加器材", "equipment-management-add"),
  ]),
  // getItem("财务管理", "financial-management", <PayCircleOutlined />, [
  //   getItem("回款计划", "receivable-plan"),
  //   getItem("回款管理", "receivable-management"),
  //   getItem("发票管理", "invoice-management"),
  //   getItem("费用管理", "expense-management"),
  //   getItem("报销管理", "reimbursement-management"),
  // ]),
];

const SideBar = (props) => {
  const [current, setCurrent] = useState("");
  const [fatherKey, setFatherKey] = useState();
  const setItem = props.setItem;
  const navigate = useNavigate();

  const { pathname } = useLocation();
  useEffect(() => {
    setItem(items);
  },[])

  useEffect(() => {
    let path = pathname.split("/")[3];
    setCurrent(path)
  }, [pathname]);

  const onClick = (e) => {
    console.log("sideBar-e", e);
    setCurrent(e.key);
    navigate(`./${e.keyPath[1]}/${e.keyPath[0]}`);
  };
  return (
    //style={{ overflow: "auto",position:'fixed'}}
    <Sider
      style={{
        overflow: "auto", //‘auto’：元素溢出时显示滚动条
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
      width="200px"
    >
      <div className="introduce">健身房管理系统</div>
      <Menu
        theme="dark"
        onClick={onClick}
        selectedKeys={current}
        openKeys={fatherKey}
        onOpenChange={(openKeys) => {
          setFatherKey(openKeys);
        }}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

export default SideBar;
