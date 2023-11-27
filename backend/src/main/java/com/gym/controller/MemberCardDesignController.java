package com.gym.controller;

import com.gym.entity.MemberCardDesign;
import com.gym.entity.MemberCardDesignRecord;
import com.gym.repository.MemberCardDesignRecordRepository;
import com.gym.service.MemberCardDesignRecordService;
import com.gym.service.MemberCardDesignService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * @Title: MemberCardDesignController
 * @Author: Wu Jialing
 * @Package: com.gym.controller
 * @Date: 2023/3/15 下午3:05
 * @description: 管理员设计（新增）、修改、禁用会员卡
 */
@CrossOrigin("*")
@RestController
@RequestMapping("api/v1/member-card-design")
@Slf4j
public class MemberCardDesignController {
    @Autowired
    MemberCardDesignService memberCardDesignService;
    @Autowired
    MemberCardDesignRecordService memberCardDesignRecordService;

    @PostMapping("/add")
    public ResponseEntity<HashMap<String, String>> addMemberCardDesign(@RequestBody MemberCardDesign memberCardDesign) {
        HashMap hashMap = new HashMap<>();
        MemberCardDesign memberCardDesign1 = memberCardDesignService.findMemberCardDesignByTypeAndDurationAndDurationUnit(memberCardDesign.getType(), memberCardDesign.getDuration(), memberCardDesign.getDurationUnit());
        if (memberCardDesign1 == null) {//如果没有这类会员卡则新增
            MemberCardDesign memberCardDesign2 = memberCardDesignService.save(memberCardDesign);

            MemberCardDesignRecord memberCardDesignRecord = new MemberCardDesignRecord();
            memberCardDesignRecord.setMemberCardDesignId(memberCardDesign2.getId());
            memberCardDesignRecord.setOperation("add");
            memberCardDesignRecord.setNewPrice(memberCardDesign2.getPrice());
            memberCardDesignRecord.setNewUsed(memberCardDesign2.getUsed());
            log.info("memberCardDesign: "+memberCardDesign.toString());
            log.info("memberCardDesign2: "+memberCardDesign2.toString());
            log.info("memberCardDesignRecord: " + memberCardDesignRecord);
            memberCardDesignRecordService.save(memberCardDesignRecord);
            hashMap.put("result", "succeed");
            hashMap.put("message", "成功创建会员卡：" + memberCardDesign2.toString());
        } else {//有则返回已存在信息
            hashMap.put("result", "failed");
            hashMap.put("message", "该类会员卡已存在：" + memberCardDesign1.toString());
        }
        return ResponseEntity.ok(hashMap);
    }

    @GetMapping("/all")
    public ResponseEntity<List> getAllMemberCardDesign() {
        List<MemberCardDesign> memberCardDesignList = new ArrayList<>();
        memberCardDesignList = memberCardDesignService.findAll();
        return ResponseEntity.ok(memberCardDesignList);
    }

    @GetMapping("/all-used")
    public ResponseEntity<List> getMemberCardDesignWhichIsUsed(){
        return ResponseEntity.ok().body(memberCardDesignService.findAllWhichIsUsed());
    }

    @Transactional
    @PutMapping("/update/{id}/{oldPrice}/{oldUsed}/{newPrice}/{newUsed}")
    public ResponseEntity<HashMap> updateMemberCardDesign(@PathVariable("id") Integer id,
                                                          @PathVariable("oldPrice") BigDecimal oldPrice,
                                                          @PathVariable("oldUsed") boolean oldUsed,
                                                          @PathVariable("newPrice") BigDecimal newPrice,
                                                          @PathVariable("newUsed") boolean newUsed) {
        log.info("pathVariable: "+id+","+oldPrice+","+oldUsed+","+newPrice+","+newUsed);
        HashMap hashMap = new HashMap<>();
        int update = memberCardDesignService.updatePriceAndUsedById(id, newPrice, newUsed);
        if (update < 1) {
            hashMap.put("result", "failed");
            hashMap.put("message", "更新失败！更新了" + update + "条数据");
        } else {
            MemberCardDesignRecord memberCardDesignRecord = new MemberCardDesignRecord();
            memberCardDesignRecord.setOldPrice(oldPrice);
            memberCardDesignRecord.setNewPrice(newPrice);
            memberCardDesignRecord.setOldUsed(oldUsed);
            memberCardDesignRecord.setNewUsed(newUsed);
            memberCardDesignRecord.setOperation("update");
            memberCardDesignRecordService.save(memberCardDesignRecord);
            hashMap.put("result", "succeed");
            hashMap.put("message", "更新成功！更新了" + update + "条数据");
        }
        return ResponseEntity.ok(hashMap);
    }
}