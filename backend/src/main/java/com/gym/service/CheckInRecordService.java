package com.gym.service;

import com.gym.entity.CheckInRecord;
import com.gym.entity.Member;
import com.gym.entity.MemberCard;
import com.gym.repository.CheckInRecordRepository;
import com.gym.vo.CheckInRecordVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


/**
 * @Title: CheckInRecordService
 * @Author: Wu Jialing
 * @Package: com.gym.service
 * @Date: 2023/3/30 下午5:01
 * @description:
 */
@Service
public class CheckInRecordService {
    @Autowired
    CheckInRecordRepository checkInRecordRepository;

    public CheckInRecord save(CheckInRecord checkInRecord) {
        return checkInRecordRepository.save(checkInRecord);
    }

    public Page<CheckInRecordVo> findCheckInRecordVosByConfident(Integer memberCardId, String memberUsername, String memberPhoneNumber, Date recordDate, Pageable pageable) {
        return  checkInRecordRepository.findCheckInRecordVosByConfident(memberCardId,memberUsername,memberPhoneNumber,recordDate,pageable);
    }
}
