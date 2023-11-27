package com.gym.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

/**
 * @Title: MemberCardsListVo
 * @Author: Wu Jialing
 * @Package: com.gym.vo
 * @Date: 2023/3/29 下午3:06
 * @description: 后台展示的已经开通的会员卡信息数据
 */
@Data
@NoArgsConstructor
//@AllArgsConstructor
public class MemberCardsListVo {
    /**会员卡信息*/
    private Integer id;//memberCardId
    private BigDecimal balance;//会员卡余额
    private BigDecimal cumulativeRecharge;//累积充值
    private Integer numberOfCheckIns;//累计健身打卡次数
    private Date dateOfApplication;//办卡日期
    private Date expirationDate;//会员卡到期日期
    private Integer memberPoints;//会员积分
    private String remark;//备注
    /**会员用户信息*/
    private String username;
    private String phoneNumber;
    /**会员卡种类信息*/
    private String type;//消费卡 (/times计次卡）
    private int duration;//期限 1、2、3、4、5......
    private String durationUnit;//期限单位 day/week/month/season/year  (/times计次卡）
    private BigDecimal price;

    public MemberCardsListVo(Integer id, BigDecimal balance, BigDecimal cumulativeRecharge, Integer numberOfCheckIns, Date dateOfApplication, Date expirationDate, Integer memberPoints, String remark, String username, String phoneNumber, String type, int duration, String durationUnit, BigDecimal price) {
        this.id = id;
        this.balance = balance;
        this.cumulativeRecharge = cumulativeRecharge;
        this.numberOfCheckIns = numberOfCheckIns;
        this.dateOfApplication = dateOfApplication;
        this.expirationDate = expirationDate;
        this.memberPoints = memberPoints;
        this.remark = remark;
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.type = type;
        this.duration = duration;
        this.durationUnit = durationUnit;
        this.price = price;
    }

    public MemberCardsListVo(Object[] objects) {
        this.id = (Integer) objects[0];
        this.balance = (BigDecimal) objects[1];
        this.cumulativeRecharge = (BigDecimal) objects[2];
        this.numberOfCheckIns = (Integer) objects[3];
        this.dateOfApplication = (Date) objects[4];
        this.expirationDate = (Date) objects[5];
        this.memberPoints = (Integer) objects[6];
        this.remark = (String) objects[7];
        this.username = (String) objects[8];
        this.phoneNumber = (String) objects[9];
        this.type = (String) objects[10];
        this.duration = (int) objects[11];
        this.durationUnit = (String) objects[12];
        this.price = (BigDecimal) objects[13];
    }
}
