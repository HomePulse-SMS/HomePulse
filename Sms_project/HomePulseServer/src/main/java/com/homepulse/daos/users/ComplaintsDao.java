package com.homepulse.daos.users;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.homepulse.entities.userEmpSecretory.Complaints;
import com.homepulse.entities.userEmpSecretory.Users;

@Repository
public interface ComplaintsDao extends JpaRepository<Complaints, Integer>{
	
    List<Complaints> findByUser(Users user);

    List<Complaints> findByUserId(Long userId);
    
    @Query("SELECT c FROM Complaints c LEFT JOIN FETCH c.user LEFT JOIN FETCH c.repliedBy")
    List<Complaints> findAllWithUsers();

    @Query("SELECT c FROM Complaints c LEFT JOIN FETCH c.user LEFT JOIN FETCH c.repliedBy WHERE c.id = :id")
    Optional<Complaints> findByIdWithUsers(@Param("id") Integer id);


    List<Complaints> findByStatus(String status);

}
