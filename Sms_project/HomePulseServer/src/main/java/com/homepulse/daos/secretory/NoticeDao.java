package com.homepulse.daos.secretory;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.homepulse.entities.userEmpSecretory.Notice;
import com.homepulse.entities.userEmpSecretory.Users;


@Repository
public interface NoticeDao extends JpaRepository<Notice, Integer>{


}
