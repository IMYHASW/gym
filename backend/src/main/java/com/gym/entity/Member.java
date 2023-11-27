package com.gym.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.sql.Date;
import javax.persistence.*;


/**
 * @Title: Member
 * @Author: Wu Jialing
 * @Package: com.meessiom.train.crm.member.model
 * @Date: 2023/2/24 上午11:37
 * @description: 会员表（Members）：包含会员的姓名、性别、生日、联系方式、地址、照片、身高、体重等基本信息
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Member")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    private String username;
    private String gender;
    private Date birthday;
    @Column(nullable = false)
    private String phoneNumber;
    @Column(nullable = false)
    private String password;
    private String address;
    private String avatar;//头像
    private Float height;
    private Float weight;
    private java.util.Date registrationTime;//会员注册时间

    private Integer memberCardId;
//    private Integer state;//状态：0：注销     1：正常使用
//    @OneToOne(cascade = CascadeType.ALL,targetEntity = MemberCard.class)
//    @JoinColumn(name = "memberCardId",insertable = false, updatable = false)
//    private MemberCard memberCard;
}
