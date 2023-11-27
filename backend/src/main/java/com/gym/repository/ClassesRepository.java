package com.gym.repository;

import com.gym.entity.Classes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

/**
 * @Title: ClassesRepository
 * @Author: Wu Jialing
 * @Package: com.gym.repository
 * @Date: 2023/3/30 上午10:26
 * @description:
 */
@Repository
public interface ClassesRepository extends JpaRepository<Classes,Integer>, JpaSpecificationExecutor<Classes> {
}
