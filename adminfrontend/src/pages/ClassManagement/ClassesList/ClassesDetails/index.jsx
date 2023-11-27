/*
 * @Date: 2023-04-21 10:43:06
 * @Author: Wu Jialing
 * @LastEditTime: 2023-04-23 21:26:39
 * @FilePath: /adminfrontend/src/pages/ClassManagement/ClassesList/ClassesDetails/index.jsx
 * @Description: 课程详情：基本信息、上课时间（展示、添加）
 */
import { useEffect, useState } from 'react'
import { Button, DatePicker, Descriptions, Empty, Form, Input, Modal, Space, Timeline, message } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import ClassesService from '../../../../services/ClassesService'
import { values } from 'lodash'
import ClassTimeService from '../../../../services/ClassTimeService'
import moment from 'moment'
function ClassesDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { RangePicker } = DatePicker
    const [className, setClassName] = useState()
    const [classType, setClassType] = useState()
    const [classTag, setClassTag] = useState()
    const [difficulty, setDifficulty] = useState()
    const [description, setDescription] = useState()
    const [fee, setFee] = useState()
    const [maxMembersNumber, setMaxMembersNumber] = useState()
    const [selectedMembersNumber, setSelectedMembersNumber] = useState()
    const [coachId, setCoachId] = useState()
    const [classRoom, setClassRoom] = useState()

    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)
    const [classTimes, setClassTimes] = useState([])

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
    const [isAddTimeModalOpen, setIsAddTimeModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [form] = Form.useForm()
    const [form2] = Form.useForm()
    const getClassesById = () => {
        ClassesService.getById(id).then(
            response => {
                setClassName(response.data.className)
                setClassType(response.data.classType)
                setClassTag(response.data.classTag)
                setDifficulty(response.data.difficulty)
                setDescription(response.data.description)
                setFee(response.data.fee)
                setMaxMembersNumber(response.data.maxMembersNumber)
                setSelectedMembersNumber(response.data.selectedMembersNumber)
                setCoachId(response.data.coachId)
                setClassRoom(response.data.classRoom)
                console.log(response);
            }
        ).catch(error => {
            console.log(error);
        }).finally(() => {
            form.resetFields()
        })
    }
    const getClassTimesByClassId = () => {
        ClassTimeService.getClassTimesByClassId(id).then(
            response => {
                setClassTimes(response.data)
                console.log(response);
            }
        ).catch(error => {
            message.log("上课时间获取出错");
            console.log(error);
        }
        ).finally(() => {
        }
        )
    }
    const updateClasses = () => {
        const formDate = new FormData()
        formDate.append("id", id)
        formDate.append("className", className)
        formDate.append("classType", classType)
        formDate.append("classTag", classTag)
        formDate.append("difficulty", difficulty)
        formDate.append("description", description)
        formDate.append("fee", fee)
        formDate.append("maxMembersNumber", maxMembersNumber)
        formDate.append("selectedMembersNumber", selectedMembersNumber)
        formDate.append("coachId", coachId)

        ClassesService.update(formDate).then(
            response => {
                console.log(response);
                setClassName(response.data.className)
                setClassType(response.data.classType)
                setClassTag(response.data.classTag)
                setDifficulty(response.data.difficulty)
                setDescription(response.data.description)
                setFee(response.data.fee)
                setMaxMembersNumber(response.data.maxMembersNumber)
                setSelectedMembersNumber(response.data.selectedMembersNumber)
                setCoachId(response.data.coachId)
                message.success("修改成功")

            }).catch(error => {
                message.error("修改失败")
                console.log(error);
            }).finally(() => {
                form.resetFields()
            })
    }
    const deleteClasses = () => {
        ClassesService.deleteById(id).then(
            response => {
                console.log(response);
                message.success("删除成功")
                navigate("../classes-list")
            }).catch(error => {
                message.error("删除失败")
                console.log(error);
            }).finally(() => {
                form.resetFields()
            })
    }

    const addClassesTime = () => {
        console.log(id);
        let start = moment(startTime).format('YYYY-MM-DD HH:mm:ss')
        let end = moment(endTime).format('YYYY-MM-DD HH:mm:ss')

        const formDate = new FormData()
        formDate.append("classId", id)
        formDate.append("start", start)
        formDate.append("end", end)

        ClassTimeService.add(formDate).then(
            response => {
                console.log(response);
                message.success("添加成功")
            }).catch(error => {
                message.error("添加失败")
                console.log(error);
            }).finally(() => {
                form2.resetFields()
                getClassTimesByClassId()
                setStartTime(null)
                setEndTime(null)
            })
    }
    useEffect(() => {
        getClassesById()
        getClassTimesByClassId()
    }, [])

    const handleUpdateOk = () => {

        updateClasses()
        setIsUpdateModalOpen(false)
    };
    const handleUpdateCancel = () => {
        setIsUpdateModalOpen(false)
    };
    const handleAddTimeOk = () => {
        addClassesTime()
        setIsAddTimeModalOpen(false)
    };
    const handleAddTimeCancel = () => {
        setIsAddTimeModalOpen(false)
    };

    const handleDeleteOk = () => {
        deleteClasses()
        setIsDeleteModalOpen(false)
    }
    const handleDeleteCancel = () => {
        setIsDeleteModalOpen(false)
    }
    return (
        <div>
            <div style={{ height: "80px", backgroundColor: "white", margin: "30px 100px" }}>
                <div style={{ padding: "20px 30px", display: "inline-block" }}>
                    <span style={{ fontSize: "28px" }}>{className}</span>
                </div>
                <div style={{ padding: "20px 30px", display: "inline-block", float: "right" }} >
                    <Space>
                        <Button onClick={() => { setIsUpdateModalOpen(true) }}>编辑基本信息</Button>
                        <Button type='primary' onClick={() => { setIsAddTimeModalOpen(true) }}>新增上课时间</Button>
                        <Button danger ghost onClick={() => { setIsDeleteModalOpen(true) }}>删除</Button>
                        <Button onClick={()=>{navigate("../classes-list")}}>返回</Button>
                    </Space>
                    <Modal title="编辑课程基本信息" open={isUpdateModalOpen} onOk={handleUpdateOk} onCancel={handleUpdateCancel} okText="确认修改" cancelText="取消修改" >
                        <Form
                            form={form}
                            name='updateClasses'
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                            size="large"
                        >
                            <Form.Item label="课程ID" name="id" initialValue={id}>
                                <Input type="text" disabled />
                            </Form.Item>
                            <Form.Item label="课程名" name="className" initialValue={className}
                                rules={[{
                                    required: true,
                                    message: '请输入课程名',
                                }]}
                            >
                                <Input type="text" onChange={(e) => { setClassName(e.target.value) }} />
                            </Form.Item>
                            <Form.Item label="上课地点" name="classRoom" initialValue={classRoom}
                                rules={[{
                                    required: true,
                                    message: '请输入上课地点',
                                }]}
                            >
                                <Input type="text" onChange={(e) => { setClassRoom(e.target.value) }} />
                            </Form.Item>
                            <Form.Item label="课程类型" name="classType" initialValue={classType}
                                rules={[{
                                    required: true,
                                    message: '请输入课程类型',
                                }]}
                            >
                                <Input type="text" onChange={(e) => { setClassType(e.target.value) }} />
                            </Form.Item>
                            <Form.Item label="课程标签" name="classTag" initialValue={classTag}
                                rules={[{
                                    required: true,
                                    message: '请选择课程标签',
                                }]}>
                                <Input type="text" onChange={(e) => { setClassTag(e.target.value) }} />
                            </Form.Item>
                            <Form.Item label="课程难度" name="difficulty" initialValue={difficulty}
                                rules={[{
                                    required: true,
                                    message: '请选择课程难度',
                                }]}>
                                <Input type="text" onChange={(e) => { setDifficulty(e.target.value) }} />
                            </Form.Item>
                            <Form.Item label="课程描述" name="description" initialValue={description}
                                rules={[{
                                    required: true,
                                    message: '请输入课程描述',
                                }]} >
                                <Input type="text" onChange={(e) => { setDescription(e.target.value) }} />
                            </Form.Item>
                            <Form.Item label="上课费用" name="fee" initialValue={fee}
                                rules={[{
                                    required: true,
                                    message: '请输入上课费用',
                                }]} >
                                <Input type="text" onChange={(e) => { setFee(e.target.value) }} />
                            </Form.Item>
                            <Form.Item label="最多选课人数" name="maxMembersNumber" initialValue={maxMembersNumber}
                                rules={[{
                                    required: true,
                                    message: '请输入最多选课人数',
                                }]}>
                                <Input type="text" onChange={(e) => { setMaxMembersNumber(e.target.value) }} />
                            </Form.Item>
                            <Form.Item label="已经选课人数" name="selectedMembersNumber" initialValue={selectedMembersNumber}
                                rules={[{
                                    required: true,
                                    message: '请输入已经选课人数',
                                }]
                                }>
                                <Input type="text" disabled onChange={(e) => { setSelectedMembersNumber(e.target.value) }} />
                            </Form.Item>
                            <Form.Item label="教练ID" name="coachId" initialValue={coachId}
                                rules={[{
                                    required: true,
                                    message: '请选择教练',
                                }]}>
                                <Input type="text" onChange={(e) => { setCoachId(e.target.value) }} />
                            </Form.Item>

                        </Form>
                    </Modal>
                    <Modal title="新增上课时间" open={isAddTimeModalOpen} onOk={handleAddTimeOk} onCancel={handleAddTimeCancel} okText="确认添加" cancelText="取消添加" >
                        <Form
                            form={form2}
                            name='addClassesTime'
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}

                        >
                            <Form.Item label="课程ID" name="id" initialValue={id}>
                                <Input type="text" disabled />
                            </Form.Item>
                            <Form.Item label="上课时间" name="time"
                                rules={[{
                                    required: true,
                                    message: '请选择上课时间',
                                }]}
                            >
                                <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" onChange={(dateStrings) => {
                                    setStartTime(dateStrings[0])
                                    setEndTime(dateStrings[1])
                                    console.log(dateStrings);
                                }} />
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Modal title="确认删除" open={isDeleteModalOpen} onOk={handleDeleteOk} onCancel={handleDeleteCancel} okText="确认删除" cancelText="取消删除" >
                        <p>确认删除该课程吗？</p>
                    </Modal>


                </div>
            </div>
            <div style={{ minHeight: "80px", backgroundColor: "white", margin: "30px 100px", padding: "40px 50px" }}>
                <Descriptions title="课程信息" bordered column={3}>
                    <Descriptions.Item label="课程名">{className}</Descriptions.Item>
                    <Descriptions.Item label="上课地点">{classRoom}</Descriptions.Item>
                    <Descriptions.Item label="课程类型">{classType}</Descriptions.Item>
                    <Descriptions.Item label="课程标签">{classTag}</Descriptions.Item>
                    <Descriptions.Item label="课程难度">{difficulty}</Descriptions.Item>
                    <Descriptions.Item label="上课费用">{fee}</Descriptions.Item>
                    <Descriptions.Item label="最多选课人数">{maxMembersNumber}</Descriptions.Item>
                    <Descriptions.Item label="已经选课人数">{selectedMembersNumber}</Descriptions.Item>
                    <Descriptions.Item label="教练ID">{coachId}</Descriptions.Item>
                    <Descriptions.Item label="课程描述">{description}</Descriptions.Item>
                </Descriptions>
            </div>
            <div style={{ minHeight: "80px", backgroundColor: "white", margin: "30px 100px", padding: "40px 50px" }}>
                <div style={{marginBottom:'20px'}}>
                    <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                        上课时间
                    </span>
                </div>
                <div>
                    {classTimes.length === 0 ? <Empty /> :
                    <Timeline style={{paddingLeft:"20px"}}>
                        {
                            classTimes.map((item) => {
                                let start = moment(item.start).format('YYYY-MM-DD HH:mm:ss')
                                let end = moment(item.end).format('YYYY-MM-DD HH:mm:ss')
                                const classTime = start + " - " + end
                                return (
                                    <Timeline.Item key={item.id} children={classTime}>
                                    </Timeline.Item>
                                )
                            })
                        }

                    </Timeline>
                }
                </div>
            </div>
        </div>
    );
}

export default ClassesDetails;