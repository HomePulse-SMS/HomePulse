package com.homepulse.daos.guard;

import com.homepulse.entities.VisitorLogs;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GuardDao extends JpaRepository<VisitorLogs, Integer> {

    List<VisitorLogs> findByExitTimeIsNull();

    @Modifying
    @Transactional
    @Query("UPDATE VisitorLogs v SET v.exitTime = CURRENT_TIMESTAMP, v.updatedTime = CURRENT_TIMESTAMP WHERE v.id = :id")
    int updateExitTimeById(@Param("id") int id);

    List<VisitorLogs> findByType(String type);

    List<VisitorLogs> findByUsersId_Id(int usersIdId);

    List<VisitorLogs> findByGuardId_Id(int guardIdId);

    List<VisitorLogs> findByIsVerifiedFalse();

    @Modifying
    @Transactional
    @Query("UPDATE VisitorLogs v SET v.isVerified = true, v.updatedTime = CURRENT_TIMESTAMP WHERE v.Id = :id")
    int markIsVerifiedTrue(@Param("id") int id);
}
