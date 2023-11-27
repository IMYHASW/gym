/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-04-10 00:23:22
 * @LastEditors: Wang Chao
 * @LastEditTime: 2023-05-16 03:17:45
 * @FilePath: /userfrontend/src/components/home/notice/Notice.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import {
    NavBar,
    Collapse,
    NoticeBar,
    Footer,
} from 'antd-mobile';
import {
    useNavigate,
} from 'react-router-dom';
import './Notice.css';

const notices = [
    {
        key: '1',
        title: '五一劳动节惊喜活动周公告',
        text: '尊敬的会员：五一劳动节即将到来，为了感谢您一直以来对我们健身房的支持与厚爱，我们为您准备了一系列丰富多彩的健身活动。具体内容如下：1、五一健身惊喜礼包：自4月25日起至5月2日，'
            + '每日健身满两小时即可前往前台领取健身惊喜礼包，每日礼包的种类不同，先到先得，送完截至；2、团体健身课程：在假期期间，我们将为您提供多种团体健身课程，包括瑜伽、普拉提、有氧操等。'
            + '课程时间和地点请前往健身房咨询台查询；3、运动挑战赛：我们将在五一期间举办多项运动挑战赛，包括仰卧起坐、引体向上、深蹲等。挑战者有机会获得免费会员、健身装备等丰厚奖品；'
            + '4、亲子互动：五一假期，我们特别为家长和孩子们准备了亲子互动健身活动，让您和孩子一起享受运动的乐趣。在此，我们提醒您注意健康和安全，合理安排运动时间和强度，'
            + '遵守健身房规定和指导教练的建议。如有任何问题或建议，请随时联系我们的工作人员。祝您五一假期愉快，健康快乐！',
        releaseTime: '2023-04-15',
    },
    {
        key: '2',
        title: '清明节健身房闭馆通知',
        text: '尊敬的会员：您好！在这个清明节假期期间，我们的健身房将会在4月5日（周三）闭馆一天，以便进行全面的设备维护和清洁，为您提供更加舒适和安全的健身环境。在闭馆期间，'
            + '您可以选择在户外或者家里进行适当的健身活动。我们也为您准备了一些健身建议，以便您在假期期间保持健康和活力。我们将于4月6日（周四）正常营业，并为您提供更好的服务和支持。'
            + '如果您有任何问题或疑虑，请随时联系我们的工作人员。谢谢您对我们健身房的支持与理解，祝您假期愉快！',
        releaseTime: '2023-04-03',
    },
    {
        key: '3',
        title: '健身房开业公告！',
        text: '尊敬的会员：我们非常高兴地宣布，我们的健身房将于明天（2023年3月16日）正式开业！我们为您准备了全新的设备和设施，以及一支经验丰富的教练团队，帮助您实现健康、健壮和美好的身体。'
            + '我们的健身房每日的开放时间为早上6点到晚上10点，为了满足不同会员的需求，我们还将提供早、中、晚三个时段的健身课程，具体课程时间将在健身房内公布。为确保我们的会员能够安全健身，'
            + '我们将执行严格的健康和安全措施，包括社交距离、全面消毒和员工和会员的健康筛查等。我们期待着在我们的健身房里见到您！',
        releaseTime: '2023-03-16',
    }
]

const context = '公司秉承“专业、健康、尊贵、时尚”的服务宗旨和“健身旗舰、领跑未来”的发展理念，为广大市民提供最专业、时尚、舒适的健身场所，场馆内配备有体侧室、淋浴室和休息区，'
    + '开设有会员喜爱的各种时尚操课、瑜伽、韩式汗蒸房以及时下最受欢迎的减震跑步机。';

export default function Notice() {

    const navigate = useNavigate();

    const back = () =>
        navigate("/home");

    return (

        <>
            <div className='notice_top'>
                <NavBar onBack={back}>本店公告</NavBar>
            </div>
            <div className='notice_body'>
                <NoticeBar content={context} color='info' />
                <Collapse defaultActiveKey={['1']}>
                    {notices.map(notice => (
                        <Collapse.Panel key={notice.key} title={notice.title}>
                            {notice.text}<br />{notice.releaseTime}
                        </Collapse.Panel>
                    ))}
                </Collapse>
                <Footer className="notice_footer"></Footer>
            </div>
        </>
    );
}
