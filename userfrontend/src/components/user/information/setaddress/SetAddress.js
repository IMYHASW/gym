/*
 * @Author: Wang Chao
 * @Date: 2023-04-21 17:26:27
 * @LastEditTime: 2023-05-16 01:18:23
 * @LastEditors: Wang Chao
 * @FilePath: /userfrontend/src/components/user/information/setaddress/SetAddress.js
 * @Description: 
 */
import React, { useEffect, useState } from "react";
import {
    NavBar,
    Form,
    Space,
    TextArea,
} from 'antd-mobile';
import {
    useNavigate,
} from 'react-router-dom';
import MemberService from "../../../../service/MemberService";
import './SetAddress.css';

export default function SetAddress() {

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
            address: account.address,
        })
    }, [account])

    const back = () =>
        navigate("/user/information");

    const save = () => {
        return (
            <div
                onClick={() => { updateAddress(form.getFieldValue('address')) }}
                style={{ cursor: 'pointer' }}
            >
                <Space style={{ '--gap': '16px' }}>
                    <span style={{ color: "black" }}>保存</span>
                </Space>
            </div>
        );
    }

    const updateAddress = (address) => {
        const member = {
            id: account.id,
            username: account.username,
            gender: account.gender,
            birthday: account.birthday,
            phoneNumber: account.phoneNumber,
            password: account.password,
            address: address,
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
            <div className='setaddress_top'>
                <NavBar onBack={back} right={save()}>昵称</NavBar>
            </div>
            <div className='setaddress_body'>
                <Form form={form} layout='horizontal' className='setaddress_form'>
                    <Form.Item label='家庭地址' name='address'>
                        <TextArea placeholder='请输入家庭地址' clearable />
                    </Form.Item>
                </Form>
                <span className='setaddress_footer'>保存后，你的家庭地址将会被修改。</span>
            </div>
        </>
    );
}