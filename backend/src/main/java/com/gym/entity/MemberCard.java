package com.gym.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

/**
 * @Title: MemberCard
 * @Author: Wu Jialing
 * @Package: com.example.model
 * @Date: 2023/3/10 上午9:41
 * @description: 会员卡：会员卡号、会员卡余额、累积充值、累计健身打卡次数、会员卡到期日期、办卡日期
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "member_card")
public class MemberCard {

    //会员卡号
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    //会员id，用于绑定会员卡和会员
    @Column(nullable = false)
    private Integer memberId;

    private Integer memberCardDesignId;//哪种会员卡

    @ColumnDefault("0")
    private BigDecimal balance;//会员卡余额

    @ColumnDefault("0")
    private BigDecimal cumulativeRecharge;//累积充值（单独的充值金额，不包括续费金额）
    @ColumnDefault("0")
    private BigDecimal cumulativeRenewals;//累积续费金额

    @ColumnDefault("0")
    private Integer numberOfCheckIns;//累计健身打卡次数

    private Date dateOfApplication;//办卡日期

    private Date expirationDate;//会员卡到期日期

    private Integer memberPoints;//会员积分
    private String remark;
//    @OneToMany
//    private CheckInRecord checkInRecord;
//    @OneToOne(targetEntity = Member.class)
//    @JoinColumn(name = "memberId",referencedColumnName = "id",insertable = false,updatable = false)
//    private Member member;

}
