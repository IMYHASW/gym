package com.gym.repository;

import com.gym.entity.ClassTime;
import com.gym.vo.ClassesByDateVo;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Title: ClassTimeRepository
 * @Author: Wu Jialing
 * @Package: com.gym.repository
 * @Date: 2023/3/30 上午10:26
 * @description:
 */
@Repository
public interface ClassTimeRepository extends JpaRepository<ClassTime,Integer>, JpaSpecificationExecutor<ClassTime> {

    @Query(value = "SELECT new com.gym.vo.ClassesByDateVo( t.id,c.className,c.classTag,t.start,t.end,c.id) " +
            "FROM ClassTime t "+
            "inner JOIN Classes c on c.id = t.classId WHERE date_format(t.start,'%Y-%m-%d')= :day " +
            " ORDER BY t.start")
    List<ClassesByDateVo> findClassesByDate(@Param("day") String day);

    List<ClassTime> findAllByClassIdOrderByStartDesc(Integer classId);
}
