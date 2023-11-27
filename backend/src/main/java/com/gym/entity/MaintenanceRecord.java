package com.gym.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Date;

/**
 * @Title: MaintenanceRecord
 * @Author: Wu Jialing
 * @Package: com.example.model
 * @Date: 2023/3/10 上午11:03
 * @description: 设备维护记录
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "maintenance_record")
public class MaintenanceRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
//    private Integer equipmentId;//设备id
    private String maintenanceInformation;//维护信息
    private Date maintenanceDate;//维护日期
    private BigDecimal totalCost;//维修总花费金额

}
