package com.gym.service;

import com.gym.entity.MemberCardDesign;
import com.gym.repository.MemberCardDesignRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

/**
 * @Title: MemberCardDesignService
 * @Author: Wu Jialing
 * @Package: com.gym.service
 * @Date: 2023/3/15 下午3:09
 * @description:
 */
@Service
@Slf4j
public class MemberCardDesignService {
    @Autowired
    MemberCardDesignRepository memberCardDesignRepository;

    public MemberCardDesign findMemberCardDesignByTypeAndDurationAndDurationUnit(String type,int duration,String durationUnit){
        return memberCardDesignRepository.findMemberCardDesignByTypeAndDurationAndDurationUnit(type, duration, durationUnit);
    }
    public MemberCardDesign save(MemberCardDesign memberCardDesign){
        return memberCardDesignRepository.save(memberCardDesign);
    }
    public List<MemberCardDesign> saveAll(List<MemberCardDesign> memberCardDesignList){
        return memberCardDesignRepository.saveAll(memberCardDesignList);
    }
    public Optional<MemberCardDesign> findById(Integer id){
        return memberCardDesignRepository.findById(id);
    }
    public List<MemberCardDesign> findAll(){
        return memberCardDesignRepository.findAll();
    }
    public List<MemberCardDesign> findAllWhichIsUsed(){
        return memberCardDesignRepository.findAllWhichIsUsed();
    }

    public int updatePriceAndUsedById(Integer id, BigDecimal price,boolean used){
        log.info("id:"+id);
        log.info("price:"+price);
        log.info("used:"+ used);
        return memberCardDesignRepository.updatePriceAndUsedById(id,price,used);
    }

}
