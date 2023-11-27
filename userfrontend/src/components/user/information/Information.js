/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-03-27 20:58:10
 * @LastEditors: Wang Chao
 * @LastEditTime: 2023-05-16 01:16:28
 * @FilePath: /userfrontend/src/components/user/information/Information.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from "react";
import {
    NavBar,
    List,
} from 'antd-mobile';
import {
    useNavigate,
} from 'react-router-dom';
import MemberService from "../../../service/MemberService";
import './Information.css';

export default function Information() {

    const [account, setAccount] = useState([]);

    const navigate = useNavigate();

    const findAccountInformation = (account) => {
        const formData = new FormData();
        formData.append("account", account);
        MemberService.memberInformation(formData).then((response) => {
            setAccount(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        findAccountInformation(window.localStorage.getItem("account"));
    }, [])

    const back = () =>
        navigate("/user");

    return (
        <>
            <div className='information_top'>
                <NavBar onBack={back}>个人信息</NavBar>
            </div>
            <div className='information_body'>
                <List mode='card'>
                    <List.Item extra={account.username} onClick={() => {
                        navigate("/user/information/setusername");
                    }}>
                        昵称
                    </List.Item>
                    <List.Item extra={account.phoneNumber} onClick={() => {
                        navigate("/user/information/setphonenumber");
                    }}>
                        账号
                    </List.Item>
                    <List.Item extra={account.gender} onClick={() => {
                        navigate("/user/information/setgender");
                    }}>
                        性别
                    </List.Item>
                    <List.Item extra={account.birthday} onClick={() => {
                        navigate("/user/information/setbirthday");
                    }}>
                        出生日期
                    </List.Item>
                    <List.Item extra={account.address} onClick={() => {
                        navigate("/user/information/setaddress");
                    }}>
                        家庭地址
                    </List.Item>
                    <List.Item extra={account.height + ' cm'} onClick={() => {
                        navigate("/user/information/setheight");
                    }}>
                        身高
                    </List.Item>
                    <List.Item extra={account.weight + ' kg'} onClick={() => {
                        navigate("/user/information/setweight");
                    }}>
                        体重
                    </List.Item>
                </List>
            </div>
        </>
    );
}
