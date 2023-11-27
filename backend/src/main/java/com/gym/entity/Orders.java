package com.gym.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

/**
 * @Title: Order
 * @Author: Wu Jialing
 * @Package: com.gym.entity
 * @Date: 2023/4/2 下午1:57
 * @description: 订单表：会员卡购买、续费订单、课程购买订单
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders")
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Date date;//订单创建日期
    private Integer memberId;//会员id
    private String item;//购买项目:memberCard/classes
    private Integer itemId;//购买项目id
    private BigDecimal price;//价格
    private String remark;//备注

}
