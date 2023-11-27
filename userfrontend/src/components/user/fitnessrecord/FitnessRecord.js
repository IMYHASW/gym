/*
 * @Author: Wang Chao
 * @Date: 2023-05-16 02:01:49
 * @LastEditTime: 2023-05-16 09:31:54
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @FilePath: /userfrontend/src/components/user/fitnessrecord/FitnessRecord.js
 * @Description: 
 */
import { React, useEffect, useState } from "react";
import {
    NavBar,
    List,
} from 'antd-mobile';
import dayjs from "dayjs";
import {
    useNavigate
} from 'react-router-dom';
import moment from 'moment';
import './FitnessRecord.css';
import MemberService from "../../../service/MemberService";

export default function FitnessRecord() {

    const navigate = useNavigate();
    const [record, setRecord] = useState([])
    const memberCardId = window.localStorage.getItem("memberCardId");
    useEffect(() => {
        checkInRecord();
    }, [])

    const checkInRecord = () => {
        MemberService.checkInRecord(memberCardId).then((response) => {
            console.log(response.data.content);
            setRecord(response.data.content);
        }
        ).catch(error => {
            console.log(error);
        }
        )
    }

    const back = () =>
        navigate("/user");

    return (
        <>
            <div className='fitnessrecord_top'>
                <NavBar onBack={back}>健身记录</NavBar>
            </div>
            <div className='fitnessrecord_body'>
                <List header='打卡记录'>
                    {record.map((item) => {
                      
                        let t = moment(item.recordDate).format('YYYY-MM-DD HH:mm:ss')
                        return (
                            <List.Item key={item.id}>{t}</List.Item>
                        )
                    }
                    )}
                </List>

            </div>
        </>
    );
}
