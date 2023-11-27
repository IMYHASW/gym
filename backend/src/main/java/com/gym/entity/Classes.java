package com.gym.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * @Title: Class
 * @Author: Wu Jialing
 * @Package: com.example.model
 * @Date: 2023/3/10 上午11:39
 * @description: 健身课程表（Classes）：包含健身课程的名称、课程时间、教练、所在教室等基本信息，以及课程描述、参与人数等附加信息
 * The name of the fitness class, class time, instructor, classroom, class description, number of participants
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Classes")
@JsonIgnoreProperties({"handler", "hibernateLazyInitializer"})
public class Classes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String className;
    private String classType;//私教、公共课。。。
    private String classTag;//课程标签：减脂、塑形、增肌。。。
    private String difficulty;//课程难度：入门、中阶、高阶
    private String classTimeIds;//上课时间ids
    private String description;//课程描述
    private BigDecimal fee;//上课费用
    private Integer coachId;//教练id
    private String classRoom;//教室
    private String memberIds;//选课人员
    private Integer maxMembersNumber;//最多选课人数
    @ColumnDefault("0")
    private Integer selectedMembersNumber;//已经选课人数

}
