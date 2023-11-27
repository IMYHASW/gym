/*
 * @Date: 2023-03-12 23:22:55
 * @Author: Wu Jialing
 * @LastEditTime: 2023-05-15 23:26:22
 * @FilePath: /adminfrontend/src/pages/CheckInManagement/CheckInRecordList/index.jsx
 * @Description: 门禁记录总览
 */

import { useNavigate } from "react-router-dom";
import { Button, Col, Row, message, Table, Input, Space, DatePicker, Modal, Radio, Select } from "antd";
import { useEffect, useState } from "react";
import CheckInService from "../../../services/CheckInService";
import moment from "moment";
function CheckInRecordList() {
    const [dataSource, setDataSource] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [loading, setLoading] = useState(false)
    const [isSortModalOpen, setIsSortModalOpen] = useState(false)
    const [sortByValue, setSortByValue] = useState("id")
    const [sortWay, setSortWay] = useState("desc")
    const [searchMemberCardId, setSearchMemberCardId] = useState(null)
    const [searchMemberUsername, setSearchMemberUsername] = useState(null)
    const [searchMemberPhoneNumber, setSearchMemberPhoneNumber] = useState(null)
    const [searchCheckInDate, setSearchCheckInDate] = useState(null)
    const navigate = useNavigate();

    const columns = [
        {
            title: "序号",
            dataIndex: "index"
        }, {
            title: "会员卡号",
            dataIndex: "memberCardId"
        }, {
            title: "会员昵称",
            dataIndex: "memberUsername"
        }, {
            title: "会员手机号",
            dataIndex: "memeberPhoneNumber"
        }, {
            title: "打卡时间",
            dataIndex: "recordDate",
        }, {
            title: "操作人员",
            dataIndex: "operator"
        }
    ]
    const onSelectChange = (newSelectedRowKeys) => {
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

    const getAllCheckInRecords = () => {
        setLoading(true)
        const checkInRecords = []
        CheckInService.getAllCheckInRecords(currentPage - 1, limit, sortByValue, sortWay, searchMemberCardId, searchMemberUsername, searchMemberPhoneNumber, searchCheckInDate).then(
            response => {
                response.data.content?.map((checkInRecord, index) => {
                    checkInRecords.push({
                        "index": index + 1,
                        "id": checkInRecord.id,
                        "key": checkInRecord.id,
                        "memberCardId": checkInRecord.memberCardId,
                        "memberUsername": checkInRecord.memberUsername,
                        "memeberPhoneNumber": checkInRecord.memberPhoneNumber,
                        "recordDate": moment(checkInRecord.recordDate).format("YYYY-MM-DD HH:mm:ss"),
                        "operator": checkInRecord.operator
                    })
                })
                setTotalPages(response.data.totalElements)
                setDataSource(checkInRecords)
                setLoading(false)
            }
        )
    }
    useEffect(() => {
        getAllCheckInRecords()
    }, [currentPage,limit])

    const handleSortModalOk = () => {
        setIsSortModalOpen(false)
        getAllCheckInRecords()
    }
    const handleSortModalCancel = () => {
        setIsSortModalOpen(false)
    }

    return (<Row>
        <Col span={1}></Col>
        <Col span={22}>

            <div style={{
                padding: "20px",
                margin: "20px 30px 20px 30px",
                backgroundColor: "rgba(255,255,255,1)"
            }}>
                <div className="search">

                    <Input placeholder="会员卡号" style={{ width: "12%", margin: "10px" }} onChange={e => { setSearchMemberCardId(e.target.value) }} />
                    <Input placeholder="会员昵称" style={{ width: "12%", margin: "10px" }} onChange={e => { setSearchMemberUsername(e.target.value) }} />
                    <Input placeholder="会员手机号" style={{ width: "12%", margin: "10px" }} onChange={e => { setSearchMemberPhoneNumber(e.target.value) }} />
                    <DatePicker placeholder="签到日期" style={{ width: "12%", margin: "10px" }} onChange={date => { setSearchCheckInDate(moment(date).format("YYYY-MM-DD")) }} />
                    <Button type="primary" style={{ width: "6%", margin: "10px" }} onClick={getAllCheckInRecords}>查询</Button>
                    <Button style={{ width: "6%", margin: "10px" }} onClick={() => { window.location.reload() }}>重置</Button>
                </div>
            </div>

            <div style={{ backgroundColor: "rgba(255,255,255,1)", margin: "20px 30px 20px 30px" }}>
                <div style={{ padding: "20px" }}>
                    <Button type="primary" onClick={() => { navigate("/dashboard/check-in-management/check-in-management-add") }}>新增打卡</Button>
                    <Button style={{ float: "right", marginRight: "20px" }} onClick={() => { setIsSortModalOpen(true) }}>排序</Button>
                    <Modal title="选择排序方式" open={isSortModalOpen} onOk={handleSortModalOk} onCancel={handleSortModalCancel}>
                        <Radio.Group onChange={e => { setSortByValue(e.target.value) }} value={sortByValue}>
                            <Radio value="a.memberCardId">会员卡号</Radio>
                            <Radio value="c.username">会员昵称</Radio>
                            <Radio value="c.phoneNumber">会员手机号</Radio>
                            <Radio value="recordDate">打卡时间</Radio>
                            <Radio value="operator">操作人员</Radio>
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
                    style={{ paddingLeft: '0 20px 0 20px' }}
                />
            </div>
        </Col>
        <Col span={1}></Col>
    </Row>);
}

export default CheckInRecordList;