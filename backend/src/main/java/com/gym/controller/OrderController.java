package com.gym.controller;

import com.gym.entity.Orders;
import com.gym.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

/**
 * @Title: OrderController
 * @Author: Wu Jialing
 * @Package: com.gym.controller
 * @Date: 2023/4/2 下午8:23
 * @description: 订单controller
 */
@CrossOrigin("*")
@RestController
@RequestMapping("api/v1/order")
public class OrderController {
    @Autowired
    OrderService orderService;

    @GetMapping("/all")
    public Page<Orders> list(@RequestParam(defaultValue = "0")int offset,
                             @RequestParam(defaultValue = "10")int limit,
                             @RequestParam(defaultValue = "id")String sortBy,
                             @RequestParam(defaultValue = "asc")String sortWay){
        Pageable pageable = null;
        if(sortWay.equals("asc")||sortWay.equals("ASC")){
            pageable = PageRequest.of(offset,limit, Sort.by(sortBy).ascending());
        } else if (sortWay.equals("desc")||sortWay.equals("DESC")) {
            pageable = PageRequest.of(offset,limit,Sort.by(sortBy).descending());
        }
        return orderService.ordersPage(pageable);
    }
}
