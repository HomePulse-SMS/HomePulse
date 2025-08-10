package com.homepulse.daos.secretory;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.homepulse.entities.userEmpSecretory.AmenityBooking;

@Repository
public interface AmenityBookingDao extends JpaRepository<AmenityBooking, Integer>{

	 @Query("SELECT b FROM AmenityBooking b " +
	           "WHERE b.amenity.id = :amenityId " +
	           "AND b.status <> 'CANCELLED' " +
	           "AND (b.startTime < :endTime AND b.endTime > :startTime)")
	    List<AmenityBooking> findOverlappingBookings(
	        @Param("amenityId") Integer amenityId,
	        @Param("startTime") LocalDateTime startTime,
	        @Param("endTime") LocalDateTime endTime
	    );
	 
	    List<AmenityBooking> findByUserId(Integer userId);

	   

}
