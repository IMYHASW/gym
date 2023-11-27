/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-03-27 20:58:10
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-04-10 08:51:05
 * @FilePath: /userfrontend/src/components/user/User.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import {
    NavBar,
    Image,
    Footer,
} from 'antd-mobile';
import {
    useNavigate,
} from 'react-router-dom';
import './About.css';
import about_imgSrc from '../../../images/about.jpg'

const context = '公司秉承“专业、健康、尊贵、时尚”的服务宗旨和“健身旗舰、领跑未来”的发展理念，为广大市民提供最专业、时尚、舒适的健身场所，场馆内配备有体侧室、淋浴室和休息区，'
    + '开设有会员喜爱的各种时尚操课、瑜伽、韩式汗蒸房以及时下最受欢迎的减震跑步机。';

export default function About() {

    const navigate = useNavigate();

    const back = () =>
        navigate("/home");

    return (
        <>
            <div className='about_top'>
                <NavBar onBack={back}>关于我们</NavBar>
            </div>
            <div className='about_body'>
                <div className='about_text'>
                    {context}
                    <Image
                        className='about_img'
                        src={about_imgSrc}
                        fit='cover'
                    />
                </div>
                <Footer className='about_footer' label='About Us'>
                </Footer>
            </div>
        </>
    );
}
