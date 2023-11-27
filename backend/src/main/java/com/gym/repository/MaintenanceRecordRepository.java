package com.gym.repository;

import com.gym.entity.Equipment;
import com.gym.entity.MaintenanceRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface MaintenanceRecordRepository extends JpaRepository<MaintenanceRecord, Integer>, JpaSpecificationExecutor<MaintenanceRecord> {

}
