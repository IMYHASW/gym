package com.gym.vo;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class EquipmentVO {

    public String name;
    public String brand;
    public String equipmentStatus;
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    public Date purchaseTime;

}
