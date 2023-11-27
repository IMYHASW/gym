package com.gym.train.crm;

import com.gym.entity.ClassTime;
import com.gym.repository.ClassTimeRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.util.Date;

/**
 * @Title: ClassTimeTest
 * @Author: Wu Jialing
 * @Package: com.gym.train.crm
 * @Date: 2023/3/30 上午10:27
 * @description:
 */
@SpringBootTest
public class ClassTimeTest {
    @Autowired
    ClassTimeRepository classTimeRepository;
    @Test
    public void addClassTime(){

        long currentTime = System.currentTimeMillis();
        long aftertwohoursTime = currentTime + 2 * 60 * 60 * 1000;
        long afterfourhoursTime = currentTime + 4 * 60 * 60 * 1000;
        long aftersixhoursTime = currentTime + 6 * 60 * 60 * 1000;

        ClassTime classTime1 = new ClassTime();
        classTime1.setClassId(1);
        classTime1.setStart(new Date(currentTime));
        classTime1.setEnd(new Date(aftertwohoursTime));
        classTimeRepository.save(classTime1);

        ClassTime classTime2 = new ClassTime();
        classTime2.setClassId(1);
        classTime2.setStart(new Date(afterfourhoursTime));
        classTime2.setEnd(new Date(aftersixhoursTime));
        classTimeRepository.save(classTime2);

    }
}
