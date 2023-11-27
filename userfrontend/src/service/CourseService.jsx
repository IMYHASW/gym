/*
 * @Date: 2023-03-14 14:49:53
 * @Author: Wu Jialing
 * @LastEditTime: 2023-04-23 22:48:38
 * @FilePath: /userfrontend/src/service/CourseService.jsx
 * @Description: 
 */

import axios from "axios";
const COURSE_BASE_API_URL = "http://localhost:8080/api/v1/course"
const CLASSTIME_BASE_API_URL = "http://localhost:8080/api/v1/classTime"
const CLASSES_BASE_URL = "http://localhost:8080/api/v1/classes"

class CourseService {

    findClassesByDate(formDate) {
        return axios.post(CLASSTIME_BASE_API_URL + "/findClassesByDate", formDate);
    }
    getClassesById(id){
        return axios.get(CLASSES_BASE_URL+`/findClassesById/${id}`)
    }
    buyCourse(formDate){
        return axios.put(CLASSES_BASE_URL+"/buyClasses",formDate)
    }
}

export default new CourseService;