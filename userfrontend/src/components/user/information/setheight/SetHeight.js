/*
 * @Author: Wang Chao
 * @Date: 2023-04-21 17:26:27
 * @LastEditTime: 2023-05-16 01:17:30
 * @LastEditors: Wang Chao
 * @FilePath: /userfrontend/src/components/user/information/setheight/SetHeight.js
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
import './SetHeight.css';

export default function SetHeight() {

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
            height: account.height,
        })
    }, [account])

    const back = () =>
        navigate("/user/information");

    const save = () => {
        return (
            <div
                onClick={() => { updateHeight(form.getFieldValue('height')) }}
                style={{ cursor: 'pointer' }}
            >
                <Space style={{ '--gap': '16px' }}>
                    <span style={{ color: "black" }}>保存</span>
                </Space>
            </div>
        );
    }

    const updateHeight = (height) => {
        const member = {
            id: account.id,
            username: account.username,
            gender: account.gender,
            birthday: account.birthday,
            phoneNumber: account.phoneNumber,
            password: account.password,
            address: account.address,
            avatar: account.avatar,
            height: height,
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
            <div className='setheight_top'>
                <NavBar onBack={back} right={save()}>身高</NavBar>
            </div>
            <div className='setheight_body'>
                <Form form={form} layout='horizontal' className='setheight_form'>
                    <Form.Item label='身高(cm)' name='height'>
                        <Input placeholder='请输入身高' clearable />
                    </Form.Item>
                </Form>
                <p className='setheight_footer'>保存后，你的身高将会被修改。</p>
            </div>
        </>
    );
}