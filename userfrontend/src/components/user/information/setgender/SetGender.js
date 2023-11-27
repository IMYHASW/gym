/*
 * @Author: Wang Chao
 * @Date: 2023-04-21 17:26:27
 * @LastEditTime: 2023-05-16 00:54:52
 * @LastEditors: Wang Chao
 * @FilePath: /userfrontend/src/components/user/information/setgender/SetGender.js
 * @Description: 
 */
import React, { useEffect, useState } from "react";
import {
    NavBar,
    Form,
    Space,
    Radio,
} from 'antd-mobile';
import {
    useNavigate,
} from 'react-router-dom';
import MemberService from "../../../../service/MemberService";
import './SetGender.css';

export default function SetGender() {

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
            gender: account.gender,
        })
    }, [account])

    const back = () =>
        navigate("/user/information");

    const save = () => {
        return (
            <div
                onClick={() => { updateGender(form.getFieldValue('gender')) }}
                style={{ cursor: 'pointer' }}
            >
                <Space style={{ '--gap': '16px' }}>
                    <span style={{ color: "black" }}>保存</span>
                </Space>
            </div>
        );
    }

    const updateGender = (gender) => {
        const member = {
            id: account.id,
            username: account.username,
            gender: gender,
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
            <div className='setgender_top'>
                <NavBar onBack={back} right={save()}>性别</NavBar>
            </div>
            <div className='setgender_body'>
                <Form form={form} layout='horizontal' className='setgender_form'>
                    <Form.Item label='性别' name='gender'>
                        <Radio.Group >
                            <Space direction='vertical'>
                                <Radio value='男'>男</Radio>
                                <Radio value='女'>女</Radio>
                            </Space>
                        </Radio.Group>
                    </Form.Item>
                </Form>
                <p className='setun_footer'>保存后，你的性别将会被修改。</p>
            </div>
        </>
    );
}