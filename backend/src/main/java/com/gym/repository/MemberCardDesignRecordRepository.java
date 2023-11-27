package com.gym.repository;

import com.gym.entity.MemberCardDesignRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * @Title: MemberCardDesignRecordRepository
 * @Author: Wu Jialing
 * @Package: com.gym.repository
 * @Date: 2023/3/15 下午5:32
 * @description:
 */
public interface MemberCardDesignRecordRepository extends JpaRepository<MemberCardDesignRecord,Integer>, JpaSpecificationExecutor<MemberCardDesignRecord> {
}
