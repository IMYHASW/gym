/*
 * @Date: 2023-03-15 16:27:57
 * @Author: Wu Jialing
 * @LastEditTime: 2023-03-28 20:11:14
 * @FilePath: /adminfrontend/src/services/MemberCardDesignService.jsx
 * @Description: 新增、修改会员卡
 */
import axios from "axios";
const MEMBER_CARD_DESIGN_API_URL = "http://localhost:8080/api/v1/member-card-design"
class MemberCardDesignService{

    createMemberCardDesign(MemberCardDesign){
        return axios.post(MEMBER_CARD_DESIGN_API_URL+"/add",MemberCardDesign)
    }
    getAllMemberCardDesign(){
        return axios.get(MEMBER_CARD_DESIGN_API_URL+"/all")
    }
    getAllMemberCardDesignWhichIsUsed(){
        return axios.get(MEMBER_CARD_DESIGN_API_URL+"/all-used")
    }
    updateMemberCardDesign(id,oldPrice,oldUsed,newPrice,newUsed){
        return axios.put(MEMBER_CARD_DESIGN_API_URL+"/update/"+id+"/"+oldPrice+"/"+oldUsed+"/"+newPrice+"/"+newUsed)
    }
}
export default new MemberCardDesignService()