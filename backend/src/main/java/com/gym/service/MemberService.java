package com.gym.service;

import com.gym.entity.Member;
import com.gym.repository.MemberCardRepository;
import com.gym.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;
import java.sql.Date;
import java.util.*;

/**
 * @Title: MemberService
 * @Author: Wu Jialing
 * @Package: com.gym.service
 * @Date: 2023/3/13 下午3:00
 * @description:
 */
@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private MemberCardRepository memberCardRepository;

    public Member addMember(Member member){
        return memberRepository.save(member);
    }

    public Member findMemberByPhoneNumber(String phoneNumber){
        return memberRepository.findMemberByPhoneNumber(phoneNumber);
    }

    public Optional<Member> findById(Integer id){
        return memberRepository.findById(id);
    }
    public Integer findIdByPhoneNumber(String phoneNumber){
        return memberRepository.findIdByPhoneNumber(phoneNumber);
    }

    public String findPhoneNumberById(Integer id){return memberRepository.findPhoneNumberById(id);}
    public boolean existsMemberByPhoneNumber(String phoneNumber){
        return memberRepository.existsMemberByPhoneNumber(phoneNumber);
    }

    public Page<Member> findAll(Pageable pageable) {
        return memberRepository.findAll(pageable);
    }

    public Page<Member> findAll(String username,Integer memberCardId, String phoneNumber, String gender, Date birthday, Float height,
                                Float weight,String address, java.util.Date registrationTime, Pageable pageable) {
        Specification<Member> specification = new Specification<>() {
            @Override
            public Predicate toPredicate(Root root, CriteriaQuery query, CriteriaBuilder criteriaBuilder) {
                List<Predicate> predicates = new ArrayList<Predicate>();
                if(!StringUtils.isEmpty(username)){
                    Predicate usernameLikePredicate = criteriaBuilder.like(root.get("username"),"%"+username+"%");
                    predicates.add(criteriaBuilder.and(usernameLikePredicate));
                }
                if(!(memberCardId == null)){
                    Predicate memberCardIdPredicate = criteriaBuilder.equal(root.get("memberCardId"),memberCardId);
                    predicates.add(criteriaBuilder.and(memberCardIdPredicate));
                }
                if(!StringUtils.isEmpty(phoneNumber)){
                    Predicate phoneNumberPredicate = criteriaBuilder.like(root.get("phoneNumber"),"%"+phoneNumber+"%");
                    predicates.add(phoneNumberPredicate);
                }
                if(!StringUtils.isEmpty(gender)){
                    Predicate genderPredicate = criteriaBuilder.equal(root.get("gender"),gender);
                    predicates.add(genderPredicate);
                }
                if (birthday != null){
                    System.out.println(birthday);
                    Predicate birthdayPredicate = criteriaBuilder.equal(root.get("birthday"),birthday);
                    predicates.add(birthdayPredicate);
                }if (height != null){
                    Predicate heightPredicates = criteriaBuilder.like(root.get("height"),height+"%");
                    predicates.add(heightPredicates);
                }if(weight != null){
                    Predicate weightPredicates = criteriaBuilder.like(root.get("weight"),weight+"%");
                    predicates.add(weightPredicates);
                }if(address != null){
                    Predicate predicate = criteriaBuilder.like(root.get("address"),"%"+address+"%");
                    predicates.add(predicate);
                }
                if(registrationTime != null){

                    Calendar calendar = Calendar.getInstance();
                    calendar.setTime(registrationTime);
                    // 将时分秒,毫秒域清零
                    calendar.set(Calendar.HOUR_OF_DAY,0);
                    calendar.set(Calendar.MINUTE,0);
                    calendar.set(Calendar.SECOND,0);
                    calendar.set(Calendar.MILLISECOND,0);
                    java.util.Date start = calendar.getTime();

                    calendar.set(Calendar.HOUR_OF_DAY, 23);
                    calendar.set(Calendar.MINUTE, 59);
                    calendar.set(Calendar.SECOND, 59);
                    calendar.set(Calendar.MILLISECOND, 999);
                    java.util.Date end = calendar.getTime();

                    Predicate predicate = criteriaBuilder.between(root.get("registrationTime"),start,end);
                    predicates.add(predicate);
                }
                Predicate[] predicates1 = new Predicate[predicates.size()];
                return criteriaBuilder.and(predicates.toArray(predicates1));
            }
        };
        return memberRepository.findAll(specification,pageable);
    }

    public Member update(Member member) {
        return memberRepository.save(member);
    }

    @Transactional
    public void deleteMemberById(Integer id,Integer memberCardId) {
        memberRepository.deleteById(id);
        memberCardRepository.deleteById(memberCardId);
    }

    public void saveAndFlush(Member member) {
        memberRepository.saveAndFlush(member);
    }
}
