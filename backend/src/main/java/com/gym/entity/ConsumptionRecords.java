package com.gym.entity;

import java.math.BigDecimal;

/**
 * @Title: ConsumptionRecords
 * @Author: Wu Jialing
 * @Package: com.gym.entity
 * @Date: 2023/3/14 下午10:29
 * @description: 会员卡消费记录
 */
public class ConsumptionRecords {
    private Integer id;
    private Integer memberCardId;
    //消费类型：会员卡充值、课程消费
    private String type;
    //消费金额
    private BigDecimal amount;
    //备注
    private String remark;
}
