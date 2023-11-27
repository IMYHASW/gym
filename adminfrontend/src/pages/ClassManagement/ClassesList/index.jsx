/*
 * @Date: 2023-03-31 16:04:55
 * @Author: Wu Jialing
 * @LastEditTime: 2023-04-23 17:59:22
 * @FilePath: /adminfrontend/src/pages/ClassManagement/ClassesList/index.jsx
 * @Description: 
 */
import { Button, Col, message, Row, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import ClassesService from "../../../services/ClassesService";
import { classesConstant } from "../../Constant/AllConstant";
function ClassesList() {
    const [dataSource, setDataSource] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const columns = [
        {
            title:"课程ID",
            dataIndex:classesConstant.id
        },
        {
            title: "课程名",
            dataIndex: classesConstant.className
        },{
            title: "上课地点",
            dataIndex:classesConstant.classRoom
        } ,{
            title: "课程类型",
            dataIndex: classesConstant.classType
        }, {
            title: "课程标签",
            dataIndex: classesConstant.classTag
        }, {
            title: "课程难度",
            dataIndex: classesConstant.difficulty
        }, {
            title: "课程描述",
            dataIndex: classesConstant.description
        }, {
            title: "上课费用",
            dataIndex: classesConstant.fee
        }, {
            title: "最多选课人数",
            dataIndex: classesConstant.maxMembersNumber
        }, {
            title: "已经选课人数",
            dataIndex: classesConstant.selectedMembersNumber
        }
        , {
            title: "更多操作",
            align: "center",
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={()=>{navigate(`../classes-details/${record.id}`)}}>详情</Button>
                    {/* <Link >删除</Link> */}
                </Space>)
        }
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
    const getAllClasses = () => {
        const tempDataSource = []
        setLoading(true)
        ClassesService.getAllClasses(currentPage-1,limit,['id','asc']).then(
            response => {
               
                response.data.content.map(classes =>{
                    tempDataSource.push({
                        "key":classes.id,
                        "id":classes.id,
                        "className":classes.className,
                        "classType":classes.classType,
                        "classTag":classes.classTag,
                        "difficulty":classes.difficulty,
                        "description":classes.description,
                        "classRoom":classes.classRoom,
                        "fee":classes.fee,
                        "maxMembersNumber":classes.maxMembersNumber,
                        "selectedMembersNumber":classes.selectedMembersNumber
                    })
                })
                setTotalPages(response.data.totalElements)
                setDataSource(tempDataSource)
                setLoading(false)
             }
        ).catch(error => {
            message.error("获取课程失败！")
            console.log(error);
        })
    }

    useEffect(() => {
        getAllClasses()
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
                    健身课程列表
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
        </Row>
    );
}

export default ClassesList;
