/*
 * @Author: Wang Chao
 * @Date: 2023-05-16 02:01:49
 * @LastEditTime: 2023-05-16 03:18:59
 * @LastEditors: Wang Chao
 * @FilePath: /userfrontend/src/components/user/activity/Activity.js
 * @Description: 
 */
import React from "react";
import {
    NavBar,
    Steps,
    Footer,
} from 'antd-mobile';
import {
    useNavigate,
} from 'react-router-dom';
import {
    CheckCircleFill,
} from 'antd-mobile-icons';
import './Activity.css';

export default function Activity() {

    const { Step } = Steps;
    const navigate = useNavigate();

    const back = () =>
        navigate("/user");

    return (
        <>
            <div className='activity_top'>
                <NavBar onBack={back}>活动中心</NavBar>
            </div>
            <div className='activity_body'>
                <Steps
                    direction='vertical'
                    style={{
                        '--title-font-size': '17px',
                        '--description-font-size': '15px',
                        '--indicator-margin-right': '12px',
                        '--icon-size': '22px',
                        backgroundColor: '#fff',
                    }}
                >
                    <Step
                        title='健身房开业迎新活动'
                        status='finish'
                        description='活动开始时间：2023-03-16'
                        icon={<CheckCircleFill />}
                    />
                    <Step
                        title='课程折扣周'
                        status='finish'
                        description='活动开始时间：2023-04-06'
                        icon={<CheckCircleFill />}
                    />
                    <Step
                        title='五一劳动节惊喜活动周'
                        status='finish'
                        description='活动开始时间：2023-04-29'
                        icon={<CheckCircleFill />}
                    />
                    <Step
                        title='六一亲子运动节'
                        status='wait'
                        description='活动开始时间：2023-06-01'
                        icon={<CheckCircleFill />}
                    />
                </Steps>

                <div className='activity_title'>
                    <h2>活动预告：六一亲子运动节</h2>
                    <p>主题：顽童大作战</p>
                    <p>活动时间：2023-06-01</p>
                    <p>活动地点：好身材健身馆</p>
                    <p>活动内容：1. 童趣游戏区：设置多个游戏区域，包括踩气球、跳绳、接力跑等趣味游戏，
                        将孩子们的身体协调能力、团队合作精神得以锻炼，同时又能让孩子们感受到游戏的乐趣。
                        2. 亲子互动区：在活动现场设置亲子互动区，让家长和孩子们能在游戏互动中建立更加密切的感情联系，
                        增进彼此间的互动和沟通。</p>
                    <p>活动安排：9:00-9:30 注册签到，9:30-10:00 开幕式，10:00-12: 00 童趣游戏，12:00-13:00 午餐休息，
                        13:00-16:00 亲子互动，16:00-16:30 颁奖仪式。</p>
                    <p>以上是本次活动主要内容和安排，希望通过这个活动让孩子们在健康、快乐的环境中度过一个难忘的儿童节。</p>
                    <p>同时在现场设置复旦大学专业心理辅导队，提供应急心理服务，确保活动过程中的安全与顺利进行，真正让孩子们
                        度过一个开心难忘、轻松愉悦的六一儿童节。</p>
                </div>

                <Footer className="activity_footer"></Footer>

            </div>

        </>
    );
}
