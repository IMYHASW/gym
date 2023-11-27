package com.gym.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gym.entity.Equipment;
import com.gym.service.EquipmentService;
import com.gym.vo.EquipmentSortVO;
import com.gym.vo.EquipmentVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/equipment")
public class EquipmentController {

    @Autowired
    EquipmentService equipmentService;

    @PostMapping
    public Equipment createEquipment(@RequestBody Equipment equipment){
        return equipmentService.createEquipment(equipment);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteEquipment(@PathVariable int id){
        equipmentService.deleteEquipment(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("{id}")
    public ResponseEntity<Equipment> updateEquipment(@PathVariable int id,@RequestBody Equipment equipmentDetails){
        Equipment updateEquipment = equipmentService.updateEquipment(id,equipmentDetails);
        return ResponseEntity.ok(updateEquipment);
    }

    @GetMapping("all")
    public List<Equipment> getAll(){
        return equipmentService.getAll();
    }

    @GetMapping("getById")
    public Equipment getById(@RequestParam int id){
        return equipmentService.getById(id);
    }

    @RequestMapping("/search")
    public Map<String,Object> search(@RequestParam(name = "pageIndex") int pageIndex,@RequestParam(name="pageSize",defaultValue = "10") int pageSize,@RequestBody Map<String,Object> filtersMap){
        ObjectMapper objectMapper = new ObjectMapper();
        EquipmentVO equipmentVO = objectMapper.convertValue(filtersMap.get("dataSimpleFilterVo"), EquipmentVO.class);
        EquipmentSortVO equipmentSortVO = objectMapper.convertValue(filtersMap.get("dataSorterVo"),EquipmentSortVO.class);
        return equipmentService.search(equipmentVO,equipmentSortVO,pageIndex,pageSize);
    }

}
