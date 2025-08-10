package com.homepulse.daos.admin;

import com.homepulse.entities.admin.Location;
import com.homepulse.entities.userEmpSecretory.Notice;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationDao extends JpaRepository<Location, Integer> {
	
	@Query("SELECT n FROM Notice n JOIN FETCH n.society s JOIN FETCH s.location WHERE n.id = :id")
	Notice findByIdWithSocietyAndLocation(@Param("id") Long id);

}
