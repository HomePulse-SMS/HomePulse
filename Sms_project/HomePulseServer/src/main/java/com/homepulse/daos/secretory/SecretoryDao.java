package com.homepulse.daos.secretory;

import com.homepulse.entities.VisitorLogs;
import com.homepulse.entities.admin.Society;
import com.homepulse.entities.userEmpSecretory.Users;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SecretoryDao extends JpaRepository<Users, Integer>{

    List<Users> findByRole(String role);

//    @Query("SELECT u FROM Users u JOIN FETCH u.societyId s JOIN FETCH s.location WHERE u.approval = false")
    @Query("SELECT u FROM Users u LEFT JOIN FETCH u.societyId s LEFT JOIN FETCH s.location WHERE u.approval = false")

    List<Users> findByApprovalFalse();

    List<Users> findByApprovalTrue();
    List<Users> findByWing(String wing);

    @Transactional
    @Modifying
    @Query("UPDATE Users u SET u.approval = true WHERE u.id = :id")
    int approveUserById(@Param("id") int id);

    @Modifying
    @Transactional
    @Query("UPDATE Users u SET u.fname = :fname, u.lname = :lname, u.contact = :contact WHERE u.id = :id ")
    int updateProfile(@Param("id") int id, @Param("fname") String fname, @Param("lname") String lname, @Param("contact") String contact);

    @Transactional
    @Modifying
    @Query("UPDATE Users u SET u.approval = false WHERE u.id = :id")
    int disapproveUserById(@Param("id") int id);

    @Transactional
    @Modifying
    @Query("UPDATE Users u SET u.flag = false WHERE u.id = :id")
    int deleteUser(@Param("id") int id);

//    @Query("SELECT(u.fname, u.lname) FROM Users u WHERE u.societyId = :id")
    List<Users> findBySocietyId_Id(@Param("id") int societyId);
    
    
}
