package com.homepulse.services;

import com.homepulse.entities.VisitorLogs;
import com.homepulse.entities.userEmpSecretory.Complaints;
import com.homepulse.entities.userEmpSecretory.Notice;
import com.homepulse.entities.userEmpSecretory.Users;

import java.util.List;

import org.springframework.http.ResponseEntity;

public interface SecretoryServices {

    int updateUserProfile(int id, String fname, String lname, String contact);

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
    
    // notices -- secretary
    Notice addNotice(Notice notice);
    
    List<Notice> getAllNotices();
    
    void deleteNotice(int id);
    
    void updateNotice(int id, Notice updatedNotice);       

    ResponseEntity<String> replyToComplaint(int complaintId, String secretaryEmail, String reply);

    List<Complaints> getAllComplaints();


    List<Complaints> getComplaintsByUser(int userId);
    
    List<Complaints> getComplaintsByStatus(String status);





}
