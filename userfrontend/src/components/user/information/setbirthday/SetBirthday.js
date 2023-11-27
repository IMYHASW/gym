/*
 * @Author: Wang Chao
 * @Date: 2023-04-21 17:26:27
 * @LastEditTime: 2023-05-16 01:18:32
 * @LastEditors: Wang Chao
 * @FilePath: /userfrontend/src/components/user/information/setbirthday/SetBirthday.js
 * @Description: 
 */
import React, { useEffect, useState } from "react";
import {
    NavBar,
    Form,
    DatePicker,
    Space,
} from 'antd-mobile';
import {
    useNavigate,
} from 'react-router-dom';
import MemberService from "../../../../service/MemberService";
import './SetBirthday.css';
import dayjs from "dayjs";

export default function SetBirthday() {

    const [form] = Form.useForm();
    const [account, setAccount] = useState([]);
    const navigate = useNavigate();

    const [visible, setVisible] = useState(false);

    const findAccountInformation = (account) => {
        const formData = new FormData();
        formData.append("account", account);
        MemberService.memberInformation(formData).then((response) => {
            setAccount(response.data);
            form.resetFields();
        }).catch(error => {
            console.log(error);
        })
    }

    function dateToString(date) {
        const Y = date.getFullYear() + '-';
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
        return Y + M + D;
    }

    useEffect(() => {
        findAccountInformation(window.localStorage.getItem("account"));
    }, [])

    useEffect(() => {
        if (account.birthday === null || account.birthday === undefined) {
            form.setFieldsValue({
                birthday: new Date(),
            })
        } else {
            form.setFieldsValue({
                birthday: new Date(dayjs(account.birthday)),
            })
        }
    }, [account])

    const back = () =>
        navigate("/user/information");

    const save = () => {
        return (
            <div
                onClick={() => { updateBirthday(form.getFieldValue('birthday')) }}
                style={{ cursor: 'pointer' }}
            >
                <Space style={{ '--gap': '16px' }}>
                    <span style={{ color: "black" }}>保存</span>
                </Space>
            </div>
        );
    }

    const updateBirthday = (birthday) => {
        const member = {
            id: account.id,
            username: account.username,
            gender: account.gender,
            birthday: birthday,
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
            <div className='setbirthday_top'>
                <NavBar onBack={back} right={save()}>出生日期</NavBar>
            </div>
            <div className='setbirthday_body'>
                <Form form={form} layout='horizontal' className='setbirthday_form'>
                    <Form.Item label='出生日期' name='birthday' trigger='onConfirm'
                        onClick={() => {
                            setVisible(true);
                        }}
                        initialValue={new Date()}
                    >
                        <DatePicker
                            visible={visible}
                            onClose={() => {
                                setVisible(false)
                            }}
                            min={new Date(1900, 1, 1)}
                            max={new Date()}
                        >
                            {value => dateToString(value)}
                        </DatePicker>
                    </Form.Item>
                </Form>
                <p className='setbirthday_footer'>保存后，你的出生日期将会被修改。</p>
            </div>
        </>
    );
}