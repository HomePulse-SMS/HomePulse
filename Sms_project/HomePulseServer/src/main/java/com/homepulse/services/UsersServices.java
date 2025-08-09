package com.homepulse.services;

import com.homepulse.entities.userEmpSecretory.Complaints;
import com.homepulse.entities.userEmpSecretory.Users;

public interface UsersServices {

    Users registerUser(Users users);
//    void editUsers(Users users, int id);

    Users findByEmailAndPassword(String email, String password);

    void markIsVerifiedTrue(int id);
    
    Complaints raiseComplaint(int userId, String description);


}
