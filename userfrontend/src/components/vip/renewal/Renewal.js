/*
 * @Date: 2023-04-21 14:48:51
 * @Author: Wu Jialing
 * @LastEditTime: 2023-05-15 21:21:27
 * @FilePath: /userfrontend/src/components/vip/renewal/Renewal.js
 * @Description: 
 */
import { React, useState, useEffect } from "react";
import { NavBar, List, Footer, Card, Toast, Button, Image, Popup, Space, ResultPage } from 'antd-mobile';
import { AntOutline, RightOutline } from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom';
import MemberCardDesignService from "../../../service/MemberCardDesignService";
import renewalYear from "../../../images/renewal-year.jpg"
import renewalMonth from "../../../images/renewal-month.jpg"
import renewalDay from "../../../images/renewal-day.jpg"
import MemberService from "../../../service/MemberService";
import "./Renewal.css"
function Renewal() {
    const navigate = useNavigate();
    const [memberCardDesigns, setMemberCardDesigns] = useState([])
    const [memberId, setMemberId] = useState()
    const [memberCard, setMemberCard] = useState({})
    const [visible1, setVisible1] = useState(false)
    const [visible2, setVisible2] = useState(false)

    const [memberCardDesign, setMemberCardDesign] = useState({})
    const [memberCardDesignId, setMemberCardDesignId] = useState()
    const [price, setPrice] = useState()
    const [duration, setDuration] = useState()
    const [durationUnit, setDurationUnit] = useState()
    const [type, setType] = useState()
    const [memberCardDesignType, setMemberCardDesignType] = useState()
    const [memberCardDesignDuration, setMemberCardDesignDuration] = useState()
    const [memberCardDesignDurationUnit, setMemberCardDesignDurationUnit] = useState()
    const [memberCardDesignPrice, setMemberCardDesignPrice] = useState()
    const [memberCardDesignId1, setMemberCardDesignId1] = useState()
    useEffect(() => {
        getMemberCardsType()
        setMemberId(localStorage.getItem('memberId'))
        findMemberCardById(localStorage.getItem('memberCardId'))
        console.log(localStorage);
    }, [])

    const getMemberCardsType = () => {
        const tempMemberCardDesigns = []
        MemberCardDesignService.getAllMemberCardDesignWhichIsUsed().then(
            response => {
                response.data.map(memberCardDesign => {
                    tempMemberCardDesigns.push({
                        "key": memberCardDesign.id,
                        "id": memberCardDesign.id,
                        "type": memberCardDesign.type,
                        "duration": memberCardDesign.duration,
                        "durationUnit": memberCardDesign.durationUnit,
                        "price": memberCardDesign.price,
                    })
                })
                setMemberCardDesigns(tempMemberCardDesigns)
                console.log("memberCardDesigns", memberCardDesigns)
            }
        )
    }
    const findMemberCardById = (id) => {
        MemberService.findMemberCardById(id).then((response) => {
            setMemberCard(response.data);
            console.log("memberCard----!", memberCard);
        }).catch(error => {
            console.log(error);
        })
    }
    const onClick = () => {
        Toast.show('续费成功！')
    }

    const onHeaderClick = () => {
        Toast.show('续费成功！')
    }

    const onBodyClick = () => {
        Toast.show('续费成功！')
    }
    const handleRenewalOkBalance = (memberId, memberCardDesignId, price) => {
        MemberService.renewal(memberId, memberCardDesignId, "balance").then(
            response => {
                navigate(`/vip/renewal/success/余额支付/${price}`)
            }
        ).catch(error => {
            Toast.show({
                icon: 'fail',
                content: '续费失败！',
            })
            console.log(error);
        })
        navigate("/vip")
    };
    const handleRenewalOkWeChat = (memberId, memberCardDesignId, price) => {
        console.log("memberId", memberId);
        console.log("memberCardDesignId", memberCardDesignId);
        console.log("price", price);
        MemberService.renewal(memberId, memberCardDesignId, "wechat").then(
            response => {
                navigate(`/vip/renewal/success/微信支付/${price}`)
            }
        ).catch(error => {
            Toast.show({
                icon: 'fail',
                content: '续费失败！',
            })
            console.log(error);
        })
        navigate("/vip")
    };
    const back = () =>
        navigate("/vip");
    return (
        <div>
            <div className='renewal_top'>
                <NavBar onBack={back}>会员卡续费</NavBar>
            </div>
            <div className='renewal_body'>
                <div className='renewal_margin' />
                {
                    memberCardDesigns.map((memberCardDesign) => {
                        return (
                            <Card
                                key={memberCardDesign.id}
                                title={
                                    <div style={{ width: '100%', fontWeight: 'normal' }} >
                                        <AntOutline style={{ marginRight: 4, color: '#FFA500' }} />
                                        {memberCardDesign.type}-{memberCardDesign.durationUnit}卡
                                    </div>
                                }
                                bodyClassName='renewal_card_body'
                                extra={<RightOutline />}
                                style={{ margin: 20, borderRadius: 16 }}
                            >
                                <div className='renewal_card_context'
                                    style={{ height: '100%', fontWeight: "normal", fontSize: 20 }}>
                                    {
                                        memberCardDesign.durationUnit === "月" ? <Image src={renewalMonth} /> :
                                            memberCardDesign.durationUnit === "年" ? <Image src={renewalYear} /> :
                                                memberCardDesign.durationUnit === "日" ? <Image src={renewalDay} /> : ""
                                    }
                                </div>
                                <div className='renewal_card_footer' onClick={e => e.stopPropagation()}>
                                    <span style={{ fontFamily: 'ZCOOLKuaiLe', fontSize: 20, color: "#FFA500" }}>￥{memberCardDesign.price}元 / {memberCardDesign.duration}{memberCardDesign.durationUnit}</span>
                                    <Button
                                        color='primary'
                                        onClick={() => {
                                            console.log(memberCardDesign);
                                            setMemberCardDesignId(memberCardDesign.id);
                                            setMemberCardDesignDuration(memberCardDesign.duration);
                                            setMemberCardDesignDurationUnit(memberCardDesign.durationUnit);
                                            setMemberCardDesignPrice(memberCardDesign.price);
                                            setVisible1(true)
                                        }}
                                        size='small'
                                        className="renewal_button"
                                    >
                                        续 费
                                    </Button>
                                    <Popup
                                        visible={visible1}
                                        onMaskClick={() => setVisible1(false)}
                                        bodyStyle={{
                                            borderTopLeftRadius: '8px',
                                            borderTopRightRadius: '8px',
                                            height: '40vh'
                                        }}
                                        showCloseButton
                                        onClose={() => {
                                            setVisible1(false)
                                        }}
                                        maskStyle={{ opacity: '0.09', background: '#000000', animation: 'none' }}
                                    >
                                        <div style={{ margin: '24px' }}>
                                            <div style={{ margin: 10 }}>
                                                <span style={{ fontSize: 18 }}>
                                                    请选择支付方式
                                                </span>
                                            </div>
                                            <div style={{ margin: 10 }}>
                                                <span style={{ fontSize: 15 }}>{/**fontFamily: 'ZCOOLKuaiLe',, color: "#FFA500"   */}
                                                    当前续费项目：{memberCardDesignPrice}元 / {memberCardDesignDuration}{memberCardDesignDurationUnit}
                                                </span>
                                                <br />
                                                <span style={{ fontSize: 15 }}>
                                                    会员卡当前余额：{memberCard.balance}元
                                                </span>
                                            </div>
                                            <div style={{ paddingTop: '10px' }}>
                                                <List renderHeader={() => <div>请选择支付方式</div>} className="popup-list">
                                                    <List.Item
                                                        extra={memberCardDesignPrice < memberCard.balance ? memberCardDesignPrice : "余额不足"}
                                                        disabled={memberCardDesignPrice > memberCard.balance ? true : false}
                                                        onClick={() => {
                                                            handleRenewalOkBalance(memberId, memberCardDesignId, memberCardDesignPrice)
                                                            setVisible1(false)
                                                        }}>余额支付</List.Item>
                                                    <List.Item
                                                        extra={memberCardDesign.price}
                                                        onClick={() => {
                                                            handleRenewalOkWeChat(memberId, memberCardDesignId, memberCardDesignPrice)
                                                            setVisible1(false)
                                                        }}>微信支付</List.Item>
                                                </List>
                                            </div>
                                            <div style={{ float: "right", margin: 20 }}>
                                                <Space>
                                                    <Button onClick={() => { setVisible1(false) }} >
                                                        取消
                                                    </Button>
                                                </Space>
                                            </div>
                                        </div>
                                    </Popup>
                                </div>
                            </Card>
                        )
                    })
                }
                <Footer className='renewal_footer'>
                </Footer>
            </div >
        </div >);
}

export default Renewal;