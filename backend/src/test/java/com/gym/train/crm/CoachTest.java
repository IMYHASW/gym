package com.gym.train.crm;

import com.gym.entity.Coach;
import com.gym.service.CoachService;
import com.gym.utils.Mock;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@SpringBootTest
public class CoachTest {

    @Autowired
    CoachService coachService;

    private Mock mock(){
        return new Mock();
    }

    Random r = new Random();

    @Test
    void generate() throws ParseException {
        List<Coach> coachList = new ArrayList<>();
        for (int i = 0; i < 20; i++) {
            Coach coach = new Coach();
            coach.setUsername(mock().randomName());
            java.sql.Date sqlDate = new java.sql.Date(mock().randomDate().getTime());
            coach.setBirth(sqlDate);
            coach.setWorkingYears(r.nextInt(7)+3);
            coach.setGender(mock().randomGender());
            coach.setEvaluation(mock().randomEvaluation());
            java.sql.Date sqlDate1 = new java.sql.Date(mock().randomDateTime().getTime());
            coach.setEntryDate(sqlDate1);
            coachList.add(coach);
        }
        coachService.saveAll(coachList);
    }

}
