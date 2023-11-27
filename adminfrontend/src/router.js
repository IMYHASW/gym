/*
 * @Date: 2023-02-23 16:34:13
 * @Author: Wu Jialing
 * @LastEditTime: 2023-04-22 16:47:35
 * @FilePath: /adminfrontend/src/router.js
 * @Description: 
 */
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";

import AdminLogin from "./components/Admin/AdminLogin";
import AdminRegister from "./components/Admin/AdminRegister";
import ForgetPassword from "./components/Admin/ForgetPassword";
import ChangePassword from "./components/Admin/ChangePassword";

import ModifyData from "./pages/IndividualCenter/ModifyData"
import ModifyPassword from "./pages/IndividualCenter/ModifyPassword"
import ModifyPicture from "./pages/IndividualCenter/ModifyPicture"
import AddCheckInRecord from "./pages/CheckInManagement/AddCheckInRecord"
import CheckInRecordList from "./pages/CheckInManagement/CheckInRecordList";

import AddMember from "./pages/MemberManagement/AddMember";
import MemberList from "./pages/MemberManagement/MemberList";
import UpdateMember from "./pages/MemberManagement/MemberList/UpdateMember";

import AddMemberCard from "./pages/MemberCardManagement/AddMemberCard";
import MemberCardList from "./pages/MemberCardManagement/MemberCardList"
import MemberCardDesign from "./pages/MemberCardManagement/MemberCardDesign";
import MemberCardDesignList from "./pages/MemberCardManagement/MemberCardDesignList";

import EquipmentList from "./pages/EquipmentManagement/EquipmentList";
import MaintenanceRecord from "./pages/EquipmentManagement/MaintenanceRecord";
import AddEquipment from "./pages/EquipmentManagement/AddEquipment";
import UpdateEquipment from "./pages/EquipmentManagement/EquipmentList/details/update";

import CoachList from "./pages/CoachManagement/CoachList";
import AddCoach from "./pages/CoachManagement/AddCoach";
import UpdateCoach from "./pages/CoachManagement/CoachList/updateCoach";

import AddClass from "./pages/ClassManagement/AddClass";
import ClassesList from "./pages/ClassManagement/ClassesList";
import ClassesDetails from "./pages/ClassManagement/ClassesList/ClassesDetails";

import OrdersList from "./pages/OrderManagement/OrdersList";

const BaseRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />}></Route>
        <Route path="adminregister" element={<AdminRegister />}></Route>
        <Route path="forgetpassword" element={<ForgetPassword />}></Route>
        <Route path="changepassword" element={<ChangePassword />}></Route>

        <Route path="dashboard" element={<App />}>
          <Route path="individual-center">
            <Route path="modify-data" element={<ModifyData />}></Route>
            <Route path="modify-password" element={<ModifyPassword />}></Route>
            <Route path="modify-picture" element={<ModifyPicture />}></Route>
          </Route>
          <Route path="check-in-management">
            <Route path="check-in-management-add" element={<AddCheckInRecord />}></Route>
            <Route path="check-in-management-list" element={<CheckInRecordList />}></Route>
          </Route>
          <Route path="member-management">
            <Route path="member-management-add" element={<AddMember />}></Route>
            <Route path="member-management-list" element={<MemberList />}></Route>
            <Route path="update/:id" element={<UpdateMember />}></Route>
          </Route>
          <Route path="member-card-management">
            <Route path="member-card-management-add" element={<AddMemberCard />}></Route>
            <Route path="member-card-management-list" element={<MemberCardList />}></Route>
            <Route path="member-card-management-design" element={<MemberCardDesign />}></Route>
            <Route path="member-card-management-design-list" element={<MemberCardDesignList />}></Route>
          </Route>
          <Route path="equipment-management">
            <Route path="equipment-management-record/:id" element={<MaintenanceRecord />}></Route>
            <Route path="equipment-management-list" element={<EquipmentList />}></Route>
            <Route path="equipment-management-add" element={<AddEquipment />}></Route>
            <Route path="equipment-management-update/:id" element={<UpdateEquipment />}></Route>
          </Route>
          <Route path="coach-management">
            <Route path="coach-list" element={<CoachList />}></Route>
            <Route path="add-coach" element={<AddCoach />}></Route>
            <Route path="update-coach/:id" element={<UpdateCoach />}></Route>
          </Route>
          <Route path="class-management">
            <Route path="add-class" element={<AddClass />}></Route>
            <Route path="classes-list" element={<ClassesList />}></Route>
            <Route path="classes-details/:id" element={<ClassesDetails />}></Route>
            {/* <Route path="update-class/:id" element={<AddClass />}></Route> */}
          </Route>
          <Route path="order-management">
            <Route path="orders-list" element={<OrdersList />}></Route>
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default BaseRouter;
