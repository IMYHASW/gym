package com.gym.controller;

import com.gym.entity.Member;
import com.gym.entity.MemberCard;
import com.gym.entity.MemberCardDesign;
import com.gym.entity.Orders;
import com.gym.service.MemberCardDesignService;
import com.gym.service.MemberCardService;
import com.gym.service.MemberService;
import com.gym.service.OrderService;
import com.gym.utils.DateUtil;
import com.gym.vo.MemberCardsListVo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 * @Title: MemberCardController
 * @Author: Wu Jialing
 * @Package: com.gym.controller
 * @Date: 2023/3/14 下午4:00
 * @description: 会员卡controller
 */
@CrossOrigin("*")
@RestController
@RequestMapping("api/v1/member-card")
@Slf4j
public class MemberCardController {

    @Autowired
    private MemberService memberService;
    @Autowired
    MemberCardService memberCardService;

    @Autowired
    private MemberCardDesignService memberCardDesignService;
    @Autowired
    private OrderService orderService;

    @PostMapping("/add")
    public ResponseEntity<?> addMemberCard(@RequestParam("memberBindingMethod") String memberBindingMethod,
                                           @RequestParam("number") String number,
                                           @RequestParam("memberCardDesignId") Integer memberCardDesignId,
                                           @RequestParam(value = "remark", required = false) String remark) {
        Integer memberId = null;
        Member member = null;
        if (memberBindingMethod.equals("phoneNumber")) {
            member = memberService.findMemberByPhoneNumber(number);
            memberId = member.getId();
            if (member == null) {//会员不存在
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("手机号不存在!");
            }
        } else if (memberBindingMethod.equals("memberId")) {
            memberId = Integer.valueOf(number);
            Optional<Member> memberOptional = memberService.findById(memberId);

            if (memberOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("会员ID不存在！");
            } else {
                member = memberOptional.get();
                MemberCard memberCard = memberCardService.getMemberCardByMemberId(member.getId());
                if (memberCard != null) {//会员已有会员卡则直接续期
                    Optional<MemberCardDesign> memberCardDesignOptional = memberCardDesignService.findById(memberCardDesignId);
                    if (memberCardDesignOptional.isEmpty()) {
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("会员卡类型不存在！");
                    }
                    MemberCardDesign memberCardDesign = memberCardDesignOptional.get();
                    Date oldExpirationDate = memberCard.getExpirationDate();
                    Date newExpirationDate = null;
                    if (memberCardDesign.getDurationUnit().equals("年")) {
                        newExpirationDate = DateUtil.getNextYear(oldExpirationDate, memberCardDesign.getDuration());
                    } else if (memberCardDesign.getDurationUnit().equals("月")) {
                        newExpirationDate = DateUtil.getNextMonth(oldExpirationDate, memberCardDesign.getDuration());
                    } else if (memberCardDesign.getDurationUnit().equals("日")) {
                        newExpirationDate = DateUtil.getNextDay(oldExpirationDate, memberCardDesign.getDuration());
                    }
                    memberCard.setExpirationDate(newExpirationDate);
                    memberCard.setMemberCardDesignId(memberCardDesignId);
                    memberCard.setCumulativeRenewals(memberCard.getCumulativeRenewals().add(memberCardDesign.getPrice()));
                    memberCardService.saveAndFlush(memberCard);//保存已经存在的数据会update
                    //添加订单
                    Orders orders = new Orders();
                    orders.setDate(new Date());
                    orders.setMemberId(memberId);
                    orders.setItem("会员卡续费");
                    orders.setItemId(memberCardDesignId);
                    orders.setPrice(memberCardDesign.getPrice());
                    orders.setRemark("会员卡续费");
                    orderService.saveAndFlush(orders);
                    return ResponseEntity.ok().body(member.getUsername() + "会员卡续费成功！");
                }
            }
        }
        Optional<MemberCardDesign> memberCardDesignOptional = memberCardDesignService.findById(memberCardDesignId);
        MemberCard memberCard = new MemberCard();
        MemberCardDesign memberCardDesign = null;
        if (memberCardDesignOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("该种类会员卡不存在！");
        } else {
            memberCardDesign = memberCardDesignOptional.get();
            memberCard.setMemberCardDesignId(memberCardDesign.getId());
        }

        memberCard.setMemberId(memberId);
        memberCard.setBalance(BigDecimal.valueOf(0));

        memberCard.setCumulativeRecharge(BigDecimal.valueOf(0));
        memberCard.setCumulativeRenewals(memberCardDesign.getPrice());
        memberCard.setNumberOfCheckIns(0);//累计健身打卡次数
        memberCard.setMemberPoints(0);//会员积分
        memberCard.setRemark(remark);
        Date dateOfApplication = new Date();
        memberCard.setDateOfApplication(dateOfApplication);
        Date expirationDate = null;
        if (memberCardDesign.getDurationUnit().equals("年")) {
            expirationDate = DateUtil.getNextYear(dateOfApplication, memberCardDesign.getDuration());
        } else if (memberCardDesign.getDurationUnit().equals("月")) {
            expirationDate = DateUtil.getNextMonth(dateOfApplication, memberCardDesign.getDuration());
        } else if (memberCardDesign.getDurationUnit().equals("日")) {
            expirationDate = DateUtil.getNextDay(dateOfApplication, memberCardDesign.getDuration());
        }
        memberCard.setExpirationDate(expirationDate);
        MemberCard memberCard1 = memberCardService.saveAndFlush(memberCard);


        if (memberCard1 == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("购买会员卡失败");
        }
        //把新办会员卡的id存入会员表
        assert member != null;
        member.setMemberCardId(memberCard1.getId());
        memberService.saveAndFlush(member);

        Orders orders = new Orders();
        orders.setDate(new Date());
        orders.setMemberId(memberId);
        orders.setItem("会员卡购买");
        orders.setItemId(memberCardDesignId);
        orders.setPrice(memberCardDesign.getPrice());
        orders.setRemark("会员卡购买");
        orderService.saveAndFlush(orders);
        return ResponseEntity.ok().body(member.getUsername() + "成功购买会员卡!");
    }

    @GetMapping("/list")
    public ResponseEntity<?> memberCardList(@RequestParam(defaultValue = "0") int offset,
                                            @RequestParam(defaultValue = "10") int limit,
                                            @RequestParam(defaultValue = "id") String sortBy,
                                            @RequestParam(defaultValue = "asc") String sortWay) {
        Pageable pageable = null;
        if (sortWay.equals("asc") || sortWay.equals("ASC")) {
            pageable = PageRequest.of(offset, limit, Sort.by(sortBy).ascending());
        } else if (sortWay.equals("desc") || sortWay.equals("DESC")) {
            pageable = PageRequest.of(offset, limit, Sort.by(sortBy).descending());
        }
        Page<MemberCardsListVo> memberCardsListVoPage = memberCardService.pageAllMemberCardsListVo(pageable);

        return ResponseEntity.ok().body(memberCardsListVoPage);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteMemberCard(@RequestParam("id") Integer id, @RequestParam("memberPhoneNumber") String memberPhoneNumber) {
        memberCardService.deleteById(id, memberPhoneNumber);
        return ResponseEntity.ok().body("删除成功！");
    }

    @PutMapping("/recharge")//会员卡充值
    public ResponseEntity<?> recharge(@RequestParam("id") Integer id,
                                      @RequestParam("rechargeAmount") BigDecimal rechargeAmount) {
        MemberCard memberCard = memberCardService.getMemberCardByMemberId(id);
        memberCard.setMemberPoints(memberCard.getMemberPoints() + rechargeAmount.intValue());
        memberCard.setBalance(memberCard.getBalance().add(rechargeAmount));
        memberCard.setCumulativeRecharge(memberCard.getCumulativeRecharge().add(rechargeAmount));
        memberCardService.saveAndFlush(memberCard);

        Orders orders = new Orders();
        orders.setDate(new Date());
        orders.setMemberId(id);
        orders.setItem("会员卡充值");
        orders.setItemId(id);
        orders.setPrice(rechargeAmount);
        orders.setRemark("会员卡充值");
        orderService.saveAndFlush(orders);

        return ResponseEntity.ok().body("充值成功！");
    }

    @PutMapping("/renewal")//会员卡续费
    public ResponseEntity<?> renewal(@RequestParam("memberId") Integer memberId,
                                     @RequestParam("memberCardDesignId") Integer memberCardDesignId,
                                     @RequestParam("method") String method) {
        log.info("memberCardDesignId:"+memberCardDesignId);
        MemberCard memberCard = memberCardService.getMemberCardByMemberId(memberId);
        Optional<MemberCardDesign> memberCardDesignOptional = memberCardDesignService.findById(memberCardDesignId);
        if (memberCardDesignOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("该种类会员卡不存在！");
        } else {
            MemberCardDesign memberCardDesign = memberCardDesignOptional.get();
            log.info("memberCardDesign:"+memberCardDesign.getDuration()+memberCardDesign.getDurationUnit());
            Date oldExpirationDate = memberCard.getExpirationDate();
            log.info("oldExpirationDate:"+oldExpirationDate);
            Date newExpirationDate = null;
            if (memberCardDesign.getDurationUnit().equals("年")) {
                newExpirationDate = DateUtil.getNextYear(oldExpirationDate, memberCardDesign.getDuration());
            } else if (memberCardDesign.getDurationUnit().equals("月")) {
                newExpirationDate = DateUtil.getNextMonth(oldExpirationDate, memberCardDesign.getDuration());
            } else if (memberCardDesign.getDurationUnit().equals("日")) {
                newExpirationDate = DateUtil.getNextDay(oldExpirationDate, memberCardDesign.getDuration());
            }
            memberCard.setExpirationDate(newExpirationDate);
            memberCard.setMemberCardDesignId(memberCardDesignId);
            memberCard.setCumulativeRenewals(memberCard.getCumulativeRenewals().add(memberCardDesign.getPrice()));
            if(method.equals("balance")) {
                memberCard.setBalance(memberCard.getBalance().subtract(memberCardDesign.getPrice()));
            }
            memberCardService.saveAndFlush(memberCard);//保存已经存在的数据会update
            //添加订单
            Orders orders = new Orders();
            orders.setDate(new Date());
            orders.setMemberId(memberId);
            orders.setItem("会员卡续费");
            orders.setItemId(memberCardDesignId);
            orders.setPrice(memberCardDesign.getPrice());
            orders.setRemark("会员卡续费");
            orderService.saveAndFlush(orders);
            return ResponseEntity.ok().body("续费成功！");
        }
    }

}
