package com.gym.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Column;
import java.sql.Date;

/**
 * @Title: AddMemberVo
 * @Author: Wu Jialing
 * @Package: com.gym.vo
 * @Date: 2023/3/23 下午5:52
 * @description:
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddMemberVo {
    private String username;
    private String gender;
    private Date birthday;
    private String phoneNumber;
    private String password;
    private String address;
    private MultipartFile avatar;//头像
    private float height;
    private float weight;

}
