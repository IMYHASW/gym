package com.gym.service;

import com.gym.entity.Member;
import com.gym.entity.MemberCard;
import com.gym.repository.MemberCardRepository;
import com.gym.vo.MemberCardsListVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

/**
 * @Title: MemberCardService
 * @Author: Wu Jialing
 * @Package: com.gym.service
 * @Date: 2023/3/29 上午11:32
 * @description: 会员的会员卡操作：购买等
 */
@Service
public class MemberCardService {
    @Autowired
    private MemberCardRepository memberCardRepository;
    @Autowired
    private MemberService memberService;

    @Transactional
    public MemberCard saveAndFlush(MemberCard memberCard){
        return memberCardRepository.saveAndFlush(memberCard);
    }

    public List<Object[]> pageAllMemberCardsListVo(Integer limit, Integer offset){
        return memberCardRepository.pageAllMemberCardsListVo(limit,offset);
    }
    public Page<MemberCardsListVo> pageAllMemberCardsListVo(Pageable pageable){
        return memberCardRepository.pageAllMemberCardsListVo(pageable);
    }
//    @Modifying(flushAutomatically = true,clearAutomatically = true)
    public Optional<MemberCard> findById(Integer id){
        return memberCardRepository.findById(id);
    }
    public int updateNumberOfCheckInsById(Integer id){
        return memberCardRepository.updateNumberOfCheckInsById(id);
    }
    public boolean existsMemberCardByMemberId(Integer memberId){
        return memberCardRepository.existsMemberCardByMemberId(memberId);
    }
    public MemberCard getMemberCardByMemberId(Integer memberId){
        return  memberCardRepository.getMemberCardByMemberId(memberId);
    }
    @Transactional//删除会员卡时，同时将会员的会员卡id置空
    public void deleteById(Integer id,String phoneNumber){
        Member member = memberService.findMemberByPhoneNumber(phoneNumber);
        member.setMemberCardId(null);
        memberService.saveAndFlush(member);
        memberCardRepository.deleteById(id);
    }
}
