package com.gym.repository;

import com.gym.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

/**
 * @Title: OrderRepository
 * @Author: Wu Jialing
 * @Package: com.gym.repository
 * @Date: 2023/4/2 下午2:13
 * @description:
 */
@Repository
public interface OrderRepository extends JpaRepository<Orders,Integer>, JpaSpecificationExecutor<Orders> {

}
