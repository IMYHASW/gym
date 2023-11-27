package com.gym.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * @Title: MemberCardDesignRecord
 * @Author: Wu Jialing
 * @Package: com.gym.entity
 * @Date: 2023/3/15 上午10:15
 * @description: 记录会员卡的新增、修改等过程
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "member_card_design_record")
public class MemberCardDesignRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer memberCardDesignId;
    private String operation;// add / delete / update
    private BigDecimal oldPrice;
    private BigDecimal newPrice;
    private Boolean oldUsed;
    private Boolean newUsed;

}
