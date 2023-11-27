/*
 * @Date: 2023-04-21 14:59:19
 * @Author: Wu Jialing
 * @LastEditTime: 2023-04-21 15:12:42
 * @FilePath: /userfrontend/src/service/MemberCardDesign.jsx
 * @Description: 
 */

import axios from 'axios';
const MEMBER_CARD_DESIGN_API_URL = "http://localhost:8080/api/v1/member-card-design"
class MemberCardDesignService{
    getAllMemberCardDesignWhichIsUsed(){
        return axios.get(MEMBER_CARD_DESIGN_API_URL+"/all-used")
    }
}
export default new MemberCardDesignService;