/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-03-27 15:35:37
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-04-10 08:16:57
 * @FilePath: /userfrontend/src/App.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import { TabBar } from 'antd-mobile'
import './Tabbar.css';
import {
    useNavigate,
    useLocation,
} from 'react-router-dom'
import {
    AppOutline,
    CalendarOutline,
    SmileOutline,
    UserOutline,
} from 'antd-mobile-icons'

const tabs = [
    {
        key: '/home',
        title: '首页',
        icon: <AppOutline />,
    },
    {
        key: '/course',
        title: '课程',
        icon: <CalendarOutline />,
    },
    {
        key: '/vip',
        title: '会员卡',
        icon: <SmileOutline />,
    },
    {
        key: '/user',
        title: '个人中心',
        icon: <UserOutline />,
    }
]

export default function Tabbar() {

    const Bottom = () => {
        const navigate = useNavigate()
        const { pathname } = useLocation()
        return (
            <TabBar activeKey={pathname} onChange={value => navigate(value)}>
                {tabs.map(item => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                ))}
            </TabBar>
        )
    }

    return (
        <div className='bottom'>
            <Bottom />
        </div>
    )
}