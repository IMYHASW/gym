package com.gym.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

/**
 * @Title: InputMemberCardVo
 * @Author: Wu Jialing
 * @Package: com.gym.vo
 * @Date: 2023/3/14 下午4:03
 * @description: 前端发送给后端的注册会员卡信息
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddMemberCardVo {

    private String memberBindingMethod;
    private String number;
    private Date expirationDate;//会员卡到期日期
    private BigDecimal balance;//会员卡余额
    private BigDecimal cumulativeRecharge;//累计消费
}
