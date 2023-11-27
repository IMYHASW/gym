package com.gym.service;

import com.gym.entity.Admin;
import com.gym.repository.AdminRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class AdminService {

    @Resource
    private AdminRepository adminRepository;

    public String getPasswordByUsername(String username){
        return adminRepository.getPasswordByUsername(username);
    }
    public Admin getAdminByAdminUsername(String username){
        return adminRepository.getAdminByAdminUsername(username);
    }

    public Admin addAdmin(Admin admin){
        return adminRepository.saveAndFlush(admin);
    }
    public boolean existsAdminByUsername(String username){
        return adminRepository.existsAdminByAdminUsername(username);
    }
    public boolean existsAdminByPhone(String phone){
        return adminRepository.existsAdminByAdminPhone(phone);
    }
    public int updatePasswordByUsername(String username,String newPassword){
        return adminRepository.updatePasswordByUsername(username,newPassword);
    }
    public void updateMessage(Admin admin){
        adminRepository.save(admin);
    }

}
