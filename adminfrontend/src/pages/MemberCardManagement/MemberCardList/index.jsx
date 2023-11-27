/*
 * @Date: 2023-03-13 22:55:26
 * @Author: Wu Jialing
 * @LastEditTime: 2023-04-24 10:15:16
 * @FilePath: /adminfrontend/src/pages/MemberCardManagement/MemberCardList/index.jsx
 * @Description: 
 */
import { Col, Row, Table, message, Space, Popconfirm, Button, Modal, Form, Input, Radio } from "antd";
import { DollarCircleOutlined, DeleteOutlined, PlusSquareOutlined } from '@ant-design/icons';

import { useEffect, useState } from "react";
import moment from "moment";
import { Link, useNavigate } from 'react-router-dom'
import MemberCardDesignService from "../../../services/MemberCardDesignService";
import MemberCardService from "../../../services/MemberCardService";
function MemberCardList() {
    const [dataSource, setDataSource] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false);
    const [isRenewalModalOpen, setIsRenewalModalOpen] = useState(false);
    const [rechargeAmount, setRechargeAmount] = useState()
    const [id, setId] = useState()
    const [form] = Form.useForm()
    const [memberCardDesigns, setMemberCardDesigns] = useState([])
    const [memberCardDesignId, setMemberCardDesignId] = useState()

    const columns = [
        {
            title: "会员卡种类",
            dataIndex: "type",
        }, {
            title: "会员卡余额",
            dataIndex: "balance",
        }, {
            title: "累积充值金额",
            dataIndex: "cumulativeRecharge",
        }, {
            title: "累计打卡次数",
            dataIndex: "numberOfCheckIns",
        }, {
            title: "办卡日期",
            dataIndex: "dateOfApplication",
        }, {
            title: "到期日期",
            dataIndex: "expirationDate",
        }, {
            title: "会员积分",
            dataIndex: "memberPoints",
        }, {
            title: "会员昵称",
            dataIndex: "username",
        }, {
            title: "会员电话号码",
            dataIndex: "phoneNumber",
        }, {
            title: "备注",
            dataIndex: "remark",
        },
        // {
        //     title:"期限",
        //     dataIndex:"duration",
        // },{
        //     title:"期限单位",
        //     dataIndex:"durationUnit",
        // },{
        //     title:"价格",
        //     dataIndex:"price",
        // }, 
        {
            title: "操作",
            dataIndex: "actions",
            align: 'center',
            render: (_, record) => {
                return (
                    <Space>
                        <Button type="primary" onClick={() => { showRenewalModal(record.id) }} icon={< PlusSquareOutlined />}>续费</Button>
                        {/* <Link to={`../update/${record.key}`}>续费</Link>member-card-management-add */}
                        <Button type="primary" onClick={() => { showRechargeModal(record.id) }} icon={< DollarCircleOutlined />}>充值</Button>
                        <Popconfirm
                            title="确定要注销会员卡吗？"
                            onConfirm={() => deleteMemberCard(record.id, record.phoneNumber)}
                            // onCancel={cancel}
                            okText="注销"
                            cancelText="取消"
                        >
                            <Button type='danger' icon={<DeleteOutlined />}>注销</Button>
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ]
    const getMemberCardsType = () => {
        const tempMemberCardDesigns = []
        MemberCardDesignService.getAllMemberCardDesignWhichIsUsed().then(
            response => {
                response.data.map(memberCardDesign => {
                    tempMemberCardDesigns.push({
                        "key": memberCardDesign.id,
                        "id": memberCardDesign.id,
                        "type": memberCardDesign.type,
                        "duration": memberCardDesign.duration,
                        "durationUnit": memberCardDesign.durationUnit,
                        "price": memberCardDesign.price,
                    })
                })
                setMemberCardDesigns(tempMemberCardDesigns)
                console.log("memberCardDesigns", memberCardDesigns)
            }
        )
    }
    const deleteMemberCard = (id, phoneNumber) => {
        MemberCardService.deleteMemberCard(id, phoneNumber).then(
            response => {
                message.success("删除成功！")
                getAllMemberCards()
            }
        ).catch(error => {
            message.error("删除失败！")
        })
    }
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys)
    }
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }
    const handlePageChange = (page, limit) => {
        setCurrentPage(page)
        setLimit(limit)
    }
    const getAllMemberCards = () => {
        const tempDataSource = []
        setLoading(true)
        MemberCardService.getAllMemberCards(currentPage - 1, limit, ['id', 'asc']).then(
            (response) => {
                console.log(response);
                response.data.content?.map((MemberCardsListVo) => {
                    tempDataSource.push({
                        "key": MemberCardsListVo.id,
                        "id": MemberCardsListVo.id,
                        "balance": MemberCardsListVo.balance,
                        "cumulativeRecharge": MemberCardsListVo.cumulativeRecharge,
                        "numberOfCheckIns": MemberCardsListVo.numberOfCheckIns,
                        "dateOfApplication": moment(MemberCardsListVo.dateOfApplication).format('YYYY-MM-DD'),
                        "expirationDate": moment(MemberCardsListVo.expirationDate).format('YYYY-MM-DD'),
                        "memberPoints": MemberCardsListVo.memberPoints,
                        "remark": MemberCardsListVo.remark,
                        "username": MemberCardsListVo.username,
                        "phoneNumber": MemberCardsListVo.phoneNumber,
                        "type": MemberCardsListVo.type,
                        "duration": MemberCardsListVo.duration,
                        "durationUnit": MemberCardsListVo.durationUnit,
                        "price": MemberCardsListVo.price,
                    })
                })
                setTotalPages(response.data.totalElements)
                setDataSource(tempDataSource)
                setLoading(false)
            }
        ).catch(error => {
            console.log(error);
            message.error(error)
        })
    }
    useEffect(() => {
        getAllMemberCards()
    }, [currentPage, limit])
    const showRenewalModal = (id) => {
        setId(id)
        getMemberCardsType()
        setIsRenewalModalOpen(true);
    };
    const handleRenewalOk = () => {
        MemberCardService.renewal(id, memberCardDesignId).then(
            response => {
                message.success("续费成功！")
            }
        ).catch(error => {
            message.error("续费失败！")
            console.log(error);
        })
        setIsRenewalModalOpen(false);
        getAllMemberCards()
    };
    const handleRenewalCancel = () => {
        setIsRenewalModalOpen(false);
    };
    const showRechargeModal = (id) => {
        setId(id)
        setIsRechargeModalOpen(true);
    };
    const handleRechargeOk = () => {
        MemberCardService.recharge(id, rechargeAmount).then(
            response => {
                message.success("充值成功！")
            }
        ).catch(error => {
            message.error("充值失败！")
            console.log(error);
        })
        .finally(() => {
            form.resetFields()
            // form.validateFields()
            setIsRechargeModalOpen(false);
            getAllMemberCards()
        })

    };
    const handleRechargeCancel = () => {
        setIsRechargeModalOpen(false);
    };
    return (
        <Row>
            <Col span={1}></Col>
            <Col span={22} style={{ padding: "40px", backgroundColor: "rgba(255,255,255,1)", alignContent: "center" }}>
                <div style={{
                    textAlign: "center",
                    fontFamily: "serif",
                    fontSize: "35px",
                    padding: "20px"
                }}>
                    已开通会员卡列表
                </div>
                <div style={{ margin: "20px 30px 20px 30px" }}>
                    <Table
                        columns={columns}
                        dataSource={dataSource}
                        rowSelection={rowSelection}
                        pagination={{
                            current: currentPage,
                            total: totalPages,//总页数
                            pageSize: limit,//每页多少条数据
                            onChange: handlePageChange,
                        }}
                        loading={loading}
                    />
                    <Modal title="会员卡充值"
                        open={isRechargeModalOpen}
                        onOk={handleRechargeOk} onCancel={handleRechargeCancel}
                        okText="确认"
                        cancelText="取消">
                        <Form form={form}>
                            <Form.Item label="充值金额" name="recharge" >
                                <Input onChange={(e) => { setRechargeAmount(e.target.value) }} />
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Modal title="会员卡续费" open={isRenewalModalOpen} onOk={handleRenewalOk} onCancel={handleRenewalCancel}
                        okText="确认"
                        cancelText="取消">
                        <div>
                            <Radio.Group onChange={(e) => { setMemberCardDesignId(e.target.value) }}>
                                <Row>
                                    {
                                        memberCardDesigns.map((memberCardDesign) => {
                                            return (
                                                <Col span={8} key={memberCardDesign.id}>
                                                    <Radio key={memberCardDesign.id} value={memberCardDesign.id}>
                                                        ￥{memberCardDesign.price}元 / {memberCardDesign.duration}{memberCardDesign.durationUnit}
                                                    </Radio>
                                                </Col>
                                            )
                                        })
                                    }
                                </Row>
                            </Radio.Group>
                        </div>
                    </Modal>
                </div>
            </Col>
            <Col span={1}></Col>
        </Row>
    );
}

export default MemberCardList;
