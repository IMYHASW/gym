import React, { useState, useEffect } from 'react'
import { Button, Form, Input, message } from 'antd';
import { DatePicker, Space } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CloseCircleOutlined, CaretUpOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import moment from 'moment';
import CoachService from '../../../services/CoachService';

function UpdateCoach() {

    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const path = location.pathname
    let id = path.split("/")[4];
    console.log(id);
    const [username, setUsername] = useState("")
    const [gender, setGender] = useState("")
    const [birth, setBirth] = useState("")
    const [workingYears, setWorkingYears] = useState("")
    const [evaluation, setEvaluation] = useState("")
    const [entryDate, setEntryDate] = useState("")
    const dateFormat = 'YYYY-MM-DD';

    const getCoach = () => {
        CoachService.getById(id).then(response => {
            console.log(response.data);

            setUsername(response.data.username);
            setGender(response.data.gender);
            setBirth(moment(response.data.birth).format(dateFormat));
            setWorkingYears(response.data.workingYears);
            setEvaluation(response.data.evaluation);
            setEntryDate(response.data.entryDate);

            form.resetFields();

        }).catch(error => {
            console.log(error);
        })


    };
    useEffect(() => {
        setLoading(true)
    }, [])
    useEffect(() => {
        getCoach();
    }, [loading])


    const updateCoach = (e) => {
        e.preventDefault();
        const coach = { username, gender, birth, workingYears, evaluation, entryDate }
        console.log(coach);
        CoachService.update(id, coach).then(response => {
            message.success("修改成功！")
            navigate("../coach-list")
        }).catch(error => {
            message.error("修改失败！")
            console.log(error.data);
        })
    }
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


    return (
        <div className='addemployee'>
            <div className="title" style={{ paddingBottom: '30px' }}>修改教练信息</div>
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 8 }}
                style={{ marginLeft: '2%' }}
                autoComplete="off"
            >
                <Form.Item
                    label="姓名"
                    name="username"
                    initialValue={username}
                >
                    <Input onChange={(e) => setUsername(e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="性别"
                    name="gender"
                    initialValue={gender}
                >
                    <Input onChange={(e) => setGender(e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="出生日期"
                    name="birth"
                    initialValue={dayjs(birth, dateFormat)}
                >
                    <DatePicker showTime onChange={onChange} onOk={onOk} style={{ width: "530px" }} />
                </Form.Item>

                <Form.Item
                    name="workingYears"
                    label="工作年限"
                    initialValue={workingYears}
                >
                    <Input onChange={(e) => setWorkingYears(e.target.value)} />
                </Form.Item>

                <Form.Item
                    name="evaluation"
                    label="所授课程"
                    initialValue={evaluation}
                >
                    <Input onChange={(e) => setEvaluation(e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="入职日期"
                    name="entryDate"
                    initialValue={dayjs(entryDate)}
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
                    <Button type="primary" onClick={(e) => updateCoach(e)} htmlType="submit" icon={<CaretUpOutlined />}>
                        提交
                    </Button>

                    <Button type="danger" onClick={() => { navigate("../coach-list") }} style={{ marginLeft: "300px" }} icon={<CloseCircleOutlined />}>
                        关闭
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default UpdateCoach;