package com.gym.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;

/**
 * @Title: Equipment
 * @Author: Wu Jialing
 * @Package: com.example.model
 * @Date: 2023/3/10 上午10:56
 * @description: 健身设备表（Equipment）：包含健身设备的名称、型号、品牌、购买时间、保修期限等基本信息，以及设备状态、故障信息、维护记录等维护信息
 * Fitness equipment name, model, brand, purchase time, warranty period, equipment status, fault information, maintenance records
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "equipment")
public class Equipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    private String name;
    private String model;//型号
    private String brand;//品牌
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date purchaseTime;//购买时间
    private Date warrantyPeriod;//保修期限
    private String equipmentStatus;//设备状态
    private String faultInformation;//故障信息

    @OneToMany(cascade = {CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH},fetch = FetchType.EAGER)
    @JoinColumn(name = "equipment_id")
    private List<MaintenanceRecord> maintenanceRecords;

}
