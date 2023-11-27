/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-03-27 20:58:10
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-05-16 08:57:24
 * @FilePath: /userfrontend/src/components/user/User.js
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
import MemberService from "../../service/MemberService";
import './User.css';

export default function User() {

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

    function handleFitnessRecord() {
        navigate("/user/fitnessrecord");
    }

    function handleActivity() {
        navigate("/user/activity");
    }

    function handleClick() {
        // ...
    }

    useEffect(() => {
        findAccountInformation(window.localStorage.getItem("account"));
    }, [])

    return (
        <>
            <div className='user_top'>
                <NavBar backArrow={false}>个人中心</NavBar>
            </div>
            <div className='user_body'>
                <List>
                    <List.Item
                        className='user_list'
                        key={account.id}
                        // prefix={
                        //     <Image
                        //         src={account.avatar}
                        //         style={{ borderRadius: 20 }}
                        //         fit='cover'
                        //         width={40}
                        //         height={40}
                        //     />
                        // }
                        description={account.phoneNumber}
                        onClick={() => { navigate("/user/information"); }}
                    >
                        {account.username}
                    </List.Item>
                </List>

                <List mode='card'>
                    {/* <List.Item onClick={handleClick}>
                        帐号与安全
                    </List.Item> */}
                    <List.Item onClick={() => { navigate("/user/activity") }}>
                        活动中心
                    </List.Item>
                    {/* <List.Item onClick={handleClick}>
                        我的课程
                    </List.Item> */}
                    <List.Item onClick={() => { navigate("/user/fitnessrecord") }}>
                        健身记录
                    </List.Item>
                </List>
            </div>
        </>
    );
}
