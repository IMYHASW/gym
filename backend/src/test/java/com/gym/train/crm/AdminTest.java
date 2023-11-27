package com.gym.train.crm;

import com.gym.entity.Admin;
import com.gym.service.AdminService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.DigestUtils;

/**
 * @Title: adminText
 * @Author: Wu Jialing
 * @Package: com.gym.train.crm
 * @Date: 2023/3/29 下午2:39
 * @description:
 */
@SpringBootTest
public class AdminTest {
    @Autowired
    AdminService adminService;
    @Test
    void addAdmin(){
        String phone  = "17375541041";

        String admin_name = "123456";
        String gender = "female";
        Admin admin = new Admin();
        admin.setAdminPhone(phone);
        admin.setAdminUsername(admin_name);
        String password = DigestUtils.md5DigestAsHex(("123456" + admin_name).getBytes());
        admin.setAdminPassword(password);
        admin.setAdminGender(gender);
        adminService.addAdmin(admin);
    }
}
