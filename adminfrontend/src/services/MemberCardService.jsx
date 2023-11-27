/*
 * @Date: 2023-03-29 11:51:30
 * @Author: Wu Jialing
 * @LastEditTime: 2023-05-15 20:36:41
 * @FilePath: /adminfrontend/src/services/MemberCardService.jsx
 * @Description: 
 */
import axios from "axios";
import { method } from "lodash";
const MEMBER_CARD_BASE_API_URL = "http://localhost:8080/api/v1/member-card"

class MemberCardService {

    addMemberCard(formData) {
        return axios.post(MEMBER_CARD_BASE_API_URL + "/add", formData)
    }
    getAllMemberCards(offset, limit, sort) {
        return axios.get(MEMBER_CARD_BASE_API_URL + `/list?offset=${offset}&limit=${limit}&sort=${sort}`)
    }
    deleteMemberCard(id,memberPhoneNumber){
        return axios({
            baseURL:MEMBER_CARD_BASE_API_URL,
            url:"/delete",
            method:"delete",
            params:{
                id:id,
                memberPhoneNumber:memberPhoneNumber
            }
        })
    }
    recharge(id,rechargeAmount){//会员卡充值
        return axios({
            baseURL:MEMBER_CARD_BASE_API_URL,
            url:"/recharge",
            method:"put",
            params:{
                id:id,
                rechargeAmount:rechargeAmount
            }
        })
    }
    renewal(id,memberCardDesignId,method){//会员卡续费
        return axios({
            baseURL:MEMBER_CARD_BASE_API_URL,
            url:"/renewal",
            method:"put",
            params:{
                id:id,
                memberCardDesignId:memberCardDesignId,
                method:method
            }
        })
    }
}
export default new MemberCardService()