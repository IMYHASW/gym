/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-03-28 09:34:05
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-05-15 15:20:30
 * @FilePath: /userfrontend/src/components/login/Login.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
    NavBar,
    Toast,
    ErrorBlock,
} from 'antd-mobile';
import { isMobile } from 'react-device-detect';
import './Login.css';
import {
    EyeInvisibleOutline,
    EyeOutline,
    FireFill,
} from 'antd-mobile-icons';
import {
    useNavigate,
} from 'react-router-dom';
import MemberService from '../../service/MemberService';

export default function Login() {

    const [form] = Form.useForm()
    const navigate = useNavigate();

    const [visible, setVisible] = useState(false)

    const onFinish = (values) => {
        const formData = new FormData();
        formData.append("account", values.account)
        formData.append("password", values.password)
        MemberService.memberLogin(formData).then((response) => {
            Toast.show({
                icon: 'success',
                content: '登录成功',
            })
            window.localStorage.setItem("token", response.data.token);
            window.localStorage.setItem("account", values.account);
            const formData2 = new FormData();
            formData2.append("account", values.account)
            MemberService.memberInformation(formData2).then((response) => {
                findMemberCardById(response.data.memberCardId)
            }).catch(error => {
                console.log(error);
            })

            getIdByPhoneNumber()
            navigate("/user");
        }).catch((error) => {
            Toast.show({
                icon: 'fail',
                content: error.response.data,
            })
        })
        
        form.resetFields();
    }
    const findMemberCardById = (id) => {
        MemberService.findMemberCardById(id).then((response) => {
            
            window.localStorage.setItem("memberCardId", response.data.id);
        }).catch(error => {
            console.log(error);
        })
    }
    const getIdByPhoneNumber=()  => {
        // const formData = new FormData()
        // formData.append('phoneNumber', localStorage.getItem('account'))
        MemberService.getIdByPhoneNumber(localStorage.getItem('account')).then(
            response => {
                console.log("getIdByPhoneNumber",response);
                localStorage.setItem('memberId', response.data)
            }
        ).catch(error => {
            console.log(error);

        }).finally(() => {
        })
    }

    if (isMobile) return (
        <div className='login'>
            <div className='login-top'>
                <NavBar>登录</NavBar>
            </div>
            <div className='login-body'>
                <div className='login-icon'>
                    <FireFill />
                </div>
                <div className='login-title'>
                    好身材健身房
                </div>
                <Form
                    form={form}
                    onFinish={onFinish}
                    layout='horizontal'
                    mode='card'
                    footer={
                        <Button block shape='rounded' type='submit' color='primary' size='large'>
                            登  录
                        </Button>
                    }
                >
                    <Form.Item name='account' label='手机号'
                        rules={[
                            { required: true, message: '手机号不能为空！' },
                        ]}>
                        <Input placeholder='请输入手机号' clearable />
                    </Form.Item>

                    <Form.Item name='password' label='密码'
                        rules={[
                            { required: true, message: '密码不能为空！' },
                        ]}
                        extra={
                            <div className='eye'>
                                {!visible ? (
                                    <EyeInvisibleOutline onClick={() => setVisible(true)} />
                                ) : (
                                    <EyeOutline onClick={() => setVisible(false)} />
                                )}
                            </div>
                        }>
                        <Input
                            placeholder='请输入密码'
                            clearable
                            type={visible ? 'text' : 'password'}
                        />
                    </Form.Item>

                </Form>

                <div className='register'>

                </div>

            </div>

            {/* <div className='footer'>

            </div> */}

        </div>

    );
    else return (
        <ErrorBlock fullPage title='请使用移动端设备打开链接' description='更多精彩内容请访问移动端网站' />
    )
}
