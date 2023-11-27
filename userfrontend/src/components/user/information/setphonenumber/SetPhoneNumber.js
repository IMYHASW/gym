/*
 * @Author: Wang Chao
 * @Date: 2023-04-21 17:26:27
 * @LastEditTime: 2023-05-16 01:49:49
 * @LastEditors: Wang Chao
 * @FilePath: /userfrontend/src/components/user/information/setphonenumber/SetPhoneNumber.js
 * @Description: 
 */
import React, { useEffect, useState } from "react";
import {
    NavBar,
    Form,
    Input,
    Space,
    Toast,
} from 'antd-mobile';
import {
    useNavigate,
} from 'react-router-dom';
import MemberService from "../../../../service/MemberService";
import './SetPhoneNumber.css';

export default function SetPhoneNumber() {

    const [form] = Form.useForm();
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

    useEffect(() => {
        form.setFieldsValue({
            phonenumber: account.phoneNumber,
        })
    }, [account])

    const back = () =>
        navigate("/user/information");

    return (
        <>
            <div className='setpn_top'>
                <NavBar onBack={back}>账号</NavBar>
            </div>
            <div className='setpn_body'>
                <Form form={form} layout='horizontal' className='setpn_form'>
                    <Form.Item label='账号' name='phonenumber' disabled>
                        <Input />
                    </Form.Item>
                </Form>
                <p className='setpn_footer'>账号一经确定后无法修改。</p>
            </div>
        </>
    );
}