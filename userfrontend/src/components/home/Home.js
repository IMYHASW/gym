/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-03-27 17:47:14
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-04-10 07:59:18
 * @FilePath: /userfrontend/src/components/home/Home.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import {
    Footer,
    NavBar,
    TabBar,
    Card,
    Swiper,
} from 'antd-mobile';
import {
    useNavigate,
    useLocation,
} from 'react-router-dom';
import {
    StarOutline,
    CalendarOutline,
    ContentOutline,
    FireFill,
} from 'antd-mobile-icons';
import { ReactComponent as ConceptLogo } from '../../images/concept.svg';
import { ReactComponent as ChooseLogo } from '../../images/choose.svg';
import { ReactComponent as PhotoShareLogo } from '../../images/photoshare.svg';
import photoShare1 from '../../images/photoshare1.jpg';
import photoShare2 from '../../images/photoshare2.jpg';
import photoShare3 from '../../images/photoshare3.jpg';
import photoShare4 from '../../images/photoshare4.jpg';
import './Home.css';

const tabs = [
    {
        key: '/home/notice',
        title: '本店公告',
        icon: <StarOutline />,
    },
    {
        key: '/course',
        title: '课程',
        icon: <CalendarOutline />,
    },
    {
        key: '/home/about',
        title: '关于我们',
        icon: <ContentOutline />,
    }
]

const concept = '我们的理念是：“促进健康，实现目标”。我们相信，健康是人类最宝贵的财富之一。因此，我们致力于通过提供高品质的健身设施、优秀的健身教练、'
    + '个性化的健身计划和多元化的健身课程，帮助客户们更好地促进身体健康，提高身体素质，降低疾病风险。同时，我们也非常注重帮助客户们实现自己的健身目标。'
    + '我们的健身教练将全程跟进客户的健身计划，通过科学的训练方法和丰富的健身知识，帮助客户们更快地达成自己的健身目标，比如减肥、增肌、塑形等。'
    + '我们的团队一直以来都保持着专业、敬业、热情的服务态度，希望能够为每一位客户提供贴心、周到的服务。我们也非常注重客户反馈和意见，不断改进和完善我们的服务质量，'
    + '让客户们在健身过程中得到更好的体验和收益。最后，我们再次感谢您的信任和支持，让我们一起努力，实现健康和目标！';

const photos = [photoShare1, photoShare2, photoShare3, photoShare4];

export default function Home() {

    const navigate = useNavigate()
    const { pathname } = useLocation()

    return (
        <>
            <div className='home_top'>
                <NavBar backArrow={false}>首页</NavBar>
            </div>
            <div className='home_body'>
                <div className='home_background'>
                    <div className='logo'>
                        <FireFill className='logo_img' />
                        好身材健身房
                    </div>
                </div>
                <div className='home_tabbar'>
                    <TabBar activeKey={pathname} onChange={value => navigate(value)}>
                        {tabs.map(item => (
                            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                        ))}
                    </TabBar>
                </div>
                <div className="home_concept">
                    <ConceptLogo />
                    <span className="home_concept_title">我们的理念</span>
                </div>
                <div className="home_concept_context">
                    {concept}
                </div>
                <div className="home_choose">
                    <ChooseLogo />
                    <span className="home_choose_title">为什么选择好身材？</span>
                </div>
                <div className="home_choose_context">
                    <div className="home_choose_card_left">
                        <Card headerClassName="home_choose_card_header" title={
                            <div className="home_choose_card_font">
                                1、科学验证
                            </div>
                        }>
                            每项课程均由专家团队进行研究设计和严格测试，以提供健身者所需的效果。
                        </Card>
                    </div>
                    <div className="home_choose_card_right">
                        <Card headerClassName="home_choose_card_header" title={
                            <div className="home_choose_card_font">
                                2、季度更新
                            </div>
                        }>
                            每季度焕新，更换音乐及动作编排，最大化解决“众口难调”问题。
                        </Card>
                    </div>
                    <div className="home_choose_card_left">
                        <Card headerClassName="home_choose_card_header" title={
                            <div className="home_choose_card_font">
                                3、流行音乐
                            </div>
                        }>
                            采用当前国际最流行的榜单音乐，时尚、活力、个性，减轻训练不适感。
                        </Card>
                    </div>
                    <div className="home_choose_card_right">
                        <Card headerClassName="home_choose_card_header" title={
                            <div className="home_choose_card_font">
                                4、相互鼓励
                            </div>
                        }>
                            和众多爱好者一起挑战自我，保持健康和工作积极性。
                        </Card>
                    </div>
                </div>
                <div className="home_share">
                    <PhotoShareLogo />
                    <span className="home_share_title">精彩照片</span>
                </div>
                <div className="home_share_context">
                    <Swiper loop autoplay>
                        {photos.map((photo, index) => (
                            <Swiper.Item key={index}>
                                <div
                                    className='swiperDiv'
                                    style={{ backgroundImage: `url(${photo})`, backgroundSize: '100% 100%' }}
                                >
                                </div>
                            </Swiper.Item>
                        ))}
                    </Swiper>
                </div>
                <Footer className="home_footer"></Footer>
            </div>
        </>
    );
}
