package com.homepulse.services;

import com.homepulse.entities.VisitorLogs;
import com.homepulse.entities.userEmpSecretory.Users;

import java.util.List;

public interface SecretoryServices {

    List<Users> findAll();
    List<Users> findByRole(String role);
    List<Users> findByApprovalFalse();
    List<Users> findByApprovalTrue();
    List<Users> findByWing(String wing);

    void approveUser(int id);
    void disapproveUser(int id);
    void deleteUser(int id);

    List<Users> findBySocietyId(int id);

    // Visitors_Logs
    List<VisitorLogs> findAllVisitor();
    VisitorLogs findById(int id);
    List<VisitorLogs> findByType(String type);
    List<VisitorLogs> findByUsersId_Id(int usersIdId);
    List<VisitorLogs> findByGuardId_Id(int guardIdId);



}
