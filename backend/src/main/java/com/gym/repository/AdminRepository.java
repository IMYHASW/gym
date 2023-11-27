package com.gym.repository;

import com.gym.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;


/**
 * @Mapper和@Repository
相同点：
 @Mapper和@Repository都是作用在dao层接口，使得其生成代理对象bean，交给spring容器管理
 对于mybatis来说，都可以不用写mapper.xml文件
 不同点：
 1、@Mapper不需要配置扫描地址，可以单独使用，如果有多个mapper文件的话，可以在项目启动类中加入@MapperScan(“mapper文件所在包”)
 2、@Repository不可以单独使用，否则会报错误，要想用，必须配置扫描地址（@MapperScannerConfigurer）

 JpaSpecificationExecutor:
 Dao对象其实是注入了一个代理对象，通过继承Repository体系接口完成代理对象SimpleJpaRepository实现类对象的注入。
 而JpaSpecificationExecutor对象不在Repository接口体系内那么就无法完成对象注入，所以要使用
 JpaSpecificationExecutor对象必须要实现Repository体系接口

 */
@Repository//@Repository 是 Spring 的注解，用于声明一个 Bean。
public interface AdminRepository extends JpaRepository<Admin, Integer>, JpaSpecificationExecutor<Admin> {
    //@Query标记在继承了Repository的自定义接口方法上，就不需要遵循查询方法命名规则
    //@Query的native的查询方法要增加nativeQuery = true，默认是false，这样查询的时候就是使用原生的sql语句进行查询数据库的操作。
    @Query(value = "select admin_password from admin where admin_name = ?1",nativeQuery = true)
    public String getPasswordByUsername(String username);

    public Admin getAdminByAdminUsername(String adminUsername);

    public boolean existsAdminByAdminUsername(String adminUsername);

    public boolean existsAdminByAdminPhone(String adminPhone);

    @Transactional
    @Modifying(clearAutomatically = true,flushAutomatically = true)//设置@Modifying(clearAutomatically=true) 会刷新一级缓存，得到最新的数据
    @Query(value = "update admin set admin_password = ?2 where admin_name = ?1",nativeQuery = true)
    public int updatePasswordByUsername(String username,String newPassword);
}
/**
 * 使用时自定义接口继承JpaRepository，传入泛型，第一个参数为要操作的实体类，第二个参数为该实体类的主键类型
 * JpaRepository支持接口规范方法名查询。意思是如果在接口中定义的查询方法符合它的命名规则，就可以不用写实现，目前支持的关键字如下。
        Keyword：关键字
        Sample：举例
        JPQL snippet： sql片段
 Keyword	           Sample	                       JPQL snippet
 And	            findByNameAndPwd	            where name= ? and pwd =?
 Or	                findByNameOrSex	                where name= ? or sex=?
 Is,Equals	        findByNameOrSex	                where id= ?
 Between	        findByIdBetween	                where id between ? and ?
 LessThan	        findByIdLessThan	            where id < ?
 LessThanEquals    	findByIdLessThanEquals	        where id <= ?
 GreaterThanr	    findByIdGreaterThan	            where id > ?
 GreaterThanEquals	findByIdGreaterThanEquals	    where id > = ?
 After	            findByIdAfter	                where id > ?
 Before	            findByIdBefore	                where id < ?
 IsNull	            findByNameIsNull	            where name is null
 isNotNull,NotNull	findByNameNotNull	            where name is not null
 Like	            findByNameLike	                where name like ?
 NotLike	        findByNameNotLike	            where name not like ?
 StartingWith	    findByNameStartingWith	        where name like ‘?%’
 EndingWith	        findByNameEndingWith	        where name like ‘%?’
 Containing	        findByNameContaining	        where name like ‘%?%’
 OrderBy	        findByIdOrderByXDesc	        where id=? order by x desc
 Not	            findByNameNot	                where name <> ?
 In	                findByIdIn(Collection<?> c)	    where id in (?)
 NotIn	            findByIdNotIn(Collection<?> c)	where id not in (?)
 True	            findByAaaTrue	                where aaa = true
 False	            findByAaaFalse	                where aaa = false
 IgnoreCase        	findByAaaTue	                where UPPER(name)=UPPER(?)
 top	            findTop10	                    top 10/where ROWNUM <=10
*/