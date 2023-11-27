package com.gym.train.crm;

import com.gym.entity.MemberCardDesign;
import com.gym.entity.MemberCardDesignRecord;
import com.gym.service.MemberCardDesignRecordService;
import com.gym.service.MemberCardDesignService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * @Title: MemberCardTest
 * @Author: Wu Jialing
 * @Package: com.gym.train.crm
 * @Date: 2023/3/31 上午10:10
 * @description:
 */
@SpringBootTest
public class MemberCardDesignsTest {
    @Autowired
    MemberCardDesignService memberCardDesignService;
    @Autowired
    MemberCardDesignRecordService memberCardDesignRecordService;
    @Test
    public void addMemberCardDesigns_MemberCardDesignRecords(){
        List<MemberCardDesign> memberCardDesignList = new ArrayList<>();
        List<MemberCardDesignRecord> memberCardDesignRecordList = new ArrayList<>();
        for(int i = 0; i <  6;i++){
            MemberCardDesign memberCardDesign = new MemberCardDesign();
            memberCardDesign.setType("消费卡");
            memberCardDesign.setDuration(i+1);
            memberCardDesign.setDurationUnit("日");
            BigDecimal price = BigDecimal.valueOf(i*10 + 8);
            memberCardDesign.setPrice(price);
            memberCardDesign.setUsed(true);
            memberCardDesignList.add(memberCardDesign);
            MemberCardDesign memberCardDesign1 =  memberCardDesignService.save(memberCardDesign);

            MemberCardDesignRecord memberCardDesignRecord = new MemberCardDesignRecord();
            memberCardDesignRecord.setMemberCardDesignId(memberCardDesign1.getId());
            memberCardDesignRecord.setOperation("add");
            memberCardDesignRecord.setNewPrice(memberCardDesign1.getPrice());
            memberCardDesignRecord.setNewUsed(memberCardDesign1.getUsed());
            memberCardDesignRecordList.add(memberCardDesignRecord);
        }
        for(int i = 1;i < 6 ; i++){
            MemberCardDesign memberCardDesign = new MemberCardDesign();
            memberCardDesign.setType("消费卡");
            memberCardDesign.setDuration(i);
            memberCardDesign.setDurationUnit("月");
            BigDecimal price = BigDecimal.valueOf(i*30 + 8);
            memberCardDesign.setPrice(price);
            memberCardDesign.setUsed(true);
            memberCardDesignList.add(memberCardDesign);
            MemberCardDesign memberCardDesign1 =  memberCardDesignService.save(memberCardDesign);

            MemberCardDesignRecord memberCardDesignRecord = new MemberCardDesignRecord();
            memberCardDesignRecord.setMemberCardDesignId(memberCardDesign1.getId());
            memberCardDesignRecord.setOperation("add");
            memberCardDesignRecord.setNewPrice(memberCardDesign1.getPrice());
            memberCardDesignRecord.setNewUsed(memberCardDesign1.getUsed());
            memberCardDesignRecordList.add(memberCardDesignRecord);
        }

        for(int i = 1;i < 4 ; i++){
            MemberCardDesign memberCardDesign = new MemberCardDesign();
            memberCardDesign.setType("消费卡");
            memberCardDesign.setDuration(i);
            memberCardDesign.setDurationUnit("年");
            BigDecimal price = BigDecimal.valueOf(i*110 + 18);
            memberCardDesign.setPrice(price);
            memberCardDesign.setUsed(true);
            memberCardDesignList.add(memberCardDesign);
            MemberCardDesign memberCardDesign1 =  memberCardDesignService.save(memberCardDesign);

            MemberCardDesignRecord memberCardDesignRecord = new MemberCardDesignRecord();
            memberCardDesignRecord.setMemberCardDesignId(memberCardDesign1.getId());
            memberCardDesignRecord.setOperation("add");
            memberCardDesignRecord.setNewPrice(memberCardDesign1.getPrice());
            memberCardDesignRecord.setNewUsed(memberCardDesign1.getUsed());
            memberCardDesignRecordList.add(memberCardDesignRecord);
        }

        memberCardDesignRecordService.saveAll(memberCardDesignRecordList);

    }
}
