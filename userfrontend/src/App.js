/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-03-27 15:35:37
 * @LastEditors: Wang Chao
 * @LastEditTime: 2023-04-21 19:15:34
 * @FilePath: /userfrontend/src/App.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import './App.css';

import React, { useEffect } from 'react';
import {
  useNavigate,
  Outlet,
} from 'react-router-dom';
import { ErrorBlock } from 'antd-mobile';
import { isMobile } from 'react-device-detect';
import Tabbar from './components/tabbar/Tabbar';

export default function App() {

  const navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.getItem("token") === null) {
      navigate('/login');
    }
  }, [window.localStorage.getItem("token")])

  if (isMobile) return (
    <div className='App'>
      <Outlet />
      <Tabbar />
    </div>
  )
  else return (
    <ErrorBlock fullPage title='请使用移动端设备打开链接' description='更多精彩内容请访问移动端网站' />
  )
}