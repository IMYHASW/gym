import React, { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";

import "../App.css";
import { Button, Dropdown, Menu, Space } from "antd";
import Search from "antd/lib/transfer/search";

const items = [
  {
    key: "1",
    label: (<Link to="check-in-management/check-in-management-add">会员打卡</Link>),
  },
  {
    key: "2",
    label: <Link to="member-management/member-management-add">注册新会员</Link>,
  },
  {
    key: "3",
    label: <Link to="member-card-management/member-card-management-add">会员卡续费/办理</Link>,
  },
  {
    key: "4",
    label: <Link to="class-management/add-class">添加课程</Link>,
  },
];

const menu1 = (
  <Menu
    items={[
      {
        key: "1",
        label: (
          <Link to="/dashboard/user-management/modify-data">修改资料</Link>
        ),
      },
      {
        key: "2",
        label: (
          <Link to="/dashboard/user-management/modify-password">修改密码</Link>
        ),
      },
      // {
      //   key: "3",
      //   label: (
      //     <Link to="dashboard/user-management/modify-picture">修改头像</Link>
      //   ),
      // },
      {
        key: "4",
        label: <Link to="/">退出登录</Link>,
      },
    ]}
  ></Menu>
);
export default function HeaderBar() {
  const [headName, setHeadName] = useState("");
  const [username, setUsername] = useState("");
  const [adminUsername,setAdminUsername] = useState()
  const location = useLocation();
  let path = location.pathname.split("/")[1];
  let path1 = location.pathname.split("/")[2];
  console.log(location.pathname.split("/")[1]);
  // const [params] = useSearchParams();
  // const username = params.get("username")

  const getCurrentUsername = () => {
    setUsername(window.localStorage.getItem("adminUsername"));
    // console.log("getCurrentUsername1",window.localStorage)
    console.log("getCurrentUsername2",window.localStorage.getItem("adminUsername"))
    // window.localStorage.clear("adminUsername");
    // console.log("after-clear:",window.localStorage)
  };

  useEffect(() => {
    getCurrentUsername();
  }, []);

  const onSearch = (value) => {
    console.log("@onsearch-value", value);
  };

  return (
    // <div className='headname' >
    //   {/* <HomeOutlined style={{ marginRight: '7px' }} /> */}
    //   {/* {headName} */}
    // </div>
    <div className="header">
      <Dropdown
        menu={{items}}
      >
        <a onClick={(e) => e.preventDefault()}>快速建立</a>
      </Dropdown>
      <div className="header-right">
        {/* <Search
          placeholder="input search text"
          onSearch={onSearch}
          allowClear
          style={{
            width: "100px",
            height: "30px",
          }}
        ></Search>
        <div className="header-right-detail">
          <span>事项</span>
        </div>
        <div className="header-right-detail">
          <span>日程</span>
        </div>
        <div className="header-right-detail">
          <span>消息</span>
        </div>
        <div className="header-right-detail">
          <span>锁屏</span>
        </div>
        <div className="header-right-detail">
          <span>管理</span>
        </div> */}
        <div className="header-right-detail"></div>
        <Dropdown
          menu={{
            items:[
              {
                key: "1",
                label: (
                  <Link to="/dashboard/individual-center/modify-data">修改资料</Link>
                ),
              },
              {
                key: "2",
                label: (
                  <Link to="/dashboard/individual-center/modify-password">修改密码</Link>
                ),
              },
              // {
              //   key: "3",
              //   label: (
              //     <Link to="/dashboard/individual-center/modify-picture">修改头像</Link>
              //   ),
              // },
              {
                key: "4",
                label: (<Link to="/">退出登录</Link>),
                onClick:()=>{window.localStorage.clear("adminUsername");}
              },
            ]
          }}
        >
          <a>{username}</a>
        </Dropdown>
        
      </div>
    </div>
  );
}
