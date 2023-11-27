/*
 * @Date: 2023-03-30 23:28:04
 * @Author: Wu Jialing
 * @LastEditTime: 2023-04-20 19:39:51
 * @FilePath: /adminfrontend/src/pages/EquipmentManagement/MaintenanceRecord/index.jsx
 * @Description: 
 */
import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Badge, Descriptions, Timeline, Card, Col, Row } from 'antd';
import { Button, PageHeader } from 'antd';
import EquipmentService from '../../../services/EquipmentService';

function MaintenanceRecord() {
    const navigate = useNavigate()
    const location = useLocation()
    const path = location.pathname
    let equipmentId = path.split("/")[4];
    console.log(equipmentId);
    const [equipment, setEquipment] = useState([]);
    const getEquipment = () => {
        EquipmentService.getById(equipmentId)
            .then((response) => {
                console.log(response.data);
                setEquipment(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    let record = equipment.maintenanceRecords
    console.log(record);
    const style = {
        background: 'white',
        padding: '8px 0',
    };
    useEffect(() => {
        getEquipment();
    }, [])
    for (let i in record) {
        return (
            <div>
                <Row>
                    <Col span={18} style={style} offset={3}>
                        <>
                            <div>
                                <Button style={{ marginLeft: "30px", marginTop: "30px" }} type='primary'
                                    onClick={() => { navigate("../equipment-management-list") }}
                                >返回</Button>
                            </div>
                            <div style={{ margin: '30px' }}>
                                <Descriptions title="基本信息" bordered={true} column={2} size={'small'} labelStyle={{ width: '13%' }} contentStyle={{ width: '37%' }}>
                                    <Descriptions.Item label="编号"><span>{equipment.id}</span></Descriptions.Item>
                                    <Descriptions.Item label="名称"> <span>{equipment.name}</span></Descriptions.Item>
                                    <Descriptions.Item label="型号"><span>{equipment.model}</span></Descriptions.Item>
                                    <Descriptions.Item label="品牌"><span>{equipment.brand}</span></Descriptions.Item>
                                    <Descriptions.Item label="购买时间" ><span>{equipment.purchaseTime}</span></Descriptions.Item>
                                    <Descriptions.Item label="保修期限"><span>{equipment.warrantyPeriod}</span></Descriptions.Item>
                                    <Descriptions.Item label="设备状态"><span>{equipment.equipmentStatus}</span></Descriptions.Item>
                                    <Descriptions.Item label="故障信息"><span>{equipment.faultInformation}</span></Descriptions.Item>
                                </Descriptions>
                            </div>
                        </>
                    </Col>
                    <br />
                    <br />
                    <Col span={18} style={style} offset={3}>
                        <Timeline style={{ margin: '30px' }} >
                            <Timeline.Item >
                                <Button type="primary">
                                    维修记录
                                </Button>
                            </Timeline.Item>
                            {record?.map((item, index) => (
                                <Timeline.Item key={index}>
                                    <Card size="small" title="记录" extra={<a href="#"><span>{item.maintenanceDate}</span></a>}>
                                        <p>维护信息：<span>{item.maintenanceInformation}</span></p>
                                        <p>维修总花费金额：<span>{item.totalCost}</span></p>
                                    </Card>
                                </Timeline.Item>))}
                        </Timeline>
                    </Col>
                </Row>
            </div>
        );
    }

}

export default MaintenanceRecord;