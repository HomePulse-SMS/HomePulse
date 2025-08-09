package com.homepulse.services;

import java.time.LocalDateTime;

import com.homepulse.entities.userEmpSecretory.AmenityBooking;
import com.homepulse.entities.userEmpSecretory.Complaints;
import com.homepulse.entities.userEmpSecretory.Users;

public interface UsersServices {

    Users registerUser(Users users);
//    void editUsers(Users users, int id);

    Users findByEmailAndPassword(String email, String password);

    void markIsVerifiedTrue(int id);
    
    Complaints raiseComplaint(int userId, String description);


    AmenityBooking bookAmenity(Integer amenityId, Integer userId, LocalDateTime start, LocalDateTime end);


    AmenityBooking cancelBooking(Integer bookingId);
}
