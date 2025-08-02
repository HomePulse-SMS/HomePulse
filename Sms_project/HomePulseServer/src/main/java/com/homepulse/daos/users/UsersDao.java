package com.homepulse.daos.users;

import com.homepulse.entities.userEmpSecretory.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UsersDao extends JpaRepository<Users, Integer> {
    
    Users findByEmailAndPassword(String email, String password);

	Users findByEmail(String email);

}
