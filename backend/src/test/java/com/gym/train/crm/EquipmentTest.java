package com.gym.train.crm;

import com.gym.entity.Equipment;
import com.gym.entity.MaintenanceRecord;
import com.gym.repository.MaintenanceRecordRepository;
import com.gym.service.EquipmentService;
import com.gym.utils.Mock;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@SpringBootTest
public class EquipmentTest {

    @Autowired
    EquipmentService equipmentService;

    @Autowired
    MaintenanceRecordRepository maintenanceRecordRepository;

    private Mock mock(){
        return new Mock();
    }

    @Test
    void generate() throws ParseException {
        List<Equipment> equipmentList = new ArrayList<>();
        for (int i = 0; i < 20; i++) {
            List<MaintenanceRecord> maintenanceRecordList = new ArrayList<>();
            Equipment e = new Equipment();
            e.setEquipmentStatus(mock().randomEquipmentStatus());
            e.setBrand(mock().randomEquipmentBrand());
            e.setName(mock().randomEquipmentName());

            e.setModel(mock().randomEquipmentModel());
            java.sql.Date sqlDate = new java.sql.Date(mock().randomDate().getTime());
            e.setPurchaseTime(sqlDate);
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(sqlDate);
            calendar.add(Calendar.YEAR, 3);
            sqlDate = new java.sql.Date(calendar.getTime().getTime());
            e.setWarrantyPeriod(sqlDate);
            e.setMaintenanceRecords(maintenanceRecordList);
            if(e.getEquipmentStatus().equals("故障")){
                e.setFaultInformation("设备损坏不能使用");
            }
            for (int j = 0; j < 3; j++) {
                MaintenanceRecord maintenanceRecord = new MaintenanceRecord();
                java.sql.Date sqlDates = new java.sql.Date(mock().randomDate().getTime());
                maintenanceRecord.setMaintenanceDate(sqlDates);
                maintenanceRecord.setMaintenanceInformation(mock().randomMaintenanceInformation());
                maintenanceRecord.setTotalCost(mock().randomCost());
                maintenanceRecordList.add(maintenanceRecord);
            }

            equipmentList.add(e);
        }
        equipmentService.saveAll(equipmentList);
    }

}
