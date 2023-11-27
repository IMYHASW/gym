import axios from "axios"

/*
 * @Date: 2023-04-01 16:19:39
 * @Author: Wu Jialing
 * @LastEditTime: 2023-04-22 22:44:51
 * @FilePath: /adminfrontend/src/services/ClassesService.jsx
 * @Description: 课程service
 */
const CLASSES_BASE_URL = "http://localhost:8080/api/v1/classes"
class ClassesService{
    add(Classes){
        return axios.post(CLASSES_BASE_URL+"/add",Classes)
    }
    getAllClasses(offset,limit,sort){
        return axios.get(CLASSES_BASE_URL+`/list?offset=${offset}&limit=${limit}&sort=${sort}`)
    }
    getById(id){
        return axios.get(CLASSES_BASE_URL+`/findClassesById/${id}`)
    }
    update(classes){
        return axios.put(CLASSES_BASE_URL+"/update",classes)
    }
    deleteById(id){
        return axios.delete(CLASSES_BASE_URL+`/delete/${id}`)
    }
}
export default new ClassesService()