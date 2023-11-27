package com.gym.controller;

import com.gym.entity.Member;
import com.gym.service.MemberCardService;
import com.gym.service.MemberService;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.DigestUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.security.SecureRandom;

/**
 * @Title: MemberController
 * @Author: Wu Jialing
 * @Package: com.gym.controller
 * @Date: 2023/3/14 下午2:52
 * @description:会员controller
 */
@CrossOrigin("*")
@RestController
@RequestMapping("api/v1/member")
@Slf4j
public class MemberController {

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
            String password2 = DigestUtils.md5DigestAsHex((password + phoneNumber).getBytes());
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
            member.setRegistrationTime(new java.util.Date());
            log.info("member : " + member);
            memberService.addMember(member);
            return ResponseEntity.ok().body(member.getUsername());
        }
    }

    @GetMapping("/list")
    public Page<Member> memberList(@RequestParam(defaultValue = "0") int page,
                                   @RequestParam(defaultValue = "10") int size,
                                   @RequestParam(defaultValue = "id") String sortBy,
                                   @RequestParam(defaultValue = "asc") String sortWay,
                                   @RequestParam(required = false) String username,
                                   @RequestParam(required = false) Integer memberCardId,
                                   @RequestParam(required = false) String phoneNumber,
                                   @RequestParam(required = false) String gender,
                                   @RequestParam(required = false) Date birthday,
                                   @RequestParam(required = false) Float height,
                                   @RequestParam(required = false) Float weight,
                                   @RequestParam(required = false) String address,
                                   @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") java.util.Date registrationTime) {
        Pageable pageable = null;
        if (sortWay.equals("asc") || sortWay.equals("ASC")) {
            pageable = PageRequest.of(page, size, Sort.by(sortBy).ascending());
        } else if (sortWay.equals("desc") || sortWay.equals("DESC")) {
            pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        }
        return memberService.findAll(username,memberCardId, phoneNumber, gender, birthday, height, weight, address, registrationTime, pageable);
    }

    @GetMapping("/getById")
    public ResponseEntity<?> getMemberById(@RequestParam Integer id) {
        Optional<Member> memberOptional = memberService.findById(id);
        if (!memberOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("会员id不存在");
        } else {
            return ResponseEntity.ok(memberOptional.get());
        }
    }
    @GetMapping("/getIdByPhoneNumber/{phoneNumber}")
    public ResponseEntity<?> getIdByPhoneNumber(@PathVariable String phoneNumber){
        Integer id = memberService.findIdByPhoneNumber(phoneNumber);
        if (id == null){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("该手机号未注册");
        }else {
            return ResponseEntity.ok(id);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateMember(@RequestBody Member member) {
        String phone = memberService.findPhoneNumberById(member.getId());
        if ((!phone.equals(member.getPhoneNumber())) && memberService.existsMemberByPhoneNumber(member.getPhoneNumber())) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("该手机号已被注册，请更换手机号！");
        } else {
            Member member1 = memberService.update(member);
            return ResponseEntity.ok(member1);
        }
    }

    @DeleteMapping("/delete/{id}/{memberCardId}")
    public ResponseEntity<?> deleteMemberAndMemberCardById(@PathVariable Integer id,@PathVariable Integer memberCardId){
        memberService.deleteMemberById(id,memberCardId);
        return ResponseEntity.ok("成功注销用户！");
    }
}

