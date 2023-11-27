package com.gym.service;

import com.gym.entity.ClassTime;
import com.gym.repository.ClassTimeRepository;
import com.gym.vo.ClassesByDateVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassTimeService {
    @Autowired
    private ClassTimeRepository classTimeRepository;

    public List<ClassesByDateVo> findClassesByDate(String day){
        return classTimeRepository.findClassesByDate(day);
    }

    public ClassTime addClassTime(ClassTime classTime) {
        return classTimeRepository.saveAndFlush(classTime);
    }

    public List<ClassTime> getClassTimesByClassId(Integer classId) {
        return classTimeRepository.findAllByClassIdOrderByStartDesc(classId);
    }
}
