package com.gym.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

/**
 * @Title: AccessControlRecord
 * @Author: Wu Jialing
 * @Package: com.example.model
 * @Date: 2023/3/12 下午10:51
 * @description: 签到/签退记录
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "check_in_record")
public class CheckInRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer memberCardId;
    /**
     * @DateTimeFormat是前端往后段传的时候使用，加在实体类中，然后controller中直接使用这个实体类接收参数。当前端传固定格式的字符串的时候会转换成date
     * @JsonFormat是后端往前端传输的时候使用。
     * */
//    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
//    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date recordDate;
    private String operator;//admin_username
//    @ManyToOne//连接表参数   name中是本实体类中关联字段   referencedColumnName：是该属性中的关联字段
//    @JoinColumn(name = "memberCardId",referencedColumnName = "id",insertable = false,updatable = false)
//    private MemberCard memberCard;
}
