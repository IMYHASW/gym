import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/antd.css'; 
import BaseRouter from './router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BaseRouter />
);
// 这里作为总控制,把控index页面的js,可以看到这里有几个功能点:

// 引入 React/ReactDOM 等基本库
// 引入css样式文件
// 引入服务器配置serviceWorker文件
// 引入独立模块Component,例如App