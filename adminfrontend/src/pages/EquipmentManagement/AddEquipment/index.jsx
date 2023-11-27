import React, { useState } from 'react'
import { Button, Form, Input } from 'antd';
import { DatePicker, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { CloseCircleOutlined, CaretUpOutlined, HomeOutlined } from '@ant-design/icons';
import EquipmentService from '../../../services/EquipmentService';

function AddEquipment() {

    const [name, setName] = useState("")
    const [brand, setBrand] = useState("")
    const [model, setModel] = useState("")
    const [purchaseTime, setPurchaseTime] = useState("")
    const [warrantyPeriod, setWarrantyPeriod] = useState("")
    const [equipmentStatus, setEquipmentStatus] = useState("")
    const [faultInformation, setFaultInformation] = useState("")
    const { RangePicker } = DatePicker;
    const onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        setPurchaseTime(value);
    };
    const onOk = (value) => {
        setPurchaseTime(value);
        console.log('onOk: ', value);
    };
    const navigate = useNavigate();
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const createEquipment = (e) => {
        console.log(e);
        const equipment = { name, brand, model, purchaseTime, warrantyPeriod, equipmentStatus, faultInformation }
        if (name != "" && brand != "" && purchaseTime != "") {
            EquipmentService.create(equipment).then((response) => {
                navigate("../equipment-management-list")
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
            <div className="title" style={{ paddingBottom: '30px' }}>添加器材</div>
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
                    label="名称"
                    name="名称"
                    rules={[
                        {
                            required: true,
                            message: '请输入设备名称!',
                        },
                    ]}
                >
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="品牌"
                    name="品牌"
                    rules={[
                        {
                            required: true,
                            message: '请输入设备品牌!',
                        },
                    ]}
                >
                    <Input value={brand} onChange={(e) => setBrand(e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="购买日期"
                    name="购买日期"
                    rules={[
                        {
                            required: true,
                            message: '请选择购买日期!',
                        },
                    ]}
                >
                    <DatePicker showTime onChange={onChange} onOk={onOk} style={{ width: "530px" }} />
                </Form.Item>

                <Form.Item
                    name="型号"
                    label="型号"
                >
                    <Input value={model} onChange={(e) => setModel(e.target.value)} />
                </Form.Item>

                <Form.Item
                    name="保修期限"
                    label="保修期限"
                >
                    <Input value={warrantyPeriod} onChange={(e) => setWarrantyPeriod(e.target.value)} />
                </Form.Item>

                <Form.Item
                    name="设备状态"
                    label="设备状态"
                >
                    <Input value={equipmentStatus} onChange={(e) => setEquipmentStatus(e.target.value)} />
                </Form.Item>

                <Form.Item
                    name="故障信息"
                    label="故障信息"
                >
                    <Input value={faultInformation} onChange={(e) => setFaultInformation(e.target.value)} />
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
                    <Button onClick={(e) => createEquipment(e)} type="primary" htmlType="submit" icon={<CaretUpOutlined />}>
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

export default AddEquipment;