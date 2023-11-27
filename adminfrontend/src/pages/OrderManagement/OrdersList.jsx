/*
 * @Date: 2023-04-02 13:44:25
 * @Author: Wu Jialing
 * @LastEditTime: 2023-04-20 19:53:08
 * @FilePath: /adminfrontend/src/pages/OrderManagement/OrdersList.jsx
 * @Description: 订单列表
 */
import { Col, message, Row, Table } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import OrderService from "../../services/OrderService";
function OrdersList() {
    const [dataSource, setDataSource] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [loading, setLoading] = useState(false)
    const [sortByValue,setSortByValue] = useState("id")
    const [sortWay,setSortWay] = useState("asc")
    const columns = [
        {
            title: "订单项目",
            dataIndex: "item"
        }, {
            title: "订单创建日期",
            dataIndex: "date"
        }, {
            title: "会员Id",
            dataIndex: "memberId"
        }, {
            title: "购买项目Id",
            dataIndex: "itemId"
        }, {
            title: "价格",
            dataIndex: "price"
        }
        , {
            title: "备注",
            dataIndex: "remark"
        },
    ]
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
    const getAllOrders = () => {
        const tempDataSource = []
        setLoading(true)
        OrderService.getAllOrders(currentPage - 1, limit, sortByValue, sortWay).then(
            response => {
                console.log("orders", response.data.content);
                response.data.content.map(order => {
                    tempDataSource.push({
                        "key":order.id,
                        "id": order.id,
                        "item": order.item,
                        "date": moment(order.date).format('YYYY-MM-DD HH:mm:ss'),
                        "memberId": order.memberId,
                        "itemId": order.itemId,
                        "price": order.price,
                        "remark": order.remark
                    })
                })
                setTotalPages(response.data.totalElements)
                setDataSource(tempDataSource)
                setLoading(false)
            }
        ).catch(error => {
            console.log(error)
        })
    }
    useEffect(() => {
        getAllOrders()
    }, [currentPage,limit])
    return (
        <Row>
            <Col span={1}></Col>
            <Col span={22} style={{ backgroundColor: "rgba(255,255,255,1)", alignContent: "center" }}>
                <div
                    style={{
                        textAlign: "center",
                        fontFamily: "serif",
                        fontSize: "35px",
                        padding: "20px",
                    }}>
                    订单列表
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
                </div>
            </Col>
            <Col span={1}></Col>
        </Row>);
}

export default OrdersList;