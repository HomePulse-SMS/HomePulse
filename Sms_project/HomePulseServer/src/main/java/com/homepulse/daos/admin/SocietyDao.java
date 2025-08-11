package com.homepulse.daos.admin;

import com.homepulse.entities.admin.Location;
import com.homepulse.entities.admin.Society;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SocietyDao extends JpaRepository<Society, Integer> {

    List<Society> findByLocation_Id(int locationId);

    @Query("SELECT DISTINCT s FROM Society s LEFT JOIN FETCH s.location LEFT JOIN FETCH s.usersList")
    List<Society> findAll();
}
