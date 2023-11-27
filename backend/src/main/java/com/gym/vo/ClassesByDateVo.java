package com.gym.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@NoArgsConstructor
//@AllArgsConstructor
public class ClassesByDateVo {

    private Integer id; // ClassTimeIds
    private String className;
    private String classTag;
    private Date start;
    private Date end;
    private Integer classesId;

    public ClassesByDateVo(Object[] objects) {
        this.id = (Integer) objects[0];
        this.className = (String) objects[1];
        this.classTag = (String) objects[2];
        this.start = (Date) objects[3];
        this.end = (Date) objects[4];
        this.classesId = (Integer) objects[5];
    }

    public ClassesByDateVo(Integer id, String className, String classTag, Date start, Date end, Integer classesId) {
        this.id = id;
        this.className = className;
        this.classTag = classTag;
        this.start = start;
        this.end = end;
        this.classesId = classesId;
    }
}
