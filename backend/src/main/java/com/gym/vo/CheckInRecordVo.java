package com.gym.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import java.util.Date;

/**
 * @Title: CheckInRecordVo
 * @Author: Wu Jialing
 * @Package: com.gym.vo
 * @Date: 2023/3/13 上午10:38
 * @description: 签到数据list
 */
@Data
@NoArgsConstructor
public class CheckInRecordVo {
    private Integer id;
    private Integer memberCardId;
    private Date recordDate;
    private String operator;//admin_username
    private String memberUsername;
    private String memberPhoneNumber;

    public CheckInRecordVo(Integer id, Integer memberCardId, Date recordDate, String operator, String memberUsername, String memberPhoneNumber) {
        this.id = id;
        this.memberCardId = memberCardId;
        this.recordDate = recordDate;
        this.operator = operator;
        this.memberUsername = memberUsername;
        this.memberPhoneNumber = memberPhoneNumber;
    }

    public CheckInRecordVo(Object[] item) {
        this.id = (Integer) item[0];
        this.memberCardId = (Integer) item[1];
        this.recordDate = (Date) item[2];
        this.operator = (String) item[3];
        this.memberUsername = (String) item[4];
        this.memberPhoneNumber = (String) item[5];
    }
}
