package com.gym.repository;

import com.gym.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * @Title: MemberRepository
 * @Author: Wu Jialing
 * @Package: com.gym.repository
 * @Date: 2023/3/13 下午3:01
 * @description:
 */
@Repository
public interface MemberRepository extends JpaRepository<Member,Integer>, JpaSpecificationExecutor<Member> {

    public Member findMemberByPhoneNumber(String phoneNumber);

    @Query(value = "select id from Member where phoneNumber = :phoneNumber")
    public Integer findIdByPhoneNumber(String phoneNumber);

    public boolean existsMemberByPhoneNumber(String phoneNumber);

    @Query(value = "select phoneNumber from Member where id = :id")
    public String findPhoneNumberById(Integer id);
}
