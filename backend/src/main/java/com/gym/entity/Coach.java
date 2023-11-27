package com.gym.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

/**
 * @Title: Coach
 * @Author: Wu Jialing
 * @Package: com.example.model
 * @Date: 2023/3/12 下午10:07
 * @description: 健身教练表（Coach）：包含教练的姓名、性别、出生日期、工作年限、所授课程等基本信息，以及教练评价、教练排班、入职日期等细节信息。
 *              Name, gender, date of birth, working years, courses taught, evaluation英[ɪˌvæljuˈeɪʃ(ə)n], scheduling, entry date
 */@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="coach")
public class Coach {
     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String username;
    private String gender;
    private Date birth;
    private Integer workingYears;//工作年限
    private String evaluation;//教练评价
    private Date entryDate;//入职日期
 }
