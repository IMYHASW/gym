package com.gym.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @Title: AddCheckInVo
 * @Author: Wu Jialing
 * @Package: com.gym.vo
 * @Date: 2023/3/13 上午10:44
 * @description: 前端传给后端的check in数据
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddCheckInVo {
    private String checkInMethod;
    private String number;
    private String operator;

}
