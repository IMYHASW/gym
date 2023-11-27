package com.gym.service;

import com.gym.entity.Orders;
import com.gym.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * @Title: OrderService
 * @Author: Wu Jialing
 * @Package: com.gym.service
 * @Date: 2023/4/2 下午2:13
 * @description:
 */
@Service
public class OrderService {
    @Autowired
    OrderRepository orderRepository;

    public Orders save(Orders orders){
        return orderRepository.save(orders);
    }

    public Orders saveAndFlush(Orders orders){
        return orderRepository.saveAndFlush(orders);
    }

    public Page<Orders> ordersPage(Pageable pageable){
        return orderRepository.findAll(pageable);
    }
}
