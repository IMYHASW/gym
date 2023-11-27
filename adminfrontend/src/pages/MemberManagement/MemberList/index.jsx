/*
 * @Date: 2023-03-13 15:55:54
 * @Author: Wu Jialing
 * @LastEditTime: 2023-04-20 21:07:16
 * @FilePath: /adminfrontend/src/pages/MemberManagement/MemberList/index.jsx
 * @Description: 
 */
import { Col, message, Row, Table, Input, DatePicker, Button, Radio, Modal, Select, Space, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import MemberServices from "../../../services/MemberServices";
import { render } from "@testing-library/react";
import { icons } from "antd/lib/image/PreviewGroup";


function MemberList() {
    const [dataSource, setDataSource] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [loading, setLoading] = useState(false)
    const [sortByValue, setSortByValue] = useState("id")
    const [sortWay, setSortWay] = useState("asc")
    const [searchMemberUsername, setSearchMemberUsername] = useState(null)
    const [searchMemberCardId,setSearchMemberCardId] = useState(null)
    const [searchMemberPhoneNumber, setSearchMemberPhoneNumber] = useState(null)
    const [searchMemberGender, setSearchMemberGender] = useState(null)
    const [searchBirthday, setSearchBirthday] = useState(null)
    const [searchMemberHeight, setSearchMemberHeight] = useState(null)
    const [searchMemberWeight, setSearchMemberWeight] = useState(null)
    const [searchMemberAddress, setSearchMemberAddress] = useState(null)
    const [searchRegistrationTime, setSearchRegistrationTime] = useState(null)
    const [isSortModalOpen, setIsSortModalOpen] = useState(false)
    const navigate = useNavigate();

    const columns = [
        {
            title: "会员昵称",
            dataIndex: "username",
            align: 'center'
        },{
            title:"会员卡号",
            dataIndex:"memberCardId",
            align: 'center'
        }, {
            title: "电话号码",
            dataIndex: "phoneNumber",
            align: 'center'
        }, {
            title: "性别",
            dataIndex: "gender",
            align: 'center'
        }, {
            title: "生日",
            dataIndex: "birthday",
            align: 'center'
        }, {
            title: "身高/cm",
            dataIndex: "height",
            align: 'center'
        }, {
            title: "体重/kg",
            dataIndex: "weight",
            align: 'center'
        }
        , {
            title: "地址",
            dataIndex: "address",
            align: 'center'
        }, {
            title: "注册时间",
            dataIndex: "registrationTime",
            align: 'center'
        }, {
            title: "操作",
            dataIndex: "actions",
            align: 'center',
            render: (_,record) => {
                return (
                    <Space>
                        <Button type="primary" onClick={() => { navigate("../update/"+record.key) }} icon={<EditOutlined />}>编辑</Button>
                        <Popconfirm
                            title="确定要注销会员吗？直接注销会员会注销对应的会员卡！"
                            onConfirm={() => deleteMember(record.id,record.memberCardId)}
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
    const deleteMember=(id,memberCardId)=>{
        MemberServices.deleteMember(id,memberCardId).then(
            response=>{
                message.success(response.data)
            }
        ).catch(error=>{
            console.log(error);
        }).finally(()=>{
            getAllMembers()
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

    const getAllMembers = () => {
        const tempDataSource = []
        setLoading(true)
        MemberServices.getAllMembers(currentPage - 1, limit, sortByValue, sortWay, searchMemberUsername,searchMemberCardId, searchMemberPhoneNumber, searchMemberGender, searchBirthday, searchMemberHeight, searchMemberWeight, searchMemberAddress, searchRegistrationTime).then(
            (response) => {
                console.log(response);
                response.data.content.map((member) => {
                    tempDataSource.push({
                        "key": member.id,
                        "id": member.id,
                        "memberCardId":member.memberCardId,
                        "username": member.username,
                        "gender": member.gender,
                        "birthday": moment(member.birthday).format('YYYY-MM-DD'),
                        "phoneNumber": member.phoneNumber,
                        "height": member.height,
                        "weight": member.weight,
                        "address": member.address,
                        "registrationTime": moment(member.registrationTime).format('YYYY-MM-DD HH:mm:ss')
                    })
                })
                setTotalPages(response.data.totalElements)
                setDataSource(tempDataSource)
                setLoading(false)
            }
        ).catch(error => {
            console.log(error);
            // message.error(error)
        })
    }
    useEffect(() => {
        getAllMembers()
    }, [currentPage, limit])


    const handleSortModalOk = () => {
        setIsSortModalOpen(false)
        getAllMembers()
    }
    const handleSortModalCancel = () => {
        setIsSortModalOpen(false)
    }
    return (
        <Row >
            <Col span={1}></Col>
            <Col span={22} >
                <div
                    style={{
                        padding: "20px",
                        margin: "20px 30px 20px 30px",
                        backgroundColor: "rgba(255,255,255,1)"
                    }}>
                    <div className="search">
                        <Input placeholder="会员昵称" style={{ width: "12%", margin: "10px" }} onChange={e => { setSearchMemberUsername(e.target.value) }} />
                        <Input placeholder="会员卡号" style={{ width: "12%", margin: "10px" }} onChange={e => { setSearchMemberCardId(e.target.value) }} />
                        <Input placeholder="会员手机号" style={{ width: "12%", margin: "10px" }} onChange={e => { setSearchMemberPhoneNumber(e.target.value) }} />
                        <Input placeholder="性别" style={{ width: "12%", margin: "10px" }} onChange={e => { setSearchMemberGender(e.target.value) }} />
                        <DatePicker placeholder="出生日期" style={{ width: "12%", margin: "10px" }} onChange={date => { setSearchBirthday(moment(date).format("YYYY-MM-DD")) }} />
                        <Input placeholder="身高" style={{ width: "12%", margin: "10px" }} onChange={e => { setSearchMemberHeight(e.target.value) }} />
                        <Input placeholder="体重" style={{ width: "12%", margin: "10px" }} onChange={e => { setSearchMemberWeight(e.target.value) }} />
                        <Input placeholder="地址" style={{ width: "12%", margin: "10px" }} onChange={e => { setSearchMemberAddress(e.target.value) }} />
                        <DatePicker placeholder="注册时间" style={{ width: "12%", margin: "10px" }} onChange={date => { setSearchRegistrationTime(moment(date).format("YYYY-MM-DD HH:mm:ss")) }} />
                        {/* // moment(date).format("YYYY-MM-DD HH:mm:ss") */}
                        <Button type="primary" style={{ width: "6%", margin: "10px" }} onClick={() => { getAllMembers() }}>查询</Button>
                        <Button style={{ width: "6%", margin: "10px" }} onClick={() => { window.location.reload() }}>重置</Button>
                    </div>
                </div>
                <div style={{ backgroundColor: "rgba(255,255,255,1)", margin: "20px 30px 20px 30px" }}>
                    <div style={{ padding: "20px" }}>
                        <Button type="primary" onClick={() => { navigate("/dashboard/member-management/member-management-add") }}>注册会员</Button>
                        <Button style={{ float: "right", marginRight: "20px" }} onClick={() => { setIsSortModalOpen(true) }}>排序</Button>
                        <Modal title="选择排序方式" open={isSortModalOpen} onOk={handleSortModalOk} onCancel={handleSortModalCancel}>
                            <Radio.Group onChange={e => { setSortByValue(e.target.value) }} value={sortByValue}>
                                <Radio value="username">会员昵称</Radio>
                                <Radio value="phoneNumber">电话号码</Radio>
                                <Radio value="gender">性别</Radio>
                                <Radio value="birthday">生日</Radio>
                                <Radio value="height">身高</Radio>
                                <Radio value="weight">体重</Radio>
                                <Radio value="address">地址</Radio>
                                <Radio value="registrationTime">注册时间</Radio>
                            </Radio.Group>
                            <Select defaultValue="asc"
                                style={{ width: 120, marginTop: "20px" }}
                                onChange={value => { setSortWay(value) }}
                                options={[
                                    {
                                        value: "asc",
                                        label: "升序查看",
                                        key: "asc"
                                    }, {
                                        value: "desc",
                                        label: "降序查看",
                                        key: "desc"
                                    }
                                ]} />
                        </Modal>
                    </div>
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
                    // bordered={true} 
                    />
                </div>
            </Col>
            <Col span={1}></Col>
        </Row>
    );
}

export default MemberList;