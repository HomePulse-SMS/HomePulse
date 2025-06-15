package com.homepulse.repository;

import com.homepulse.entities.admin.Society;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SocietyRepository extends JpaRepository<Society, Integer> {

}
