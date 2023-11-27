package com.gym.controller;

import com.gym.entity.Admin;
import com.gym.service.AdminService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/admin")
@Slf4j
public class AdminController {


    @Resource
    private AdminService adminService;

    @PostMapping(value = "/register")
    public String registerAdmin(@RequestBody Admin admin) {
        System.out.println(admin.toString());
        boolean ifPhoneExists = adminService.existsAdminByPhone(admin.getAdminPhone());
        boolean ifUsernameExists = adminService.existsAdminByUsername(admin.getAdminUsername());

        if (ifPhoneExists) {
            return "手机号已被注册";
        } else if (ifUsernameExists) {
            return "用户名已被占用";
        } else {

            String adminUsername = admin.getAdminUsername();
//                    UUID.randomUUID().toString();
            String password = DigestUtils.md5DigestAsHex((admin.getAdminPassword() + adminUsername).getBytes());
            admin.setAdminPassword(password);
            System.out.println("before注册成功："+admin);
            if (null != adminService.addAdmin(admin)) {
                System.out.println("注册成功："+admin);
                return "Register successfully";
            } else {
                return "fail to register";
            }
            /**      @RequestBody主要用来接收前端传递给后端的json字符串中的数据的(请求体中的数据的)； 而最常用的使用请求体传参的无疑是POST请求了，所以使用@RequestBody接收数据时，一般都用POST方式进行提交。
            在后端的同一个接收方法里，@RequestBody与@RequestParam()可以同时使用，@RequestBody最多只能有一个，而@RequestParam()可以有多个。
            注：一个请求，只有一个RequestBody；一个请求，可以有多个RequestParam。
             */

        }
    }

    @PostMapping(value = "/login")
    public Admin adminLogin(@RequestBody Admin admin) {
        log.debug("----adminLogin" + admin.toString());
        Admin admin1 = null;
        boolean ifUsernameExists = adminService.existsAdminByUsername(admin.getAdminUsername());
        if (ifUsernameExists) {//用户名存在则判断密码是否正确
            String username = admin.getAdminUsername();
            String password = DigestUtils.md5DigestAsHex((admin.getAdminPassword() + username).getBytes());
            String password2 = adminService.getPasswordByUsername(username);
            if (password.equals(password2)) {
                admin1 = adminService.getAdminByAdminUsername(username);
            }
        }
        return admin1;
    }

    @PostMapping(value = "/changepassword")
    public Admin changePassword(@RequestParam(value = "adminUsername") String adminUsername,
                                @RequestParam(value = "adminOldPassword") String adminOldPassword,
                                @RequestParam(value = "adminNewPassword") String adminNewPassword) {
        System.out.println("adminUsername:"+ adminUsername +"  adminOldPassword:" + adminOldPassword+"  adminNewPassword:" + adminNewPassword );
        Admin admin = null;
        boolean ifUsernameExists = adminService.existsAdminByUsername(adminUsername);
        System.out.println("用户名是否正确？:"+ifUsernameExists);
        if (ifUsernameExists) {
            String passwordInDB = adminService.getPasswordByUsername(adminUsername);
            String pass = DigestUtils.md5DigestAsHex((adminOldPassword + adminUsername).getBytes());
            System.out.println("密码是否正确？"+pass.equals(passwordInDB));
            System.out.println("sql密码     ：" + passwordInDB);
            System.out.println("输入的old密码："+pass);
            if (pass.equals(passwordInDB)) {
                String newPassword = DigestUtils.md5DigestAsHex((adminNewPassword + adminUsername).getBytes());
                int count = adminService.updatePasswordByUsername(adminUsername, newPassword);
                System.out.println("count:"+count);
                if (count == 1) {
                    System.out.println("输入的new密码："+newPassword);
                    admin = adminService.getAdminByAdminUsername(adminUsername);
                }
            }
        }
        log.debug("after change password:"+admin);
        return admin;
    }
    @PostMapping(value = "/forgetpassword")
    public Admin forgetPassword(@RequestParam(value = "adminUsername") String adminUsername,
                                @RequestParam(value = "adminNewPassword") String adminNewPassword,
                                @RequestParam(value = "adminPhone") String adminPhone) {
        System.out.println("forgetpassword_adminUsername:"+ adminUsername +"  adminNewPassword:" + adminNewPassword +"  adminPhone:" + adminPhone);
        Admin admin = null;
        boolean ifUsernameExists = adminService.existsAdminByUsername(adminUsername);
        System.out.println("ifUsernameExists:"+ifUsernameExists);
        if (ifUsernameExists) {
           //判断手机号是否正确
            Admin admin1 = adminService.getAdminByAdminUsername(adminUsername);
            String phoneInDB = admin1.getAdminPhone();
            System.out.println("手机号是否正确？"+phoneInDB.equals(adminPhone));
            //判断手机号是否正确
            if (phoneInDB.equals(adminPhone)) {//如果手机号和用户名都正确则允许修改密码，否则拒绝
                String newPassword = DigestUtils.md5DigestAsHex((adminNewPassword + adminUsername).getBytes());
                int count = adminService.updatePasswordByUsername(adminUsername, newPassword);

                System.out.println("count:"+count);
                if (count == 1) {
                    admin = adminService.getAdminByAdminUsername(adminUsername);
                }
            }
        }
        System.out.println("after forget password:"+admin);
        return admin;
    }

    @PostMapping(value = "/changemessage")
    public Admin changeMessage(@RequestParam(value = "adminUsername") String adminUsername,
                                @RequestParam(value = "adminOldPassword") String adminPhone,
                                @RequestParam(value = "adminNewPassword") String adminGender) {
        boolean ifUsernameExists = adminService.existsAdminByUsername(adminUsername);
        if (ifUsernameExists) {
            Admin admin = adminService.getAdminByAdminUsername(adminUsername);
            admin.setAdminGender(adminGender);
            admin.setAdminPhone(adminPhone);
            adminService.updateMessage(admin);
        }
        return adminService.getAdminByAdminUsername(adminUsername);
    }


}

/**
 * 总结：
 * 1、要使用JpaRepository实现增删查改需要进行如下操作：
 * 在pom.xml中添加JPA依赖包：
 * User.java类需要添加@Entity注解，在类的属性上面需要添加@Id或者@Column注解
 * UserRepository.java接口需要实现JpaRepository接口，默认有增删查方法，修改方法可以自己定义
 * 启动类需要添加两个注解，分别是：@EnableJpaRepositories(basePackages="com.etc.*")和@EntityScan(basePackages="com.etc.*")
 * 2、注解的作用：
 *
 * @Entity：表示这是一个实体
 * @Table：指定Entity所要映射的数据库表，指定表名称，如果不指定，就是类名的首字母小写
 * @Id：对应数据库中的ID，主键
 * @Column：对应数据库表中普通属性
 * @GeneratedValue：指定主键的生成策略，根据不同的数据库自动选择
 * @EnableJpaRepositories(basePackages="com.etc.*")：扫描指定的包下的Respository
 * @EntityScan(basePackages="com.etc.*") ：扫描指定包下的实体
 * @ComponentScan(basePackages="com.etc.*")：指定扫描的包，否则只扫描此类所在的包
 * @Modifying：完成修改操作（不包括新增）
 * @Transactional：事务注解，要么全部成功，要么全部失败
 */