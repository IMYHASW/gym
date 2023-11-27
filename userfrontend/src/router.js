/*
 * @Date: 2023-02-23 16:34:13
 * @Author: Wu Jialing
 * @LastEditTime: 2023-05-16 03:22:32
 * @FilePath: /userfrontend/src/router.js
 * @Description: 
 */
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import App from "./App";

import Home from "./components/home/Home";
import About from "./components/home/about/About";
import Notice from "./components/home/notice/Notice";

import Course from "./components/course/Course";
import ChooseCourse from "./components/course/chooseCourse/ChooseCourse";

import Vip from "./components/vip/Vip";
import Renewal from "./components/vip/renewal/Renewal";
import RenewalSuccessPage from "./components/vip/renewal/resultPage/RenewalSuccessPage";
import Recharge from "./components/vip/recharge/Recharge";

import User from "./components/user/User";
import Information from "./components/user/information/Information";
import SetUsername from "./components/user/information/setusername/SetUsername";
import SetPhoneNumber from "./components/user/information/setphonenumber/SetPhoneNumber";
import SetGender from "./components/user/information/setgender/SetGender";
import SetBirthday from "./components/user/information/setbirthday/SetBirthday";
import SetAddress from "./components/user/information/setaddress/SetAddress";
import SetHeight from "./components/user/information/setheight/SetHeight";
import SetWeight from "./components/user/information/setweight/SetWeight";
import FitnessRecord from "./components/user/fitnessrecord/FitnessRecord";
import Activity from "./components/user/activity/Activity";

import Login from "./components/login/Login";

const BaseRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>

          <Route path="home" element={<Home />}></Route>
          <Route path="home/about" element={<About />}></Route>
          <Route path="home/notice" element={<Notice />}></Route>

          <Route path="course" element={<Course />}></Route>
          <Route path="course/choose/:classesId" element={<ChooseCourse />}></Route>

          <Route path="vip" element={<Vip />}></Route>
          <Route path="vip/renewal" element={<Renewal />}></Route>
          <Route path="vip/renewal/success/:method/:amount" element={<RenewalSuccessPage />}></Route>
          <Route path="vip/recharge/:balance" element={<Recharge />}></Route>

          <Route path="user" element={<User />}></Route>
          <Route path="user/information" element={<Information />}></Route>
          <Route path="user/information/setusername" element={<SetUsername />}></Route>
          <Route path="user/information/setphonenumber" element={<SetPhoneNumber />}></Route>
          <Route path="user/information/setgender" element={<SetGender />}></Route>
          <Route path="user/information/setbirthday" element={<SetBirthday />}></Route>
          <Route path="user/information/setaddress" element={<SetAddress />}></Route>
          <Route path="user/information/setheight" element={<SetHeight />}></Route>
          <Route path="user/information/setweight" element={<SetWeight />}></Route>
          <Route path="user/fitnessrecord" element={<FitnessRecord />}></Route>
          <Route path="user/activity" element={<Activity />}></Route>

        </Route>
        <Route path="/*" element={<Navigate to="login" />}></Route>
        <Route path="login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default BaseRouter;
