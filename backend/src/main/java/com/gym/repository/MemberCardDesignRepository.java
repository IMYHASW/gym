package com.gym.repository;

import com.gym.entity.MemberCardDesign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.List;

/**
 * @Title: MemberCardDesignRepository
 * @Author: Wu Jialing
 * @Package: com.gym.repository
 * @Date: 2023/3/15 下午3:16
 * @description:
 */
@Repository
public interface MemberCardDesignRepository extends JpaRepository<MemberCardDesign,Integer> , JpaSpecificationExecutor<MemberCardDesign> {


//    @Query(value = "select * from member_card_design where type = ?1 and duration = ?2 and durationUnit = ?3",nativeQuery = true)
    public MemberCardDesign findMemberCardDesignByTypeAndDurationAndDurationUnit(String type,int duration,String durationUnit);

    @Modifying(clearAutomatically = true,flushAutomatically = true)//设置@Modifying(clearAutomatically=true) 会刷新一级缓存，得到最新的数据
    public List<MemberCardDesign> findAll();

    @Query(value = "select * from member_card_design where used = true order by duration_unit,price asc",nativeQuery = true)
    @Modifying(clearAutomatically = true,flushAutomatically = true)
    public List<MemberCardDesign> findAllWhichIsUsed();

    @Transactional
    @Modifying(clearAutomatically = true,flushAutomatically = true)
    @Query(value = "update member_card_design set price = ?2 , used = ?3 where id = ?1",nativeQuery = true)
    public int updatePriceAndUsedById(Integer id, BigDecimal price,boolean used);


}
