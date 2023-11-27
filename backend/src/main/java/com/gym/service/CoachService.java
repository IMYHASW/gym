package com.gym.service;

import com.gym.common.exception.ResourceNotFoundException;
import com.gym.entity.Coach;
import com.gym.repository.CoachRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CoachService {

    @Autowired
    CoachRepository coachRepository;

    public void saveAll(List<Coach> coachList) {
        coachRepository.saveAll(coachList);
    }

    //create
    public Coach createCoach(Coach coach){
        return coachRepository.save(coach);
    }

    //delete
    public void deleteCoach(int id){
        Coach coach = coachRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Coach not exist with id" + id));
        coachRepository.delete(coach);
    }

    //update
    public Coach updateCoach(int id, Coach coachDetails){
        Coach updateCoach = coachRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Coach not exist with id" + id));
        updateCoach.setGender(coachDetails.getGender());
        updateCoach.setBirth(coachDetails.getBirth());
        updateCoach.setEntryDate(coachDetails.getEntryDate());
        updateCoach.setEvaluation(coachDetails.getEvaluation());
        updateCoach.setUsername(coachDetails.getUsername());
        updateCoach.setWorkingYears(coachDetails.getWorkingYears());
        coachRepository.save(updateCoach);
        return updateCoach;
    }

    //getAll
    public List<Coach>  getAll(){
        return coachRepository.findAll();
    }

    //getById
    public Coach getById(int id){
        return coachRepository.findById(id).get();
    }


}
