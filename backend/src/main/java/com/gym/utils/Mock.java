package com.gym.utils;

import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

public class Mock {

    public static Random r = new Random();

    public static final String[] department = {"研发部", "生产部", "财务部", "人事部", "计划部", "营销部", "安全部", "监察部", "后勤部", "保卫部"};

    public static String randomDepartment() {
        return department[r.nextInt(department.length)];
    }

    public static final String[] role = {"研发部长", "生产部长", "财务部长", "人事部长", "计划部长", "营销部长", "安全部长", "监察部长", "后勤部长", "保卫部长"};

    public static String randomRole() {
        return role[r.nextInt(role.length)];
    }

    public static int randomInt() {
        return r.nextInt(100) + 1;
    }

    public static final String[] address = {"学院路588号", "江苏路603号", "文化路561号", "劳动路284号", "祝秦路512号", "宋城路763号", "宝庆中路125号", "天山南路833号", "星火路752号", "天山西路144号"};

    public static String randomAddress() {
        return address[r.nextInt(address.length)];
    }


    public static String[] firstname = {"赵", "钱", "孙", "李", "周", "吴", "郑", "王", "冯", "陈"};

    public static String[] lastname = {"一", "二", "三", "四", "五", "六", "七", "八", "九", "十"};

    public static String randomFirstName() {
        return firstname[r.nextInt(firstname.length)];
    }

    public static String randomLastName() {
        return lastname[r.nextInt(lastname.length)];
    }

    public static String randomName() {
        return firstname[r.nextInt(firstname.length)] + lastname[r.nextInt(lastname.length)];
    }

    public static String[] emailId = {"guangjia@mail.com", "guanfawe@mail.com", "egfaerg@mail.com", "agvseg@mail.com", "agaerar@mail.com", "vdfbsb@mail.com", "gsfdb@mail.com", "ggbng@mail.com", "gugsea@mail.com"};

    public static String randomEmailId() {
        return emailId[r.nextInt(emailId.length)];
    }

    public static String[] phone = {"18204057394", "18081743869", "13556953378", "15673397046", "18991013143", "18965252026", "17535896457", "17801907106", "18564109403", "18322374862"};

    public static String randomPhone() {
        return phone[r.nextInt(phone.length)];
    }

    public static String[] product = {"西瓜", "牛奶", "大楼", "软件", "黄金", "白银", "钻石", "硬件", "软件", "跑路"};

    public static String randomProduct() {
        return product[r.nextInt(product.length)];
    }

    public static String[] gender = {"男", "女"};

    public static String randomGender() {
        return gender[r.nextInt(gender.length)];
    }

    public static String[] evaluation = {"肌肉体格发达", "得过健美比赛名次", "能深蹲两倍体重", "有IFBB国际私人教练证书", "有中国健美协会专业健身教练认证", "体育学院毕业", "认真负责"};//教练评价

    public static String randomEvaluation() {
        return evaluation[r.nextInt(evaluation.length)];
    }

    public static String[] equipment = {"跑步机", "动感单车", "单双杠", "哑铃", "瑜伽球", "健身踏板", "踏步机"};

    public static String randomEquipmentName() {
        return equipment[r.nextInt(equipment.length)];
    }

    public static String[] equipmentModel = {"SJ-027C", "SJ-022A", "SJ-036B", "SJ-072D", "SJJG-1048T", "SJJG-1011T", "SJJG-1324T"};

    public static String randomEquipmentModel() {
        return equipmentModel[r.nextInt(equipmentModel.length)];
    }

    public static String[] equipmentBrand = {"宝德龙", "迈宝赫", "舒华", "澳瑞特", "力健"};

    public static String randomEquipmentBrand() {
        return equipmentBrand[r.nextInt(equipmentBrand.length)];
    }
    //设备维护信息
    public static String[] maintenanceInformation = {"设备正常", "设备故障", "设备维修中", "设备已报废"};
    //随机生成设备维护信息
    public static String randomMaintenanceInformation() {
        return maintenanceInformation[r.nextInt(maintenanceInformation.length)];
    }
    //BigDecimal类型花费金额 100.00-1000.00
    public static BigDecimal randomCost() {
        return new BigDecimal(r.nextInt(9000) + 1000).divide(new BigDecimal(100));
    }



    public static String[] classesName = {"腹肌塑造","搏击课"};
    public static String[] classesType = {"私教","公共课"};
    public static String[] classTag = {"减脂","塑形","增肌"};
    public static String[] difficulty = {"入门","中阶","高阶"};
    public static String[] classesDescription = {"全方位激活腹部，助力唤醒沉睡的腹肌，让你松弛的腰腹快速紧实起来！","它将最热门的拳击、空手道、泰拳和传统武术糅合在一起，从拳击舞台到八角战笼，一起与脂肪奋战到底吧！"};
    public static String[] classesFee = {};


    public Date randomDate() throws ParseException {

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        Date endTime = simpleDateFormat.parse("1995-01-01 00:00:00");
        long endSeconds = endTime.getTime();

        Date startTime = simpleDateFormat.parse("2005-12-31 00:00:00");
        long startSeconds = startTime.getTime();

        long apartSeconds = endSeconds - startSeconds;
        long timeSeconds = (long) (apartSeconds * Math.random());
        long realSeconds = startSeconds + timeSeconds;
        String realTime = simpleDateFormat.format(realSeconds);
        Date date = simpleDateFormat.parse(realTime);

        return date;

    }

    public Date randomDateTime() throws ParseException {
        Random random = new Random();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date startTime = sdf.parse("2018-6-21");
        Date endTime = sdf.parse("2022-6-21");

        long duration = endTime.getTime() - startTime.getTime();
        Date randomDateTime = new Date((long) (startTime.getTime() + random.nextFloat() * duration));
        return randomDateTime;
    }

    public static String[] equipmentStatus = {"正常", "故障"};

    public static String randomEquipmentStatus() {
        return equipmentStatus[r.nextInt(equipmentStatus.length)];
    }

}
