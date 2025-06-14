package com.homepulse.daos.admin;

import com.homepulse.entities.admin.Society;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SocietyDao extends JpaRepository<Society, Integer> {
}
