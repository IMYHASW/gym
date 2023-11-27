/*
 * @Author: Wang Chao
 * @Date: 2023-04-21 17:26:27
 * @LastEditTime: 2023-05-16 01:19:03
 * @LastEditors: Wang Chao
 * @FilePath: /userfrontend/src/components/user/information/setweight/SetWeight.js
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
import './SetWeight.css';

export default function SetWeight() {

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
            weight: account.weight,
        })
    }, [account])

    const back = () =>
        navigate("/user/information");

    const save = () => {
        return (
            <div
                onClick={() => { updateWeight(form.getFieldValue('weight')) }}
                style={{ cursor: 'pointer' }}
            >
                <Space style={{ '--gap': '16px' }}>
                    <span style={{ color: "black" }}>保存</span>
                </Space>
            </div>
        );
    }

    const updateWeight = (weight) => {
        const member = {
            id: account.id,
            username: account.username,
            gender: account.gender,
            birthday: account.birthday,
            phoneNumber: account.phoneNumber,
            password: account.password,
            address: account.address,
            avatar: account.avatar,
            height: account.height,
            weight: weight,
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
            <div className='setweight_top'>
                <NavBar onBack={back} right={save()}>体重</NavBar>
            </div>
            <div className='setweight_body'>
                <Form form={form} layout='horizontal' className='setweight_form'>
                    <Form.Item label='体重(kg)' name='weight'>
                        <Input placeholder='请输入体重' clearable />
                    </Form.Item>
                </Form>
                <p className='setweight_footer'>保存后，你的体重将会被修改。</p>
            </div>
        </>
    );
}