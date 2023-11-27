import axios from "axios"

/*
 * @Date: 2023-03-13 11:19:30
 * @Author: Wu Jialing
 * @LastEditTime: 2023-04-10 10:07:28
 * @FilePath: /adminfrontend/src/services/CheckInService.jsx
 * @Description: 签到打卡service
 */
const CHECK_IN_RECORD_BASE_URL = "http://localhost:8080/api/v1/check-in"
class CheckInService{

    addCheckIn(AddCheckInVo){
        return axios.post(CHECK_IN_RECORD_BASE_URL+"/add",AddCheckInVo);
    }
    getAllCheckInRecords(offset,limit,sortBy,sortWay,memberCardId,memberUsername,memberPhoneNumber,recordDate){
        return axios({
            baseURL:CHECK_IN_RECORD_BASE_URL,
            method:"get",
            url:"/list",
            params:{
                offset:offset,
                limit:limit,
                sortBy:sortBy,
                sortWay:sortWay,
                memberCardId:memberCardId,
                memberUsername:memberUsername,
                memberPhoneNumber:memberPhoneNumber,
                recordDate:recordDate
            }
        })
    }

}
export default new CheckInService()