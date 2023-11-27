package com.gym.controller;

import com.gym.entity.ClassTime;
import com.gym.service.ClassTimeService;
import com.gym.vo.ClassesByDateVo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/v1/classTime")
@Slf4j
public class ClassTimeController {

    @Autowired
    ClassTimeService classTimeService;

    @PostMapping("/findClassesByDate")
    public ResponseEntity<?>  classesByDateList(@RequestParam("day") String day) {

        List<ClassesByDateVo> classesByDateVoList = classTimeService.findClassesByDate(day);
        return ResponseEntity.ok().body(classesByDateVoList);
    }
    @PostMapping("/add")
    public ResponseEntity<?> addClassTime(@RequestParam("classId") Integer classId,
                                          @RequestParam("start")@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date start,
                                          @RequestParam("end")@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date end){
        ClassTime classTime = new ClassTime();
        classTime.setClassId(classId);
        classTime.setStart(start);
        classTime.setEnd(end);
        ClassTime classTime1 = classTimeService.addClassTime(classTime);
        if (classTime1 == null) {
            return ResponseEntity.badRequest().body("添加失败");
        }
        return ResponseEntity.ok().body("添加成功");
    }
    @GetMapping("/getClassTimesByClassId/{classId}")
    public ResponseEntity<?> getClassTimesByClassId(@PathVariable("classId") Integer classId){
        List<ClassTime> classTimeList = classTimeService.getClassTimesByClassId(classId);
        return ResponseEntity.ok().body(classTimeList);
    }

}
