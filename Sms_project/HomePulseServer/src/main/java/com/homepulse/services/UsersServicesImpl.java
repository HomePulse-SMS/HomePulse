package com.homepulse.services;

import com.homepulse.daos.guard.GuardDao;
import com.homepulse.daos.secretory.AmenityBookingDao;
import com.homepulse.daos.secretory.AmenityDao;
import com.homepulse.daos.users.ComplaintsDao;
import com.homepulse.daos.users.UsersDao;
import com.homepulse.entities.userEmpSecretory.Amenity;
import com.homepulse.entities.userEmpSecretory.AmenityBooking;
import com.homepulse.entities.userEmpSecretory.Complaints;
import com.homepulse.entities.userEmpSecretory.Users;

import jakarta.persistence.EntityNotFoundException;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsersServicesImpl implements UsersServices, UserDetailsService{

    @Autowired
    private UsersDao usersDao;

    @Autowired
    private GuardDao guardDao;
    
    @Autowired
    private ComplaintsDao complaintsDao;
    
    @Autowired
    private AmenityDao amenityDao;
    
    @Autowired
    private AmenityBookingDao amenitybookingDao;

    @Lazy
    @Autowired
    private PasswordEncoder pwen;

//    @Override
//    public void addUser(Users users) {
//        usersDao.save(users);
//    }
    
    public Users registerUser(Users user) {
        // Encrypt the password
        user.setPassword(pwen.encode(user.getPassword()));

        // Optional: Normalize role to uppercase (e.g., "ADMIN")
//        user.setRole(user.getRole().toUpperCase());
        user.setRole("USER");
        user.setFlag(false);
        user.setApproval(false);
        // Save the user
        return usersDao.save(user);
    }

//    @Override
//    public void editUsers(Users users, int id) {
//        usersDao.save(users);
//    }

    @Override
    public Users findByEmailAndPassword(String email, String password) {
        return usersDao.findByEmailAndPassword(email,password);
    }

    @Override
    public void markIsVerifiedTrue(int id) {
        int updateRow = guardDao.markIsVerifiedTrue(id);

        if (updateRow ==0) {
            throw new RuntimeException("Visitor Not Found");
        }
    }

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Users dbUser = usersDao.findByEmail(email);
        if (dbUser == null)
            throw new UsernameNotFoundException("No user exists!");
        return dbUser;
	}
	
	
	@Override
	public Complaints raiseComplaint(int userId, String description) {
		 Users user = usersDao.findById(userId)
	                .orElseThrow(() -> new EntityNotFoundException("User not found"));

	        Complaints complaint = new Complaints();
	        complaint.setUser(user);
	        complaint.setDescription(description);
	        complaint.setStatus("Pending");

	        return complaintsDao.save(complaint);
	}
	
	public AmenityBooking bookAmenity(Integer amenityId, Integer userId, LocalDateTime start, LocalDateTime end) {
        Amenity amenity = amenityDao.findById(amenityId)
                .orElseThrow(() -> new IllegalArgumentException("Amenity not found with id: " + amenityId));
        Users user = usersDao.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));

        // Optional: add validations for overlapping bookings, time logic, etc.

        AmenityBooking booking = new AmenityBooking();
        booking.setAmenity(amenity);
        booking.setUser(user);
        booking.setStartTime(start);
        booking.setEndTime(end);
        booking.setStatus("PENDING");

        return amenitybookingDao.save(booking);

}
	
	@Override
	public AmenityBooking cancelBooking(Integer bookingId) {
		 AmenityBooking booking = amenitybookingDao.findById(bookingId)
		            .orElseThrow(() -> new RuntimeException("Booking not found with id: " + bookingId));

		        booking.setStatus("CANCELLED");
		        return amenitybookingDao.save(booking);
	}

}
