import React, { useState } from 'react'
import { Button, Form, Input } from 'antd';
import { DatePicker, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { CloseCircleOutlined, CaretUpOutlined, HomeOutlined } from '@ant-design/icons';
import CoachService from '../../../services/CoachService';

function AddCoach() {

    const [username, setUsername] = useState("")
    const [gender, setGender] = useState("")
    const [birth, setBirth] = useState("")
    const [workingYears, setWorkingYears] = useState("")
    const [evaluation, setEvaluation] = useState("")
    const [entryDate, setEntryDate] = useState("")
    const { RangePicker } = DatePicker;
    const onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        setBirth(value);
    };
    const onOk = (value) => {
        setBirth(value);
        console.log('onOk: ', value);
    };
    const onChange1 = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        setEntryDate(value);
    };
    const onOk1 = (value) => {
        setEntryDate(value);
        console.log('onOk: ', value);
    };
    const navigate = useNavigate();
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const createCoach = (e) => {
        console.log(e);
        const coach = { username, gender, birth, workingYears, evaluation, entryDate }
        if (username != "" && gender != "" && evaluation != "") {
            CoachService.create(coach).then((response) => {
                navigate("../coach-list")
            }).catch((error) => {
                console.log(error);
            })
        }
        else {
            console.log("fail");
        }
    }

    return (
        <div className='addemployee'>
            <div className="title" style={{ paddingBottom: '30px' }}>注册教练信息</div>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 8,
                }}
                style={{
                    marginLeft: '2%',
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="姓名"
                    name="姓名"
                    rules={[
                        {
                            required: true,
                            message: '请输入姓名!',
                        },
                    ]}
                >
                    <Input value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="性别"
                    name="性别"
                    rules={[
                        {
                            required: true,
                            message: '请输入性别!',
                        },
                    ]}
                >
                    <Input value={gender} onChange={(e) => setGender(e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="出生日期"
                    name="出生日期"
                    rules={[
                        {
                            required: false,
                            message: '请选择出生日期!',
                        },
                    ]}
                >
                    <DatePicker showTime onChange={onChange} onOk={onOk} style={{ width: "530px" }} />
                </Form.Item>

                <Form.Item
                    name="工作年限"
                    label="工作年限"
                >
                    <Input value={workingYears} onChange={(e) => setWorkingYears(e.target.value)} />
                </Form.Item>

                <Form.Item
                    name="所授课程"
                    label="所授课程"
                >
                    <Input value={evaluation} onChange={(e) => setEvaluation(e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="入职日期"
                    name="入职日期"
                    rules={[
                        {
                            required: true,
                            message: '请选择入职日期!',
                        },
                    ]}
                >
                    <DatePicker showTime onChange={onChange1} onOk={onOk1} style={{ width: "530px" }} />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                    style={{
                        marginTop: '50px'
                    }}
                >
                    <Button onClick={(e) => createCoach(e)} type="primary" htmlType="submit" icon={<CaretUpOutlined />}>
                        提交
                    </Button>
                    <Button type="danger" style={{ marginLeft: "300px" }} icon={<CloseCircleOutlined />}>
                        <Link to={"../equipment-management-list"} style={{ color: "white" }}>关闭</Link>
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AddCoach;