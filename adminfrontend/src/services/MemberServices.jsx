/*
 * @Date: 2023-03-14 14:49:53
 * @Author: Wu Jialing
 * @LastEditTime: 2023-04-20 21:07:51
 * @FilePath: /adminfrontend/src/services/MemberServices.jsx
 * @Description: 
 */

import axios from "axios";
const MEMBER_BASE_API_URL = "http://localhost:8080/api/v1/member"

class MemberServices {

    createMember(formData) {
        return axios.post(MEMBER_BASE_API_URL + "/add", formData)
    }
    updateMember(member){
        return axios.put(MEMBER_BASE_API_URL+"/update",member)
    }

    deleteMember(id,memberCardId){
        return axios.delete(MEMBER_BASE_API_URL+"/delete/"+id+"/"+memberCardId)
    }

    getById(id) {
        return axios({
            baseURL: MEMBER_BASE_API_URL,
            url: "getById",
            params: {
                id: id
            }
        })
    }

    getAllMembers(page, size, sortByValue, sortWay, searchMemberUsername,searchMemberCardId, searchMemberPhoneNumber, searchMemberGender, searchBirthday, searchMemberHeight, searchMemberWeight, searchMemberAddress, searchRegistrationTime) {
        return axios({
            baseURL: MEMBER_BASE_API_URL,
            method: "get",
            url: "/list",
            params: {
                page: page,
                size: size,
                sortBy: sortByValue,
                sortWay: sortWay,
                username: searchMemberUsername,
                memberCardId:searchMemberCardId,
                phoneNumber: searchMemberPhoneNumber,
                gender: searchMemberGender,
                birthday: searchBirthday,
                height: searchMemberHeight,
                weight: searchMemberWeight,
                address: searchMemberAddress,
                registrationTime: searchRegistrationTime
            }
        })
    }
}

export default new MemberServices()