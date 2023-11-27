/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-03-27 20:57:57
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-05-15 23:23:07
 * @FilePath: /userfrontend/src/components/vip/Vip.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { React, useState, useEffect } from "react";
import {
    NavBar,
    List,
    Footer,
} from 'antd-mobile';
import { useNavigate,useLocation } from 'react-router-dom';
import './Vip.css';
import moment from 'moment';
import MemberService from "../../service/MemberService";

export default function Vip() {

    const [account, setAccount] = useState([]);
    const [memberCardId, setMemberCardId] = useState();
    const [memberCard, setMemberCard] = useState({});
    const location = useLocation();
    const navigate = useNavigate();

    const findAccountInformation = (account) => {
        const formData = new FormData();
        formData.append("account", account);
        MemberService.memberInformation(formData).then((response) => {
            setAccount(response.data);
            setMemberCardId(response.data.memberCardId);
            findMemberCardById(response.data.memberCardId)
        }).catch(error => {
            console.log(error);
        })
        // setLoading(false);
    }
    const findMemberCardById = (id) => {
        MemberService.findMemberCardById(id).then((response) => {
            console.log("findMemberCardById",response.data);
            setMemberCard(response.data);
        }).catch(error => {
            console.log(error);
        })
    }
    useEffect(() => {
        setTimeout(() => {
            findAccountInformation(window.localStorage.getItem("account"));
        }, 150);
    }, [])
    const handleRenewalClick = () => {
        navigate('/vip/renewal')
    }
    const handleRechargeClick = () => {
        navigate(`/vip/recharge/${memberCard.balance}`)
    }
    

    return (
        <>
            <div className='vip_top'>
                <NavBar backArrow={false}>会员卡</NavBar>
            </div>
            <div className='vip_body'>
                <List mode='card' header='基本信息'>
                    <List.Item extra={`NO.${memberCard.id}`} >
                        会员卡卡号
                    </List.Item>
                    <List.Item extra='消费卡' >
                        会员卡类型
                    </List.Item>
                    <List.Item extra={moment(new Date()).isBefore(memberCard.expirationDate) ? '有效期内' : '已过期'} >
                        状态
                    </List.Item>
                    <List.Item extra={moment(memberCard.dateOfApplication).format('YYYY-MM-DD')} >
                        办卡日期
                    </List.Item>
                    <List.Item extra={moment(memberCard.expirationDate).format('YYYY-MM-DD')}>
                        到期时间
                    </List.Item>
                    <List.Item onClick={handleRenewalClick}>
                        会员卡续费
                    </List.Item>
                </List>

                <List mode='card' header='资产'>
                    <List.Item extra={`${memberCard.balance} 元`}>
                        会员卡余额
                    </List.Item>
                    <List.Item extra={`${memberCard.memberPoints} 分`}>
                        会员卡积分
                    </List.Item>
                    {/* <List.Item onClick={handleClick}>
                        消费记录
                    </List.Item>
                     */}
                     <List.Item onClick={handleRechargeClick}>
                        充值
                    </List.Item>
                </List>

                {/* <List mode='card' header='其它操作'>
                    <List.Item onClick={handleClick}>
                        挂失与冻结
                    </List.Item>
                    <List.Item onClick={handleClick}>
                        积分兑换
                    </List.Item>
                    <List.Item onClick={handleClick}>
                        反馈与投诉
                    </List.Item>
                    <List.Item onClick={handleClick}>
                        常见问题
                    </List.Item>
                </List> */}

                <Footer className='vip_footer'>
                </Footer>

            </div>
        </>
    );
}
