package com.homepulse.services;

import com.homepulse.entities.userEmpSecretory.Users;

public interface UsersServices {

    void addUser(Users users);
//    void editUsers(Users users, int id);

    Users findByEmailAndPassword(String email, String password);

    void markIsVerifiedTrue(int id);
}
