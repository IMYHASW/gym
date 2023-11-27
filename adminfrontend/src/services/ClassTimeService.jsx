/*
 * @Date: 2023-04-23 15:19:41
 * @Author: Wu Jialing
 * @LastEditTime: 2023-04-23 18:25:30
 * @FilePath: /adminfrontend/src/services/ClassTimeService.jsx
 * @Description: 
 */
import axios from "axios"

const CLASSTIME_BASE_URL = "http://localhost:8080/api/v1/classTime"

class ClassTime{
    add(formDate){
        return axios.post(CLASSTIME_BASE_URL+"/add",formDate)
    }
    getClassTimesByClassId(classId){
        return axios.get(CLASSTIME_BASE_URL+`/getClassTimesByClassId/${classId}`)
    }

}
export default new ClassTime;