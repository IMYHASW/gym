package com.gym.repository;

import com.gym.entity.MemberCard;
import com.gym.vo.MemberCardsListVo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.NamedNativeQuery;
import javax.persistence.SqlResultSetMapping;
import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

/**
 * @Title: MemberCardRespository
 * @Author: Wu Jialing
 * @Package: com.gym.repository
 * @Date: 2023/3/29 上午11:34
 * @description:
 */
//@SqlResultSetMapping(name = "MemberCardsListVoMapping",classes = @ConstructorResult(
//        targetClass = com.gym.vo.MemberCardsListVo.class,
//        columns = {
//                @ColumnResult(name = "id",type = Integer.class),
//                @ColumnResult(name = "balance",type = BigDecimal.class),
//                @ColumnResult(name = "cumulativeRecharge",type = BigDecimal.class),
//                @ColumnResult(name = "numberOfCheckIns",type = Integer.class),
//                @ColumnResult(name = "dateOfApplication",type = Date.class),
//                @ColumnResult(name = "expirationDate",type = Date.class),
//                @ColumnResult(name = "memberPoints",type = Integer.class),
//                @ColumnResult(name = "remark",type = String.class),
//                @ColumnResult(name = "username",type = String.class),
//                @ColumnResult(name = "phoneNumber",type = String.class),
//                @ColumnResult(name = "type",type = String.class),
//                @ColumnResult(name = "duration",type = int.class),
//                @ColumnResult(name = "durationUnit",type = String.class),
//                @ColumnResult(name = "price",type = BigDecimal.class)
//        }
//))
@Repository
public interface MemberCardRepository extends JpaRepository<MemberCard,Integer>, JpaSpecificationExecutor<MemberCard> {

    /**想直接new生成对象，但是报错：SQL 语句有误*/
    @Query(value = "SELECT new com.gym.vo.MemberCardsListVo(b.id,b.balance,b.cumulativeRecharge,b.numberOfCheckIns,b.dateOfApplication,b.expirationDate,b.memberPoints,b.remark,a.username,a.phoneNumber,c.type,c.duration,c.durationUnit,c.price) " +
            "FROM MemberCard b "+
            "inner JOIN Member a on a.id = b.memberId "+
            "inner JOIN MemberCardDesign c on b.memberCardDesignId = c.id "+
            "ORDER BY b.id ASC "
            )
    Page<MemberCardsListVo> pageAllMemberCardsListVo(Pageable pageable);
    @Query(value = "SELECT b.id,b.balance,b.cumulative_recharge,b.number_of_check_ins,b.date_of_application,b.expiration_date,b.member_points,b.remark,a.username,a.phone_number,c.`type`,c.duration,c.duration_unit,c.price " +
            "FROM member_card b "+
            "inner JOIN `member` a on a.id = b.member_id "+
            "inner JOIN member_card_design c on b.member_card_design_id = c.id "+
            "ORDER BY b.id ASC "+
            "LIMIT :limit OFFSET :offset"
            ,nativeQuery = true)
    List<Object[]> pageAllMemberCardsListVo(@Param("limit")int limit, @Param("offset")int offset);

    @Transactional
    @Modifying(clearAutomatically = true,flushAutomatically = true)
    @Query(value = "update member_card set number_of_check_ins = number_of_check_ins + 1 where id = ?1",nativeQuery = true)
    public int updateNumberOfCheckInsById(Integer id);

    public boolean existsMemberCardByMemberId(Integer memberId);
//    @Modifying(flushAutomatically = true,clearAutomatically = true)
    public MemberCard getMemberCardByMemberId(Integer memberId);
}
