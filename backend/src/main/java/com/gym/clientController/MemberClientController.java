package com.gym.clientController;

import com.gym.entity.Member;
import com.gym.entity.MemberCard;
import com.gym.service.MemberCardService;
import com.gym.service.MemberService;
import com.gym.utils.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.DigestUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.sql.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

/**
 * @Title: MemberController
 * @Author: Wu Jialing
 * @Package: com.gym.controller
 * @Date: 2023/3/14 下午2:52
 * @description:会员controller
 */
@CrossOrigin("*")
@RestController
@RequestMapping("api/v2/member")
@Slf4j
public class MemberClientController {

    @Autowired
    MemberService memberService;
    @Autowired
    MemberCardService memberCardService;

    @PostMapping("/add")
    public ResponseEntity<?> registerMember(@RequestParam("username") String username,
                                            @RequestParam("phoneNumber") String phoneNumber,
                                            @RequestParam("password") String password,
                                            @RequestParam(value = "gender", required = false) String gender,
                                            @RequestParam(value = "birthday", required = false) Date birthday,
                                            @RequestParam(value = "address", required = false) String address,
                                            @RequestParam(value = "avatar", required = false) MultipartFile avatar,
                                            @RequestParam(value = "height", required = false) Float height,
                                            @RequestParam(value = "weight", required = false) Float weight) {
        if (memberService.existsMemberByPhoneNumber(phoneNumber)) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("该手机号已被注册");
        } else {
            Member member = new Member();
            if (!(ObjectUtils.isEmpty(avatar) || avatar.getSize() <= 0)) {
                System.out.println(111111);
                try {
                    String fileName = UUID.randomUUID().toString() +
                            StringUtils.cleanPath(avatar.getOriginalFilename());
                    String avatarPath = "src/main/resources/static/images/avatars/" + fileName;
                    File file = new File(avatarPath);
                    FileUtils.writeByteArrayToFile(file, avatar.getBytes());
                    member.setAvatar(avatarPath);
                } catch (Exception e) {
                    log.error(e.toString());
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("上传头像失败");
                }
            }
            member.setUsername(username);
            member.setPhoneNumber(phoneNumber);
            String password2 = DigestUtils.md5DigestAsHex((password+phoneNumber).getBytes());
            member.setPassword(password2);
            if (!(gender == null || gender.equals(""))) {
                member.setGender(gender);
            }
            if (!(birthday == null || birthday.equals(""))) {
                member.setBirthday(birthday);
            }
            if (!(address == null || address.equals(""))) {
                member.setAddress(address);
            }
            if (!(height == null || height.equals(""))) {
                member.setHeight(height);
            }
            if (!(weight == null || weight.equals(""))) {
                member.setWeight(weight);
            }
            log.info("member : " + member);
            memberService.addMember(member);
            return ResponseEntity.ok().body(member.getUsername());
        }
    }
    @PostMapping("/information")
    public ResponseEntity<?> memberInformation(@RequestParam("account") String account) {
        Member member = memberService.findMemberByPhoneNumber(account);
        return ResponseEntity.ok().body(member);
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam("account") String account,
                                     @RequestParam("password") String password) {
        try {
            // 用户登录校验
            if (memberService.existsMemberByPhoneNumber(account)) {
                Member loginMember = memberService.findMemberByPhoneNumber(account);
                String password2 = DigestUtils.md5DigestAsHex((password+account).getBytes());

                if (password2.equals(loginMember.getPassword())) {
                    String token = JwtUtil.sign(account);
                    Map<String, String> resultBody = new HashMap<>();
                    resultBody.put("token", token);
                    return ResponseEntity.ok().body(resultBody);
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("用户名或密码不存在");
                }
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("用户名或密码不存在");
            }
        } catch (Exception exception) {
            // 如果出现异常记录错误信息
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exception.getMessage());
        }
    }

    @GetMapping("/findMemberCardById/{id}")
    public ResponseEntity<?> findMemberCardById(@PathVariable Integer id){
        Optional<MemberCard> memberCardOptional = memberCardService.findById(id);
        MemberCard memberCard = null;
        if (memberCardOptional.isPresent()){
            memberCard = memberCardOptional.get();
        }
        return ResponseEntity.ok(memberCard);
    }

}

