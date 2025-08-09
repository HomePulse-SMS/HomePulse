package com.homepulse.daos.secretory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.homepulse.entities.userEmpSecretory.Amenity;

@Repository
public interface AmenityDao  extends JpaRepository<Amenity, Integer>{

    boolean existsByName(String name);

}
