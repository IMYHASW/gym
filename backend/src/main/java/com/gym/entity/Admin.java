package com.gym.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Data
@NoArgsConstructor//生成无参构造
@AllArgsConstructor//生成有参构造
@Entity
@DynamicUpdate//自动修改
@DynamicInsert//自动添加
@Table(name = "admin")
public class Admin {
//    @GeneratedValue注解存在的意义主要就是为一个实体生成一个唯一标识的主键、@GeneratedValue提供了主键的生成策略。
//    @GeneratedValue注解有两个属性,分别是strategy和generator,
//    generator属性的值是一个字符串,默认为"",其声明了主键生成器的名称
//    strategy:生成策略,有四种：AUTO、IDENTITY、SEQUENCE、TABLE
    //-AUTO主键由程序控制, 是默认选项 ,不设置就是这个
    //-IDENTITY 主键由数据库生成, 采用数据库自增长, Oracle不支持这种方式
    //-SEQUENCE 通过数据库的序列产生主键, MYSQL  不支持
    //-Table 提供特定的数据库产生主键, 该方式更有利于数据库的移植
//    默认SpringBoot的@GeneratedValue 是不需要加参数的,但是如果数据库控制主键自增(auto_increment), 不加参数就会报错

    @Id//属性标识为数据库表中的主键
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "admin_name")
    private String adminUsername;

    @Column(name = "admin_password")
    private String adminPassword;

    @Column(name = "admin_phone")
    private String adminPhone;

    @Column(name = "admin_gender")
    private String adminGender;


}