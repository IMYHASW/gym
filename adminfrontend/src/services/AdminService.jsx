/*
 * @Date: 2023-03-27 15:55:51
 * @Author: Wu Jialing
 * @LastEditTime: 2023-03-30 21:36:52
 * @FilePath: /adminfrontend/src/services/AdminService.jsx
 * @Description: 
 */
import axios from "axios";

const ADMIN_BASE_REST_API_URL = "http://localhost:8080/api/v1/admin"
                           

class AdminService{

    createAdmin(admin){         
        console.log("@createAdmin--",admin);
        return axios.post(ADMIN_BASE_REST_API_URL+"/register",admin)
    }

    adminLogin(admin){
        return axios.post(ADMIN_BASE_REST_API_URL + "/login",admin)
    }
    changePassword(adminUsername,adminOldPassword,adminNewPassword){
        console.log("AdminService_changePassword:",adminUsername,adminOldPassword,adminNewPassword)
        var param = new URLSearchParams();
        param.append('adminUsername',adminUsername)
        param.append('adminOldPassword',adminOldPassword)
        param.append('adminNewPassword',adminNewPassword)
        console.log("changePassword_Param",param)
        return axios.post(ADMIN_BASE_REST_API_URL + "/changepassword",param)
    }
    forgetPassword(adminUsername,adminNewPassword,adminPhone){
        console.log("AdminService_forgetPassword:",adminUsername,adminNewPassword,adminPhone)
        var param = new URLSearchParams();
        param.append("adminUsername",adminUsername)
        param.append("adminNewPassword",adminNewPassword)
        param.append("adminPhone",adminPhone)
        console.log("forgetPassword_param",param)
        return axios.post(ADMIN_BASE_REST_API_URL+"/forgetpassword",param)
    }
    changeMessage(adminUsername,adminPhone,adminGender){
        var param = new URLSearchParams();
        param.append('adminUsername',adminUsername)
        param.append('adminPhone',adminPhone)
        param.append('adminGender',adminGender)
        return axios.post(ADMIN_BASE_REST_API_URL + "/changemessage",param)
    }
}

export default new AdminService();