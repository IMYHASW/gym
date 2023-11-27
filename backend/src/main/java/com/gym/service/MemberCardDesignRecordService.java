package com.gym.service;

import com.gym.entity.MemberCardDesignRecord;
import com.gym.repository.MemberCardDesignRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Title: MemberCardDesignRecordService
 * @Author: Wu Jialing
 * @Package: com.gym.service
 * @Date: 2023/3/15 下午5:38
 * @description: 记录会员卡修改记录：新增、修改
 */
@Service
public class MemberCardDesignRecordService {
    @Autowired
    MemberCardDesignRecordRepository memberCardDesignRecordRepository;
    public MemberCardDesignRecord save(MemberCardDesignRecord memberCardDesignRecord){
        return memberCardDesignRecordRepository.save(memberCardDesignRecord);
    }
    public List<MemberCardDesignRecord> saveAll(List<MemberCardDesignRecord> memberCardDesignRecordList){
        return memberCardDesignRecordRepository.saveAll(memberCardDesignRecordList);
    }
}
