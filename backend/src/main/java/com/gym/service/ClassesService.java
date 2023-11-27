package com.gym.service;

import com.gym.entity.Classes;
import com.gym.repository.ClassesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * @Title: ClassesService
 * @Author: Wu Jialing
 * @Package: com.gym.service
 * @Date: 2023/4/1 下午4:11
 * @description: 课程service
 */
@Service
public class ClassesService {

    @Autowired
    ClassesRepository classesRepository;

    public Classes save(Classes classes){
        return classesRepository.save(classes);
    }

    public Page<Classes> findAll(Pageable pageable){
        return classesRepository.findAll(pageable);
    }

    public Classes findClassesById(Integer id) {
        return classesRepository.getById(id);
    }

    public Classes saveAndFlush(Classes classes) {
        return classesRepository.saveAndFlush(classes);
    }

    public void deleteClassesById(Integer id) {
        classesRepository.deleteById(id);
    }
}
