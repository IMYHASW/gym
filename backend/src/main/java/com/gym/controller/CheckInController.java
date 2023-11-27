package com.gym.controller;

import com.gym.entity.CheckInRecord;
import com.gym.entity.Member;
import com.gym.entity.MemberCard;
import com.gym.repository.CheckInRecordRepository;
import com.gym.service.CheckInRecordService;
import com.gym.service.MemberCardService;
import com.gym.service.MemberService;
import com.gym.vo.AddCheckInVo;
import com.gym.vo.CheckInRecordVo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 * @Title: CheckInController
 * @Author: Wu Jialing
 * @Package: com.gym.controller
 * @Date: 2023/3/13 下午2:39
 * @description: 会员签到
 */
@CrossOrigin("*")
@RestController
@RequestMapping("api/v1/check-in")
@Slf4j
public class CheckInController {
    @Autowired
    MemberService memberService;
    @Autowired
    CheckInRecordService checkInRecordService;

    @Autowired
    MemberCardService memberCardService;

    @PostMapping(value = "/add")
    public ResponseEntity<?> addCheckInRecord(@RequestBody AddCheckInVo addCheckInVo) {
        log.info("AddCheckInVo:" + addCheckInVo);
        MemberCard memberCard = null;
        Date date = new Date();
        if (addCheckInVo.getCheckInMethod().equals("会员卡号")) {
            int len = addCheckInVo.getNumber().length();
            if (len > 10) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("会员卡号有误！");
            }
            Optional<MemberCard> memberCardOptional = memberCardService.findById(Integer.valueOf(addCheckInVo.getNumber()));
            if (memberCardOptional.isPresent()) {
                memberCard = memberCardOptional.get();
                if (date.compareTo(memberCard.getExpirationDate()) >= 0) {//会员卡过期，不允许签到
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("会员卡过期，签到失败！");
                }
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("会员卡号有误！");
            }
        } else if (addCheckInVo.getCheckInMethod().equals("手机号")) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("暂时不支持手机号签到！");
        }
        Optional<Member> memberOptional = memberService.findById(memberCard.getMemberId());
        Member member = memberOptional.get();
        CheckInRecord checkInRecord = new CheckInRecord();
        checkInRecord.setMemberCardId(memberCard.getId());
        checkInRecord.setRecordDate(date);
        checkInRecord.setOperator(addCheckInVo.getOperator());
        checkInRecordService.save(checkInRecord);
        memberCardService.updateNumberOfCheckInsById(memberCard.getId());

        return ResponseEntity.ok().body(member.getUsername() + "签到成功！");
    }

    @GetMapping("/list")
    public ResponseEntity<?> checkInRecordList(@RequestParam(defaultValue = "0") int offset,
                                               @RequestParam(defaultValue = "10") int limit,
                                               @RequestParam(defaultValue = "id") String sortBy,
                                               @RequestParam(defaultValue = "desc") String sortWay,
                                               @RequestParam(required = false)Integer memberCardId,
                                               @RequestParam(required = false)String memberUsername,
                                               @RequestParam(required = false)String memberPhoneNumber,
                                               @RequestParam(required = false) @DateTimeFormat(pattern ="yyyy-MM-dd") Date recordDate ) {
        Pageable pageable = null;
        if(sortWay.equals("asc")||sortWay.equals("ASC")){
            pageable = PageRequest.of(offset,limit, Sort.by(sortBy).ascending());
        }else {
            pageable = PageRequest.of(offset,limit, Sort.by(sortBy).descending());
        }
        System.out.println("sortBy:" + sortBy);
        Page<CheckInRecordVo> checkInRecordVos = checkInRecordService.findCheckInRecordVosByConfident(memberCardId,memberUsername,memberPhoneNumber,recordDate,pageable);
        return ResponseEntity.ok().body(checkInRecordVos);
    }
}
