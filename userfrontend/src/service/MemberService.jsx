/*
 * @Date: 2023-03-14 14:49:53
 * @Author: Wu Jialing
 * @LastEditTime: 2023-05-24 16:53:40
 * @FilePath: /userfrontend/src/service/MemberService.jsx
 * @Description: 
 */

import axios from "axios";
const MEMBER_BASE_API_URL = "http://localhost:8080/api/v2/member"
const MEMBER_BASE_API_URL2 = "http://localhost:8080/api/v1/member"
const MEMBER_CARD_BASE_API_URL = "http://localhost:8080/api/v1/member-card"
const CHECKIN_BASE_API_URL = "http://localhost:8080/api/v1/check-in"
class MemberService {

    memberLogin(formDate) {
        return axios.post(MEMBER_BASE_API_URL + "/login", formDate);
    }

    memberInformation(formDate) {
        return axios.post(MEMBER_BASE_API_URL + "/information", formDate);
    }
    findMemberCardById(id) {
        return axios.get(MEMBER_BASE_API_URL + "/findMemberCardById/" + id);
    }
    getIdByPhoneNumber(phoneNumber) {
        return axios.get(MEMBER_BASE_API_URL2 + "/getIdByPhoneNumber/" + phoneNumber);
    }
    updateMemberInformation(member) {
        return axios.put(MEMBER_BASE_API_URL2 + "/update", member);
    }
    renewal(memberId, memberCardDesignId,method) {//会员卡续费
        return axios({
            baseURL: MEMBER_CARD_BASE_API_URL,
            url: "/renewal",
            method: "put",
            params: {
                memberId: memberId,
                memberCardDesignId:memberCardDesignId,
                method:method
            }
        })
    }
    recharge(id, rechargeAmount) {//会员卡充值
        return axios({
            baseURL: MEMBER_CARD_BASE_API_URL,
            url: "/recharge",
            method: "put",
            params: {
                id: id,
                rechargeAmount: rechargeAmount
            }
        })
    }
    checkInRecord(memberCardId) {//会员卡签到记录
        return axios({
            baseURL: CHECKIN_BASE_API_URL,
            url: "/list",
            method: "GET",
            params: {
                memberCardId: memberCardId
            }
        })
    }
}

export default new MemberService;