import { Col, Row, Form, Input, message, Button, Radio, Space, Select } from "antd";
import { Group } from "antd/lib/avatar";
import { useEffect, useState } from "react";
import ClassesService from "../../../services/ClassesService";
import CoachService from "../../../services/CoachService";
/*
 * @Date: 2023-03-31 16:03:22
 * @Author: Wu Jialing
 * @LastEditTime: 2023-04-24 10:31:32
 * @FilePath: /adminfrontend/src/pages/ClassManagement/AddClass/index.jsx
 * @Description: 添加课程
 */
function AddClass() {
    const [form] = Form.useForm()
    const coaches = []
    const [coachOptions,setCoachOptions] =useState()
    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 6,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 14,
            },
        },
    };
    const courseTagOptions = [
        {
            value: "减脂",
            label: "减脂"
        }, {
            value: "塑形",
            label: "塑形"
        }, {
            value: "增肌",
            label: "增肌"
        }
    ]

    const getAllCoaches = ()=>{
        CoachService.getAll().then(
            response=>{
                response.data.map(coach =>{
                    coaches.push({
                        value:coach.id,
                        label:"("+coach.id+")"+coach.username
                    })
                })
                setCoachOptions(coaches)
            }
        ).catch(error=>{
            console.log(error);
        })
    }

    useEffect(()=>{
        getAllCoaches()
    },[])


    const onFinish = (values) => {
        console.log("AddCourse-values", values)
        let classTag = ""
        values.classTag.map((item,index)=>{
            if(index===0){
                classTag = item
            }else if(index > 0 ){
                classTag = classTag+","+item
            }
            
        })
        const formData = new FormData()
        formData.append("className",values.className)
        formData.append("classTag",classTag)
        formData.append("classType",values.classType)
        formData.append("coachId",values.coachId)
        formData.append("description",values.description)
        formData.append("difficulty",values.difficulty)
        formData.append("fee",values.fee)
        formData.append("maxMembersNumber",values.maxMembersNumber)
        formData.append("classRoom",values.classRoom)
        console.log("formData",formData.get("className"));
        ClassesService.add(formData).then(
            response=>{
                message.success("成功创建课程"+values.className+"!")
            }
        ).catch(error=>{
            message.error("创建课程失败")
        })
    }
    const onFinishFailed = (errorInfo) => {
        console.log("AddCourse-errorInfo", errorInfo)
        message.error("添加课程失败: " + errorInfo.errorFields[0].errors)
    }
    const handelCoachChange=(value)=>{
        console.log("handelCoachChange-value",value);
    }
    const handelCourseTagChange = (value) => {
        console.log("handelCourseTagChange-value", value);
    }

    return (
        <Row >
            <Col span={1}></Col>
            <Col span={22} style={{ padding: "40px", backgroundColor: "rgba(255,255,255,1)", alignContent: "center" }}>
                <div style={{
                    textAlign: "center",
                    fontFamily: "serif",
                    fontSize: "35px",
                    padding: "20px",
                }}>创建课程</div>
                <div>
                    <Form
                        {...formItemLayout}
                        form={form}
                        name="add-course"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        style={{ maxWidth: "100%" }}
                        size="large"
                    >
                        <Form.Item
                            label="课程名称"
                            name="className"
                            rules={[{
                                required: true,
                                message: "课程名称不能为空"
                            }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="课程类型"
                            name="classType"
                            rules={[{
                                required: true,
                                message: "课程类型不能为空"
                            }]}>
                            <Radio.Group>
                                <Space wrap size="middle">
                                    <Radio value="私教课">私教课</Radio>
                                    <Radio value="公共课">公共课</Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="课程标签"
                            name="classTag"
                            rules={[{
                                required: true,
                                message: "请选择课程标签"
                            }]}>
                            <Select
                                mode="tags"
                                style={{ width: '100%' }}
                                placeholder="选择或自定义课程标签"
                                onChange={handelCourseTagChange}
                                options={courseTagOptions} />
                        </Form.Item>


                        <Form.Item
                            label="课程难度"
                            name="difficulty"
                            rules={[{
                                required: true,
                                message: "请选择课程难度"
                            }]}
                        >
                            <Radio.Group>
                                <Radio value="入门">入门</Radio>
                                <Radio value="中阶">中阶</Radio>
                                <Radio value="高阶">高阶</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item 
                            label="课程描述"
                            name="description"
                            rules={[{
                                required:true,
                                message:"请填写课程描述"
                            }]}
                            >
                               <Input/>
                            </Form.Item>
                            <Form.Item 
                            label="上课费用"
                            name="fee"
                            rules={[{
                                required:true,
                                message:"请填写上课费用"
                            }]}
                            >
                               <Input/>
                            </Form.Item>
                            <Form.Item 
                            label="课程教练"
                            name="coachId"
                            rules={[{
                                required:true,
                                message:"请填写上课费用"
                            }]}
                            >
                               <Select
                                    style={{width:120}}
                                    onChange={handelCoachChange}
                                    options={coachOptions}
                                    
                               />
                            </Form.Item>
                            
                            <Form.Item
                            label="上课教室"
                            name="classRoom"
                            rules={[{
                                required: true,
                                message: "请选择上课教室"
                            }]}
                        >
                            <Input/>
                        </Form.Item>
                            
                            <Form.Item 
                            label="最多选课人数"
                            name="maxMembersNumber"
                            rules={[{
                                required:true,
                                message:"请填写最多选课人数"
                            }]}
                            >
                               <Input/>
                            </Form.Item>

                        <Form.Item wrapperCol={{ offset: 11, span: 16, }}>
                            <Button type="primary" htmlType="submit">新建课程</Button>
                        </Form.Item>
                    </Form>
                </div>
            </Col>
            <Col span={1}></Col>
        </Row>

    );
}

export default AddClass;