/*
 * @Date: 2023-05-07 23:09:00
 * @Author: Wu Jialing
 * @LastEditTime: 2023-05-15 21:30:59
 * @FilePath: /userfrontend/src/components/vip/recharge/Recharge.js
 * @Description: 
 */
import { React, useState, useEffect } from "react";
import { NavBar, List, Footer, Card, Toast, Button, Image, Selector } from 'antd-mobile';
// import { DemoBlock } from 'demos'
import { AntOutline, RightOutline } from 'antd-mobile-icons'
import { useNavigate, useParams  } from 'react-router-dom';
import "./Recharge.css"
import MemberService from "../../../service/MemberService";
function Recharge() {
    const navigate = useNavigate();
    const {balance} = useParams();
    const [memberId, setMemberId] = useState()
    const options = [
        {
            label: '充10元',
            description: '送10积分',
            value: '10'
        },
        {
            label: '充20元',
            description: '送20积分',
            value: '20'
        },
        {
            label: '充30元',
            description: '送30积分',
            value: '30'
        },
        {
            label: '充50元',
            description: '送50积分',
            value: '50'
        },
        {
            label: '充100元',
            description: '送100积分',
            value: '100'
        },
        {
            label: '充200元',
            description: '送200积分',
            value: '200'
        },
    ]
    const [rechargeAmount, setRechargeAmount] = useState(options[0].value)
    useEffect(() => {
        setMemberId(localStorage.getItem('memberId'))
        console.log(localStorage);
    }, [])
    const recharge = () => {
        console.log("rechargeAmount",rechargeAmount);
        MemberService.recharge(memberId, rechargeAmount).then(
            response => {
                console.log(response);
                Toast.show({
                    icon: 'success',
                    content: '充值成功！',
                })
            }
        ).catch(error => {
            console.log(error);
            Toast.show({
                icon: 'fail',
                content: '充值失败！',
            })
            console.log(error);
        })
        navigate("/vip");
    }

    const back = () =>
        navigate("/vip");
    return (
        <div>
            <div className='recharge_top'>
                <NavBar onBack={back}>会员卡充值</NavBar>
            </div>
            <div className="recharge_body">

                <div className="recharge_margin">
                    {/* <DemoBlock title="充值金额"> */}
                    <div className="recharge_money">
                        <div className="recharge_title">
                            <span>当前余额￥</span>
                            <span style={{marginLeft:20}}>{balance}元</span>
                        </div>
                        <div className="recharge_title">
                            <span>充值金额</span>
                        </div>
                        <Selector
                            columns={3}
                            style={{
                                '--border-radius': '100px',
                                '--border': 'solid transparent 1px',
                                '--checked-border': 'solid var(--adm-color-primary) 1px',
                                '--padding': '8px 24px',
                                '--margin': '2px 8px',
                            }}
                            showCheckMark={false}
                            options={options}
                            defaultValue={options[0].value}
                            onChange={(value) => {
                                console.log(value);
                                setRechargeAmount(value[0])
                            }
                            }
                        ></Selector>
                        <Button block shape="rounded" color="primary" style={{ marginTop: '20px' }} onClick={recharge}>确认充值</Button>
                        {/* onClick={() => { navigate("/vip"); }} */}
                    </div>
                    {/* </DemoBlock> */}
                </div>
            </div>
        </div>
    )

}

export default Recharge;