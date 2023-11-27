package com.gym.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * @Title: MemberCardDesign
 * @Author: Wu Jialing
 * @Package: com.gym.entity
 * @Date: 2023/3/15 上午10:06
 * @description: 会员卡设计：由管理员填写会员卡类型、价格。。。。
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "member_card_design")
public class MemberCardDesign {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String type;//消费卡 (/times计次卡）
    private int duration;//期限 1、2、3、4、5......
    private String durationUnit;//期限单位 日/月/年  (/times计次卡）
    private BigDecimal price;
    private Boolean used;//true/false

    public String toString(){

        String isUsed = "启用";
        if(!this.used){ isUsed = "禁用";}
        return this.type+" : " + this.price+"元" +"/"+this.duration+this.durationUnit  +"，目前使用状态：" + isUsed;
    }
}
