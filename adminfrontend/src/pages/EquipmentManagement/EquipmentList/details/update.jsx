import React, { useState, useEffect } from 'react'
import { Button, Form, Input, message } from 'antd';
import { DatePicker, Space } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CloseCircleOutlined, CaretUpOutlined, HomeOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import moment from 'moment';
import EquipmentService from '../../../../services/EquipmentService';

function UpdateEquipment() {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const path = location.pathname
    let equipmentId = path.split("/")[4];
    console.log(equipmentId);
    const [name, setName] = useState("")
    const [brand, setBrand] = useState("")
    const [model, setModel] = useState("")
    const [purchaseTime, setPurchaseTime] = useState("")
    const [warrantyPeriod, setWarrantyPeriod] = useState("")
    const [equipmentStatus, setEquipmentStatus] = useState("")
    const [faultInformation, setFaultInformation] = useState("")
    const [maintenanceRecords, setMaintenanceRecords] = useState([])
    const navigate = useNavigate();
    const dateFormat = 'YYYY-MM-DD';

    const getEquipment = () => {
        EquipmentService.getById(equipmentId).then(response => {
            setName(response.data.name);
            setModel(response.data.model);
            setBrand(response.data.brand);
            setPurchaseTime(response.data.purchaseTime);
            setEquipmentStatus(response.data.equipmentStatus);
            setWarrantyPeriod(response.data.warrantyPeriod);
            setFaultInformation(response.data.faultInformation);
            setMaintenanceRecords(response.data.maintenanceRecords)

            form.resetFields();
        }).catch(error => {
            console.log(error);
        })
    };
    useEffect(() => {
        setLoading(true)
    }, [])
    useEffect(() => {
        getEquipment();
    }, [loading])

    const updateEquipment = (e) => {
        e.preventDefault();
        const equipment = { name, brand, model, purchaseTime, warrantyPeriod, equipmentStatus, faultInformation, maintenanceRecords }
        console.log(equipment);
        EquipmentService.update(equipmentId, equipment).then(response => {
            message.success("成功更新器材信息！")
            navigate("../equipment-management-list")
        }).catch(error => {
            message.error("修改失败！")
            console.log(error);
        })
    }

    const onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        setPurchaseTime(value);
    };
    const onOk = (value) => {
        setPurchaseTime(value);
        console.log('onOk: ', value);
    };


    return (
        <div className='addemployee'>
            <div className="title" style={{ paddingBottom: '30px' }}>更新器材信息</div>
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
                form={form}
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
                    initialValue={name}
                >
                    <Input onChange={(e) => setName(e.target.value)} />
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
                    initialValue={brand}
                >
                    <Input  onChange={(e) => setBrand(e.target.value)} />
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
                    initialValue={dayjs(purchaseTime,dateFormat)}
                >
                    <DatePicker showTime onChange={onChange} onOk={onOk} style={{ width: "530px" }} />
                </Form.Item>

                <Form.Item
                    name="型号"
                    label="型号"
                    initialValue={model}
                >
                    <Input onChange={(e) => setModel(e.target.value)} />
                </Form.Item>

                <Form.Item
                    name="保修期限"
                    label="保修期限"
                    initialValue={warrantyPeriod}
                >
                    <Input onChange={(e) => setWarrantyPeriod(e.target.value)} />
                </Form.Item>

                <Form.Item
                    name="设备状态"
                    label="设备状态"
                    initialValue={equipmentStatus}
                >
                    <Input  onChange={(e) => setEquipmentStatus(e.target.value)} />
                </Form.Item>

                <Form.Item
                    name="故障信息"
                    label="故障信息"
                    initialValue={faultInformation}
                >
                    <Input onChange={(e) => setFaultInformation(e.target.value)} />
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
                    <Button onClick={(e) => updateEquipment(e)} type="primary" htmlType="submit" icon={<CaretUpOutlined />}>
                        提交
                    </Button>
                    <Button type="danger" style={{ marginLeft: "300px" }} icon={<CloseCircleOutlined />} onClick={()=>{navigate("../equipment-management-list")}}>
                       关闭
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default UpdateEquipment;