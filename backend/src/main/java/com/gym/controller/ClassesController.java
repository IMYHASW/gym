package com.gym.controller;

import com.gym.entity.Classes;
import com.gym.service.ClassesService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * @Title: ClassesController
 * @Author: Wu Jialing
 * @Package: com.gym.controller
 * @Date: 2023/4/1 下午4:04
 * @description: 课程controller
 */
@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/classes")
@Slf4j
public class ClassesController {

    @Autowired
    ClassesService classesService;
    @PostMapping("/add")
    public ResponseEntity<?> addClasses( Classes classes){
        log.info(classes.toString());
        classes.setSelectedMembersNumber(0);
        Classes classes1 = classesService.save(classes);
        if(classes1 == null){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("添加课程失败");
        }
        return ResponseEntity.ok().body("成功添加课程: "+classes.getClassName()+" !");
    }

    @GetMapping("/list")
    public Page<Classes> classesList(@RequestParam(defaultValue = "0")int offset,
                               @RequestParam(defaultValue = "10")int limit,
                               @RequestParam(defaultValue = "id,asc")String[] sort){
        Pageable pageable = null;
        if(sort[1].equals("asc") || sort.equals("ASC")){
            pageable = PageRequest.of(offset,limit, Sort.by(sort[0]).ascending());
        } else if (sort[1].equals("desc")||sort.equals("DESC")) {
            pageable = PageRequest.of(offset,limit,Sort.by(sort[0]).descending());
        }
        return classesService.findAll(pageable);
    }

    @GetMapping("/findClassesById/{id}")
    public ResponseEntity<?> findClassesById(@PathVariable("id") Integer id){
        Classes classes = classesService.findClassesById(id);
        if(classes == null){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("查询失败!");
        }
        return ResponseEntity.ok().body(classes);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateClasses(Classes classes){
        Classes classes1 = classesService.saveAndFlush(classes);
        if(classes1 == null){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("更新失败!");
        }
        return ResponseEntity.ok().body(classes1);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteClasses(@PathVariable("id") Integer id){
        classesService.deleteClassesById(id);
        return ResponseEntity.ok().body("删除成功!");
    }
    @PutMapping("/buyClasses")
    public ResponseEntity<?> buyCourse(@RequestParam("classesId") Integer classesId,
                                       @RequestParam("memberId")Integer memberId){
        Classes classes = classesService.findClassesById(classesId);
        if(classes == null){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("课堂不存在!");
        }
        if(classes.getSelectedMembersNumber() >= classes.getMaxMembersNumber()){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("课堂人数已满!");
        }
        classes.setSelectedMembersNumber(classes.getSelectedMembersNumber()+1);
        if(classes.getMemberIds() == null){
            classes.setMemberIds(memberId.toString());
        }else{
            classes.setMemberIds(classes.getMemberIds()+","+memberId);
        }

        Classes classes1 = classesService.saveAndFlush(classes);
        if(classes1 == null){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("购买失败!");
        }
        return ResponseEntity.ok().body("购买成功!");
    }

}
