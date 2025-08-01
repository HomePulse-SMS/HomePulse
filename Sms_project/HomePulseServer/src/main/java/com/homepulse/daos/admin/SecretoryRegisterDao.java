package com.homepulse.daos.admin;

import com.homepulse.entities.admin.SecretoryRegister;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SecretoryRegisterDao extends JpaRepository<SecretoryRegister, Integer> {

}
