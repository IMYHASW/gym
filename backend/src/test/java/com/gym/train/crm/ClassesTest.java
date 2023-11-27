package com.gym.train.crm;

import com.gym.entity.Classes;
import com.gym.repository.ClassesRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;

/**
 * @Title: ClassesTest
 * @Author: Wu Jialing
 * @Package: com.gym.train.crm
 * @Date: 2023/3/30 上午10:27
 * @description:
 */
@SpringBootTest
public class ClassesTest {
    @Autowired
    ClassesRepository classesRepository;
    @Test
    public void addClasses(){

        Classes classes = new Classes();
        classes.setClassName("瑜伽");
        classes.setClassType("公共课");
        classes.setClassTag("塑形");
        classes.setDifficulty("入门");
        classes.setDescription("我们的瑜伽课程包含了各种不同的体式和呼吸练习，适合各个年龄段和健康状况的学员。通过练习瑜伽，您可以改善身体的柔韧性、平衡感和姿势，同时还可以减轻压力、焦虑和紧张情绪。");
        classes.setFee(BigDecimal.valueOf(99.00));
        classes.setCoachId(1);
        classes.setMemberIds("1,2,3");
        classes.setMaxMembersNumber(60);
        classes.setSelectedMembersNumber(3);
        Classes classes1 = classesRepository.save(classes);

    }
}
