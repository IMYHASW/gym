package com.gym.controller;

import com.gym.entity.Coach;
import com.gym.entity.Equipment;
import com.gym.service.CoachService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/coach")
public class CoachController {

    @Autowired
    CoachService coachService;

    @PostMapping
    public Coach createCoach(@RequestBody Coach coach){
        return coachService.createCoach(coach);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteCoach(@PathVariable int id){
        coachService.deleteCoach(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("{id}")
    public ResponseEntity<Coach> updateCoach(@PathVariable int id,@RequestBody Coach coachDetails){
        Coach updateCoach = coachService.updateCoach(id,coachDetails);
        return ResponseEntity.ok(updateCoach);
    }

    @GetMapping("all")
    public List<Coach> getAll(){
        return coachService.getAll();
    }

    @GetMapping("getById")
    public Coach getById(@RequestParam int id){
        return coachService.getById(id);
    }

}
