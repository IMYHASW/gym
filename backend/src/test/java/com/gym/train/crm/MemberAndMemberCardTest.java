package com.gym.train.crm;

import com.gym.entity.Member;
import com.gym.entity.MemberCard;
import com.gym.entity.MemberCardDesign;
import com.gym.entity.Orders;
import com.gym.repository.MemberCardDesignRepository;
import com.gym.repository.MemberRepository;
import com.gym.service.MemberCardService;
import com.gym.service.OrderService;
import com.gym.utils.DateUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.DigestUtils;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.*;

/**
 * @Title: addMember
 * @Author: Wu Jialing
 * @Package: com.gym.train.crm.memberTest
 * @Date: 2023/3/13 下午3:22
 * @description:
 */
@SpringBootTest
public class MemberAndMemberCardTest {

    @Autowired
    MemberRepository memberRepository;
    @Autowired
    MemberCardDesignRepository memberCardDesignRepository;
    @Autowired
    OrderService orderService;
    @Autowired
    MemberCardService memberCardService;

    @Test
    void addMembers(){
        List<Member> memberList = new ArrayList<>();
        for(int i = 1;i < 100 ;i++){
            Member member = new Member();
            String username = "会员"+i;
            member.setUsername(username);
            String phone = new String();
            if(i < 10){
                phone = "1737554100" + String.valueOf(i);
            }else {
                phone = "173755410" + String.valueOf(i);
            }
            member.setPhoneNumber(phone);
            String gender = (i%2)==0 ? "男" : "女";
            member.setGender(gender);
            String password = "123456";
            String password2 = DigestUtils.md5DigestAsHex((password+phone).getBytes());
            member.setPassword(password2);

            int year = new Random().nextInt(40)+70;
            int month = new Random().nextInt(12)+1;
            int day;
            if(month == 2){
                day = new Random().nextInt(28)+1;
            }else {
                day = new Random().nextInt(30)+1;
            }
            Date date = new Date(year,month,day);


//            int year2 = new Random().nextInt(11)+100;
            int year2 = 123;
            int month2 = new Random().nextInt(4)+1;
            int day2;
            int hrs = new Random().nextInt(24)+0;
            int min = new Random().nextInt(60)+0;
            int sec = new Random().nextInt(60)+0;

            if(month2 == 2){
                day2 = new Random().nextInt(28)+1;
            }else {
                day2 = new Random().nextInt(30)+1;
            }
            java.util.Date registrationTime = new java.util.Date(year2,month2,day2,hrs,min,sec);
            member.setBirthday(date);
            member.setRegistrationTime(registrationTime);
            member.setAvatar("src/main/resources/static/images/avatars/OIP.jpeg");
            float height = new Random().nextInt(50)+150;
            member.setHeight(height);
            float weight = new Random().nextInt(50)+45;
            member.setWeight(weight);
            member.setAddress("湖南省湘潭市雨湖区湖南科技大学一区3栋101");
            System.out.println(member);
            memberList.add(member);
        }
        memberRepository.saveAll(memberList);
    }
    //创建一个测试方法，用来传建会员卡并把会员卡id传给会员
    @Test
    public void createMemberCardAndAddMemberCardIdInToMember(){
        //被member表中的所有会员都注册一张会员卡，memberCard中的member_card_design_id范围为1-14,对应了14种会员卡设计
        for(int i = 1;i < 100 ;i++){
            MemberCard memberCard = new MemberCard();
            memberCard.setMemberCardDesignId(new Random().nextInt(14)+1);
            //通过会员卡设计id，查询会员卡设计表，得到会员卡设计的详细信息
            MemberCardDesign memberCardDesign = memberCardDesignRepository.findById(memberCard.getMemberCardDesignId()).get();

            memberCard.setMemberId(i);
            //把会员卡余额设置为0
            memberCard.setBalance(BigDecimal.valueOf(0));
            //把会员卡累积充值金额设置为0
            memberCard.setCumulativeRecharge(BigDecimal.valueOf(0));
            //把会员卡设计的价格传给会员卡，会员卡的累积续费金额
            memberCard.setCumulativeRenewals(memberCardDesign.getPrice());

            memberCard.setNumberOfCheckIns(0);//累计健身打卡次数
            memberCard.setMemberPoints(0);//会员积分

            java.util.Date dateOfApplication = new java.util.Date();
            memberCard.setDateOfApplication(dateOfApplication);
            java.util.Date expirationDate = null;
            if(memberCardDesign.getDurationUnit().equals("年")){
                expirationDate = DateUtil.getNextYear(dateOfApplication,memberCardDesign.getDuration());
            } else if (memberCardDesign.getDurationUnit().equals("月")) {
                expirationDate = DateUtil.getNextMonth(dateOfApplication,memberCardDesign.getDuration());
            } else if (memberCardDesign.getDurationUnit().equals("日")) {
                expirationDate = DateUtil.getNextDay(dateOfApplication,memberCardDesign.getDuration());
            }
            memberCard.setExpirationDate(expirationDate);
            MemberCard memberCard1 = memberCardService.saveAndFlush(memberCard);
            Optional<Member> memberOptional = memberRepository.findById(i);
            if(memberOptional.isPresent()){
                Member member = memberOptional.get();

                //把新办会员卡的id存入会员表
                member.setMemberCardId(memberCard1.getId());
                memberRepository.saveAndFlush(member);
                //创建订单
                Orders orders = new Orders();
                orders.setDate(new java.util.Date());
                orders.setMemberId(member.getId());
                orders.setItem("会员卡购买");
                orders.setItemId(memberCardDesign.getId());
                orders.setPrice(memberCardDesign.getPrice());
                orders.setRemark("会员卡购买");
                orderService.saveAndFlush(orders);
            }
        }
    }


}
