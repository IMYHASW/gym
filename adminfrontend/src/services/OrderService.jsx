/*
 * @Date: 2023-04-02 18:16:30
 * @Author: Wu Jialing
 * @LastEditTime: 2023-04-20 23:25:29
 * @FilePath: /adminfrontend/src/services/OrderService.jsx
 * @Description: 
 */
import axios from "axios"
const ORDER_BASE_API_URL="http://localhost:8080/api/v1/order"
class OrderService{
    getAllOrders(offset,limit,sortBy,sortWay){
        return axios({
            baseURL:ORDER_BASE_API_URL,
            url:"/all",
            method:"get",
            params:{
                offset:offset,
                limit:limit,
                sortBy:sortBy,
                sortWay:sortWay
            }

        })
    }
}
export default new OrderService()