/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-04-10 08:03:41
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-05-16 09:59:07
 * @FilePath: /userfrontend/src/components/course/chooseCourse/ChooseCourse.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from "react";
import {
    NavBar,
    List,
    Button,
    Popup,
    Modal,
    Toast,
    Dialog,
} from 'antd-mobile';
import { useNavigate, useParams } from 'react-router-dom';
import './ChooseCourse.css';
import CourseService from "../../../service/CourseService";
import MemberService from "../../../service/MemberService";
import { isDisabled } from "@testing-library/user-event/dist/utils";

export default function ChooseCourse() {

    const [course, setCourse] = useState([]);
    const { classesId } = useParams()
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
    const [memberId, setMemberId] = useState()
    const [memberIds, setMemberIds] = useState([])
    const [hadBuy, setHadBuy] = useState(false)
    const [visible1, setVisible1] = useState(false)

    const navigate = useNavigate();

    const back = () => { navigate("/course"); }

    const getClassesById = () => {
        CourseService.getClassesById(classesId).then(
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
                setMemberIds(response.data.memberIds)
                // console.log(memberIds);
                console.log(response);
            }
        ).catch(error => {
            console.log(error);
        }).finally(() => {


            memberIds.map((item) => {
                if (item == localStorage.getItem('memberId')) {
                    setHadBuy(true)
                }
            })
            console.log(hadBuy)
        })
    }
    const getIdByPhoneNumber = () => {
        MemberService.getIdByPhoneNumber(localStorage.getItem('account')).then(
            response => {
                console.log("getIdByPhoneNumber", response);
                localStorage.setItem('memberId', response.data)
            }
        ).catch(error => {
            console.log(error);

        }).finally(() => {

        })
    }
    useEffect(() => {
        // setTimeout(() => {
        getClassesById();
        setMemberId(localStorage.getItem('memberId'))
        getIdByPhoneNumber()
        // }, 150);

    }, [])
    const buyCourse = () => {
        const formData = new FormData()
        formData.append('classesId', classesId)
        formData.append('memberId', memberId)
        CourseService.buyCourse(formData).then(
            response => {
                console.log(response);
                Toast.show({
                    content: '购买成功',
                    icon: 'success',
                    duration: 1000,
                })
            }
        ).catch(error => {
            console.log(error);
            Toast.show({
                content: '购买失败',
                icon: 'fail',
                duration: 1000,
            })
        })
    }

    return (
        <>
            <div className='course_top'>
                <NavBar onBack={back}>课程详情</NavBar>
            </div>
            <div className='course_body'>
                <List mode='card' style={{ paddingTop: 50 }}>
                    <List.Item extra={`NO.${classesId}`}>
                        课程编号
                    </List.Item>
                    <List.Item extra={className}>
                        课程名称
                    </List.Item>
                    <List.Item extra={classType}>
                        课程类型
                    </List.Item>
                    <List.Item extra={classTag}>
                        课程标签
                    </List.Item>
                    <List.Item extra={difficulty}>
                        课程难度
                    </List.Item>
                    <List.Item extra={description}>
                        课程介绍
                    </List.Item>
                    <List.Item extra={fee}>
                        课程费用
                    </List.Item>
                    <List.Item extra={maxMembersNumber}>
                        课程最大人数
                    </List.Item>
                    <List.Item extra={selectedMembersNumber}>
                        课程已选人数
                    </List.Item>
                    <List.Item extra={coachId}>
                        课程教练
                    </List.Item>
                    <List.Item extra={classRoom}>
                        课程教室
                    </List.Item>

                </List>
                <div style={{ float: "right", marginRight: 30 }}>
                    <Button color="primary"

                        // {...hadBuy ? { disabled: true } : { disabled: false }}
                        // disabled={()=>{
                        //     console.log("aaaa",localStorage.getItem('memberId'));
                        //     memberIds.map((item) => {

                        //         if (item === localStorage.getItem('memberId')) {
                        //             // setHadBuy(true)
                        //             return false
                        //         }
                        //         return true
                        //     })
                        // }}
                        onClick={() => {
                            Dialog.show({
                                title: '购买课程',
                                content: '确认购买该课程吗？',
                                closeOnAction: true,
                                actions: [
                                    [{
                                        key: 'cancel',
                                        text: '取消',
                                        onClick: () => {
                                            console.log('取消');
                                        }
                                    },
                                    {
                                        key: 'ok',
                                        text: '确认',
                                        onClick: () => {
                                            buyCourse()
                                        },
                                        bold: true,

                                    }]
                                ],

                            })

                        }}>购买课程</Button>
                    {/* <Popup visible={visible1} onClose={()=>{setVisible1(false)}}>购买成功</Popup> */}
                </div>

            </div>


        </>
    );
}
