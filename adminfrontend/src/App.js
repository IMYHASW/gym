// 接下来看app.js,里面主要就是一个设置主界面的一些内容,例如:

// 一个img图,因为import logo from './logo.svg',所以可以直接使用src={logo}来指定图片地址
// 一段文字"Edit src/App.js and save to reload."
// 一些样式,import './App.css',之后可以直接使用className="App-logo"来获取App.css里面的样式
// import logo from './logo.svg';
import { Layout } from "antd";
import React, { useState } from "react";
import FootBar from "./layout/FootBar";
import HeaderBar from "./layout/HeaderBar";
import SideBar from "./layout/SideBar";
import "./App.css";
import { Outlet } from "react-router-dom";
import Bread from "./layout/Bread";

const { Header, Footer, Sider, Content } = Layout;

export default function App() {
  const [item, setItem] = useState([]);

  return (
    <div className="all-container">
      <Layout
        className="my-context"
        style={{ minHeight: "100vh", minWidth: "100vh" }}
      >
        <SideBar setItem={setItem} />
        <Layout style={{ marginLeft: "180px" }}>
          <Header>
            <HeaderBar />
          </Header>
          <Bread item={item} style={{ margin: "0 20px" }} />
          <Content style={{ margin: "0 16px" }}>
            <Outlet />
          </Content>

          <Footer>
            <FootBar />
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}
