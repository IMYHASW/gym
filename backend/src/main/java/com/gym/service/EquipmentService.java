package com.gym.service;

import com.gym.common.exception.ResourceNotFoundException;
import com.gym.entity.Equipment;
import com.gym.repository.EquipmentRepository;
import com.gym.vo.EquipmentSortVO;
import com.gym.vo.EquipmentVO;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.lang.reflect.Field;
import java.util.*;

@Service
public class EquipmentService {

    @Autowired
    EquipmentRepository equipmentRepository;

    public void saveAll(List<Equipment> equipmentList){
        equipmentRepository.saveAll(equipmentList);
    }

    //create
    public Equipment createEquipment(Equipment equipment){
        return equipmentRepository.save(equipment);
    }

    //delete
    public void deleteEquipment(int id){
        Equipment equipment = equipmentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Equipment not exist with id" + id));
        equipmentRepository.delete(equipment);
    }

    //update
    public Equipment updateEquipment(int id, Equipment equipmentDetails){
        Equipment updateEquipment = equipmentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Equipment not exist with id" + id));
        updateEquipment.setName(equipmentDetails.getName());
        updateEquipment.setEquipmentStatus(equipmentDetails.getEquipmentStatus());
        updateEquipment.setMaintenanceRecords(equipmentDetails.getMaintenanceRecords());
        updateEquipment.setModel(equipmentDetails.getModel());
        updateEquipment.setBrand(equipmentDetails.getBrand());
        updateEquipment.setPurchaseTime(equipmentDetails.getPurchaseTime());
        updateEquipment.setFaultInformation(equipmentDetails.getFaultInformation());
        updateEquipment.setWarrantyPeriod(equipmentDetails.getWarrantyPeriod());

        equipmentRepository.save(updateEquipment);
        return updateEquipment;
    }

    //getAll
    public List<Equipment>  getAll(){
        return equipmentRepository.findAll();
    }

    //getById
    public Equipment getById(int id){
        return equipmentRepository.findById(id).get();
    }

    //search
    public Map<String,Object> search(EquipmentVO equipmentVO, EquipmentSortVO equipmentSortVO, int pageIndex, int pageSize){

        Specification<Equipment> specification = new Specification<Equipment>() {
            @SneakyThrows
            @Override
            public Predicate toPredicate(Root root, CriteriaQuery criteriaQuery, CriteriaBuilder criteriaBuilder) {

                List<Predicate> predicates = new ArrayList<>();
                Field[] equipmentSearchVoFields = equipmentVO ==null?new Field[0]: equipmentVO.getClass().getDeclaredFields();
                Field[] equipmentSorterVoFields = equipmentSortVO==null?new Field[0]:equipmentSortVO.getClass().getDeclaredFields();

                //search input
                for(Field field:equipmentSearchVoFields){
                    String filedName = field.getName();
                    Object fieldValue = field.get(equipmentVO);
                    if(fieldValue!=null){
                        //字符串模糊匹配
                        if(fieldValue instanceof String)
                            predicates.add(criteriaBuilder.like(root.get(filedName).as(String.class),"%"+fieldValue+"%"));
                        //数字类精确匹配
                        if(fieldValue instanceof Integer||fieldValue instanceof Long|| fieldValue instanceof Float){
                            predicates.add(criteriaBuilder.equal(root.get(filedName).as(fieldValue.getClass()),fieldValue));
                        }
                        //日期类查询一天范围
                        if(fieldValue instanceof Date){
                            Date endDate = new Date(((Date) fieldValue).getTime()+1000*60*60*24);
                            predicates.add(criteriaBuilder.between(root.get(filedName).as(Date.class),(Date)fieldValue,endDate));
                        }
                    }
                }
                //serch sort
                for(Field field:equipmentSorterVoFields){
                    String filedName = field.getName();
                    Integer fieldValue = (Integer) field.get(equipmentSortVO);
                    if(fieldValue==null) continue;
                    if(fieldValue==1){
                        criteriaQuery.orderBy(criteriaBuilder.asc(root.get(filedName)));
                        break;
                    }else if(fieldValue==2){
                        criteriaQuery.orderBy(criteriaBuilder.desc(root.get(filedName)));
                        break;
                    }
                }
                criteriaQuery.where(predicates.toArray(new Predicate[predicates.size()]));
                return criteriaQuery.getRestriction();
            }
        };
        Pageable pageable = PageRequest.of(pageIndex,pageSize);
        Map<String,Object> resultMap = new HashMap<>();
        Long totalcount = equipmentRepository.count(specification);
        List<Equipment> datas = equipmentRepository.findAll(specification,pageable).getContent();
        resultMap.put("data",datas);
        resultMap.put("totalcount",totalcount);
        return resultMap;
    }

}
