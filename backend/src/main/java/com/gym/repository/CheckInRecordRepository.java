package com.gym.repository;

import com.gym.entity.CheckInRecord;
import com.gym.vo.CheckInRecordVo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

/**
 * @Title: CheckInRecordRepository
 * @Author: Wu Jialing
 * @Package: com.gym.repository
 * @Date: 2023/3/30 下午5:01
 * @description:
 */
@Repository
public interface CheckInRecordRepository extends JpaRepository<CheckInRecord, Integer>, JpaSpecificationExecutor<CheckInRecord> {

    @Query(value = "SELECT new com.gym.vo.CheckInRecordVo(a.id,a.memberCardId,a.recordDate,a.operator,c.username,c.phoneNumber) " +
            "FROM CheckInRecord a " +
            "inner JOIN MemberCard b on b.id = a.memberCardId " +
            "inner JOIN Member c on c.id = b.memberId " +
            "WHERE (:memberCardId IS NULL OR a.memberCardId = :memberCardId )  " +
            "AND (:memberUsername IS NULL OR c.username LIKE CONCAT('%',:memberUsername,'%')) " +
            "AND (:memberPhoneNumber IS NULL OR c.phoneNumber LIKE CONCAT('%',:memberPhoneNumber,'%')) " +
            "AND (:recordDate IS NULL OR a.recordDate >= :recordDate)")
    Page<CheckInRecordVo> findCheckInRecordVosByConfident(@Param("memberCardId") Integer memberCardId,
                                                    @Param("memberUsername") String memberUsername,
                                                    @Param("memberPhoneNumber") String memberPhoneNumber,
                                                    @Param("recordDate") Date recordDate,
                                                    Pageable pageable);

}
