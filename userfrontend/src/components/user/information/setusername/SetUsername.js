/*
 * @Author: Wang Chao
 * @Date: 2023-04-21 17:26:27
 * @LastEditTime: 2023-05-16 01:51:35
 * @LastEditors: Wang Chao
 * @FilePath: /userfrontend/src/components/user/information/setusername/SetUsername.js
 * @Description: 
 */
import React, { useEffect, useState } from "react";
import {
    NavBar,
    Form,
    Input,
    Space,
} from 'antd-mobile';
import {
    useNavigate,
} from 'react-router-dom';
import MemberService from "../../../../service/MemberService";
import './SetUsername.css';

export default function SetUsername() {

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
            username: account.username,
        })
    }, [account])

    const back = () =>
        navigate("/user/information");

    const save = () => {
        return (
            <div
                onClick={() => { updateUsername(form.getFieldValue('username')) }}
                style={{ cursor: 'pointer' }}
            >
                <Space style={{ '--gap': '16px' }}>
                    <span style={{ color: "black" }}>保存</span>
                </Space>
            </div>
        );
    }

    const updateUsername = (username) => {
        const member = {
            id: account.id,
            username: username,
            gender: account.gender,
            birthday: account.birthday,
            phoneNumber: account.phoneNumber,
            password: account.password,
            address: account.address,
            avatar: account.avatar,
            height: account.height,
            weight: account.weight,
            memberCardId: account.memberCardId,
            registrationTime: account.registrationTime,
        }
        MemberService.updateMemberInformation(member).then((response) => {
            navigate("/user/information");
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <>
            <div className='setun_top'>
                <NavBar onBack={back} right={save()}>昵称</NavBar>
            </div>
            <div className='setun_body'>
                <Form form={form} layout='horizontal' className='setun_form'>
                    <Form.Item label='昵称' name='username'>
                        <Input placeholder='请输入昵称' clearable />
                    </Form.Item>
                </Form>
                <p className='setun_footer'>保存后，你的昵称将会被修改。</p>
            </div>
        </>
    );
}