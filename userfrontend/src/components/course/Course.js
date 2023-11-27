/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-03-27 17:56:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-04-23 22:10:09
 * @FilePath: /userfrontend/src/components/course/Course.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from "react";
import {
    NavBar,
    Calendar,
    Card,
    Tag,
    AutoCenter,
} from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import {
    FireFill,
    RightOutline,
} from 'antd-mobile-icons';
import './Course.css';
import CourseService from '../../service/CourseService';

const defaultSingle = new Date();

export default function Course() {

    const [courseByDate, setCourseByDate] = useState([]);
    const [selectDay, setSelectDay] = useState(defaultSingle);
    const navigate = useNavigate();

    const findClassesByDate = (day) => {
        const formData = new FormData();
        formData.append("day", dateToString(day));
        CourseService.findClassesByDate(formData).then((response) => {
            console.log(response.data);
            setCourseByDate(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    function dateToString(date) {
        const Y = date.getFullYear() + '-';
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
        return Y + M + D;
    }

    useEffect(() => {
        findClassesByDate(selectDay);
    }, [selectDay])

    function isoToString(isoStr) {
        const date = new Date(isoStr);
        const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return h + m + s;
    }

    return (
        <>
            <div className='course_top'>
                <NavBar backArrow={false}>课程</NavBar>
            </div>
            <div className='course_body'>
                <Calendar
                    className="calendar"
                    selectionMode='single'
                    defaultValue={defaultSingle}
                    onChange={val => { setSelectDay(val) }}
                />
                <div className="placeholder">
                    {courseByDate.length !== 0 ? courseByDate.map(items => (
                        <Card
                            key={items.id}
                            className="card"
                            title={
                                <div className="card-header-font">
                                    <FireFill className="card-header-icon" />
                                    {items.className}
                                    <Tag className="tag-left" color='brown'>
                                        {items.classTag}
                                    </Tag>
                                    {/* {items.classTag.map(item => (
                                    <Tag round color='#2db7f5'>
                                        {item}
                                    </Tag>
                                ))} */}
                                </div>
                            }
                            extra={<RightOutline />}
                            headerClassName="card-header"
                            bodyClassName="card-body"
                            onClick={() => { navigate(`/course/choose/${items.classesId}`)}}
                        >
                            <div>上课时间：{isoToString(items.start)} 至 {isoToString(items.end)}</div>
                        </Card>
                    )) :
                        <div className="noCourse">
                            <AutoCenter>暂无课程</AutoCenter>
                        </div>
                    }
                </div>
            </div>
        </>
    );
}
