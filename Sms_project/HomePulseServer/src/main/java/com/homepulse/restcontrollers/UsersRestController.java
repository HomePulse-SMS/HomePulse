package com.homepulse.restcontrollers;

import com.homepulse.entities.userEmpSecretory.AmenityBooking;
import com.homepulse.entities.userEmpSecretory.Complaints;
import com.homepulse.entities.userEmpSecretory.Users;
import com.homepulse.services.UsersServices;
import com.homepulse.util.ResponseUtil;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/users")
@RestController
public class UsersRestController {

    @Autowired
    private UsersServices usersServices;
    
  

    @PostMapping("/register")
    public ResponseUtil<?> register(@RequestBody Users users) {
        usersServices.registerUser(users);
        return ResponseUtil.apiSuccess("New User is Added");
    }

//    @PatchMapping("/editUser/{id}")
//    public ResponseUtil<?> editUsers(@RequestBody Users user, @PathVariable("id") int id) {
//        usersServices.editUsers(user, id);
//        return  ResponseUtil.apiSuccess("User Data is updated");
//    }

//    @GetMapping("/login")
//    public ResponseUtil<?> login(@RequestBody LoginRequest loginRequest) {
//
//        Users users;
//        try {
//            users = usersServices.findByEmailAndPassword(loginRequest.getEmail(), loginRequest.getPassword());
//        } catch (Exception e) {
//            return ResponseUtil.apiError(e.getMessage());
//        }
//
//        if (users != null)
//            return ResponseUtil.apiSuccess(users);
//
//        return ResponseUtil.apiError("user Not Found");
//    }

    @PatchMapping("/VerifyVisitor/{id}")
    public ResponseUtil<?> markIsVerifiedTrue(@PathVariable("id") int id) {
        usersServices.markIsVerifiedTrue(id);
        return ResponseUtil.apiSuccess("Marked Verified");
    }
    
    // User raises complaint
    @PostMapping("/raiseComplaint")
    public ResponseEntity<Complaints> raiseComplaint(@RequestBody Map<String, String> request) {
        int userId = Integer.parseInt(request.get("userId"));
        String description = request.get("description");

        return ResponseEntity.ok(usersServices.raiseComplaint(userId, description));
    }

    
    // Amenities
    @PostMapping("/book/{amenityId}")
    public ResponseEntity<AmenityBooking> bookAmenity(@PathVariable Integer amenityId,
                                                      @RequestBody Map<String, String> body) {
        Integer userId = Integer.parseInt(body.get("userId"));
        LocalDateTime start = LocalDateTime.parse(body.get("start"));
        LocalDateTime end = LocalDateTime.parse(body.get("end"));

        AmenityBooking booking = usersServices.bookAmenity(amenityId, userId, start, end);
        return ResponseEntity.ok(booking);
    }

    
    @PatchMapping("/cancel/{bookingId}")
    public ResponseEntity<AmenityBooking> cancelBooking(@PathVariable Integer bookingId) {
        AmenityBooking cancelledBooking = usersServices.cancelBooking(bookingId);
        return ResponseEntity.ok(cancelledBooking);
    }

}
