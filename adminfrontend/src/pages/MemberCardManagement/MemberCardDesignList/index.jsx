/*
 * @Date: 2023-03-15 17:51:49
 * @Author: Wu Jialing
 * @LastEditTime: 2023-03-18 00:06:24
 * @FilePath: /frontend/src/pages/MemberCardManagement/MemberCardDesignList/index.jsx
 * @Description: 
 */

import { Col, Form, Input, Row, message, Button, Radio, Table, Modal } from "antd";
import { useEffect, useState } from "react";
import MemberCardDesignService from "../../../services/MemberCardDesignService";
import { memberCardDesignConstant } from "../../Constant/AllConstant";

function MemberCardDesignList() {
    const [dataSource, setDataSource] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [memberCardDesign, setMemberCardDesign] = useState({})
    const [form] = Form.useForm()

    useEffect(() => {
        getAllMemberCardDesign();
    }, [])

    /**表格列设置 */
    //列设置
    const baseCloumns = [
        {
            title: "ID",
            dataIndex: memberCardDesignConstant.id,
            key: memberCardDesignConstant.id,
        }, {
            title: "会员卡种类",
            dataIndex: memberCardDesignConstant.type,
            key: memberCardDesignConstant.type,
        }, {
            title: "会员卡期限",
            dataIndex: memberCardDesignConstant.duration,
            key: memberCardDesignConstant.duration,
        }, {
            title: "会员卡期限单位",
            dataIndex: memberCardDesignConstant.durationUnit,
            key: memberCardDesignConstant.durationUnit,
        }, {
            title: "价格￥（元）",
            dataIndex: memberCardDesignConstant.price,
            key: memberCardDesignConstant.price
        }, {
            title: "是否启用",
            dataIndex: memberCardDesignConstant.used,
            key: memberCardDesignConstant.used,
        }, {
            title: "操作",
            dataIndex: "action",
            key: "action",
            render: (_, record) => (
                <div>
                    <Button
                        onClick={() => {
                            let used;
                            if (record.used === "启用") {
                                used = true
                            } else {
                                used = false
                            }
                            console.log(record)
                            setMemberCardDesign({
                                "key": record.id,
                                "id": record.id,
                                "type": record.type,
                                "duration": record.duration,
                                "durationUnit": record.durationUnit,
                                "price": record.price,
                                "used": used,
                            })
                            setIsModalOpen(true)
                        }}
                        size="small"
                        type="link">
                        编辑
                    </Button>
                </div>)
        }]

    useEffect(() => {
        form.setFieldsValue({ ...memberCardDesign })
    }, [memberCardDesign])

    const getAllMemberCardDesign = () => {
        const tempDataSource = []
        MemberCardDesignService.getAllMemberCardDesign().then(
            response => {
                console.log("getAllMemberCardDesign-response.data", response.data)
                response.data.map((memberCardDesign) => {
                    tempDataSource.push({
                        "key": memberCardDesign.id,
                        "id": memberCardDesign.id,
                        "type": memberCardDesign.type,
                        "duration": memberCardDesign.duration,
                        "durationUnit": memberCardDesign.durationUnit,
                        "price": memberCardDesign.price,
                        "used": memberCardDesign.used ? "启用" : "禁用",
                    })
                })
                setDataSource(tempDataSource)
                console.log("dataSource", dataSource)
            }
        )
    }

    const updateMemberCardDesign = (values) => {
        console.log("updateMemberCardDesign", values)
        console.log(values.id);
        console.log(memberCardDesign.price);
        console.log(memberCardDesign.used);
        console.log(values.price);
        console.log(values.used);
        MemberCardDesignService.updateMemberCardDesign(values.id, memberCardDesign.price, memberCardDesign.used, values.price, values.used).then(
            response => {
                console.log(response)
                if (response.data.result === "succeed") {
                    message.success(response.data.message)
                    setIsModalOpen(false)
                    getAllMemberCardDesign()
                } else if (response.data.result === "failed") {
                    message.error(response.data.message)
                }
            }
        )
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Row>
            <Col span={1}></Col>
            <Col span={22} style={{ padding: "40px", backgroundColor: "rgba(255,255,255,1)", alignContent: "center" }}>
                <div
                    style={{
                        textAlign: "center",
                        fontFamily: "serif",
                        fontSize: "35px",
                        padding: "20px",
                    }}>
                    已有会员卡种类
                </div>
                <div>
                    <Table columns={baseCloumns} dataSource={dataSource} />

                </div>
            </Col>
            <Col span={1}></Col>
            <Modal title="修改会员卡信息" open={isModalOpen} onCancel={handleCancel} forceRender={true}
                onOk={() => {
                    form.validateFields().then((values) => {
                        updateMemberCardDesign(values)
                    })
                }}
            >
                <Form
                    labelCol={{
                        span: 7,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="horizontal"
                    style={{
                        maxWidth: "600px",
                    }}
                    form={form}
                // initialValues={{...memberCardDesign}}
                >
                    <Form.Item label="会员卡ID" name={memberCardDesignConstant.id} required={true}>
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="会员卡种类" name={memberCardDesignConstant.type} required={true}>
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="会员卡期限" name={memberCardDesignConstant.duration} required={true}>
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="期限单位" name={memberCardDesignConstant.durationUnit} required={true}>
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="会员卡价格" name={memberCardDesignConstant.price} required={true}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="是否启用" name={memberCardDesignConstant.used} required={true} >
                        <Radio.Group >
                            <Radio value={true}>启用</Radio>
                            <Radio value={false}>禁用</Radio>
                        </Radio.Group>
                    </Form.Item>

                </Form>
            </Modal>
        </Row>

    );
}

export default MemberCardDesignList;