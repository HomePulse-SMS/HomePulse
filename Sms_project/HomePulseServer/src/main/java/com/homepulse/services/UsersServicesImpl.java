package com.homepulse.services;

import com.homepulse.daos.users.UsersDao;
import com.homepulse.entities.userEmpSecretory.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsersServicesImpl implements UsersServices{

    @Autowired
    private UsersDao usersDao;

    @Override
    public void addUser(Users users) {
        usersDao.save(users);
    }

//    @Override
//    public void editUsers(Users users, int id) {
//        usersDao.save(users);
//    }

    @Override
    public Users findByEmailAndPassword(String email, String password) {
        return usersDao.findByEmailAndPassword(email,password);
    }

}
