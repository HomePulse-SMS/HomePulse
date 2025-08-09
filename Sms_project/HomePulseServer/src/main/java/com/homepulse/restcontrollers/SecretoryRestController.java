package com.homepulse.restcontrollers;

import com.homepulse.entities.VisitorLogs;
import com.homepulse.entities.userEmpSecretory.Amenity;
import com.homepulse.entities.userEmpSecretory.AmenityBooking;
import com.homepulse.entities.userEmpSecretory.Complaints;
import com.homepulse.entities.userEmpSecretory.Notice;
import com.homepulse.entities.userEmpSecretory.Users;
import com.homepulse.models.UpdateSecretoryProfileDTO;
import com.homepulse.services.SecretoryServices;
import com.homepulse.services.UsersServices;
import com.homepulse.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping("/secretory")
@RestController
public class SecretoryRestController {

    @Autowired
    private SecretoryServices secretoryServices;
  
   @Autowired
    private UsersServices usersServices;
    

  
    @PutMapping("/updateProfile/{id}")
        public ResponseUtil<String> updateProfile(@PathVariable int id, @RequestBody UpdateSecretoryProfileDTO updateSecretoryProfileDTO) {
        String fname = updateSecretoryProfileDTO.getFname();
        String lname = updateSecretoryProfileDTO.getLname();
        String contact = updateSecretoryProfileDTO.getContact();
        int rowAffected = secretoryServices.updateUserProfile(id,fname,lname,contact);

        if (rowAffected > 1) {
            return ResponseUtil.apiError("Not Update");
        }
        return ResponseUtil.apiSuccess("Updated Successfully");
    }

    @GetMapping("/getAll")
    public ResponseUtil<?> getAll() {
        List<Users> list = secretoryServices.findAll();
        return ResponseUtil.apiSuccess(list);
    }

    @GetMapping("/findByRole/{role}")
    public ResponseUtil<?> findByRole(@PathVariable("role") String role) {
        List<Users> list = secretoryServices.findByRole(role);
        return ResponseUtil.apiSuccess(list);
    }

    @GetMapping("/notApproved")
    public ResponseUtil<?> findByApprovalFalse() {
        List<Users> list = secretoryServices.findByApprovalFalse();
        return ResponseUtil.apiSuccess(list);
    }

    @GetMapping("/approved")
    public ResponseUtil<?> findByApprovalTrue() {
        List<Users> list = secretoryServices.findByApprovalTrue();
        return ResponseUtil.apiSuccess(list);
    }

    @GetMapping("/findByWing/{wing}")
    public ResponseUtil<?> findByWing(@PathVariable("wing") String wing) {
        List<Users> list = secretoryServices.findByWing(wing);
        return ResponseUtil.apiSuccess(list);
    }

    @PatchMapping("/approve/{id}")
    public ResponseUtil<?> approveUser(@PathVariable("id") int id) {
        secretoryServices.approveUser(id);
        return ResponseUtil.apiSuccess("User is Approved");
    }

    @PatchMapping("/disapprove/{id}")
    public ResponseUtil<?> disapproveUser(@PathVariable("id") int id) {
        secretoryServices.disapproveUser(id);
        return ResponseUtil.apiSuccess("User is Disapproved");
    }

    @PatchMapping("/delete/{id}")
    public ResponseUtil<?> deleteUser(@PathVariable("id") int id) {
        secretoryServices.deleteUser(id);
        return ResponseUtil.apiSuccess("User is Deleted");
    }

    @GetMapping("/findBySocietyId/{id}")
    public ResponseUtil<?> findBySocietyId(@PathVariable int id) {
        List<Users> list = secretoryServices.findBySocietyId(id);
        return ResponseUtil.apiSuccess(list);
    }

    @GetMapping("/getAllVisitor")
    public ResponseUtil<?> findAllVisitor() {
        List<VisitorLogs> list = secretoryServices.findAllVisitor();
        return ResponseUtil.apiSuccess(list);
    }

    @GetMapping("/findByType/{type}")
    public ResponseUtil<?> findByType(@PathVariable("type") String type) {
        List<VisitorLogs> list = secretoryServices.findByType(type);
        return ResponseUtil.apiSuccess(list);
    }

    @GetMapping("/findById/{Id}")
    public ResponseUtil<?> findById(@PathVariable("Id") int id) {
        VisitorLogs visitorLogs = secretoryServices.findById(id);
        return ResponseUtil.apiSuccess(visitorLogs);
    }

    @GetMapping("/findByUserId/{id}")
    public  ResponseUtil<?> findByUsersId_Id(@PathVariable("id") int id) {
        List<VisitorLogs> list = secretoryServices.findByUsersId_Id(id);
        return ResponseUtil.apiSuccess(list);
    }

    @GetMapping("/findByGuardId/{id}")
    public  ResponseUtil<?> findByGuardId_Id(@PathVariable("id") int id) {
        List<VisitorLogs> list = secretoryServices.findByGuardId_Id(id);
        return ResponseUtil.apiSuccess(list);
    }
   
    
    //Notices
    // SECRETARY -- ADD NOTICES
    @PostMapping("/addNotice")
    public ResponseUtil<?> addNotice(@RequestBody Notice notice) {
        Notice saved = secretoryServices.addNotice(notice);
        return ResponseUtil.apiSuccess(saved);
    }
    
    // USER: View All Notices
    @GetMapping("/user/notices")
    public ResponseUtil<?> getAllNotices() {
        List<Notice> list = secretoryServices.getAllNotices();
        return ResponseUtil.apiSuccess(list);
    }
    
    
    // DELETE NOTICE BY ID --- SECRETARY
    @DeleteMapping("/noticeDel/{id}")
    public ResponseUtil<?> deleteNotice(@PathVariable int id) {
    	secretoryServices.deleteNotice(id);
        return ResponseUtil.apiSuccess("Notice deleted successfully");
    }
    
    // SECRETARY -- UPDATE NOTICES
    @PutMapping("/updateNotice/{id}")
    public ResponseUtil<?> updateNotice(@PathVariable int id, @RequestBody Notice updatedNotice) {
        secretoryServices.updateNotice(id, updatedNotice);
        return ResponseUtil.apiSuccess("Notice updated successfully");
    }
      
  // Reply to a complaint (SECRETARY)

    @PostMapping("/reply")
    public ResponseEntity<?> replyToComplaint(@RequestBody Map<String, String> body) {
        try {
            int complaintId = Integer.parseInt(body.get("complaintId"));
            String secretaryEmail = body.get("secretaryEmail");
            String reply = body.get("reply");

            return secretoryServices.replyToComplaint(complaintId, secretaryEmail, reply);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid request data: " + e.getMessage());
        }
    }
    
    // Secretary views all complaints
    @GetMapping("/allRaiseUsers")
    public ResponseEntity<List<Complaints>> getAllComplaints() {
        return ResponseEntity.ok(secretoryServices.getAllComplaints());
    }
    
    
 // Get complaints by userid
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Complaints>> getComplaintsByUser(@PathVariable int userId) {
        return ResponseEntity.ok(secretoryServices.getComplaintsByUser(userId));
    }
    
    // Secretary can check complaints by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Complaints>> getComplaintsByStatus(@PathVariable String status) {
        List<Complaints> complaints = secretoryServices.getComplaintsByStatus(status);
        return ResponseEntity.ok(complaints);
    }
    
    @PostMapping("/addAmenity")
    public Amenity createAmenity(@RequestBody Amenity amenity, Authentication authentication) {
        Integer createdById = Integer.parseInt(authentication.getName()); // adapt this based on your security setup
        return secretoryServices.createAmenity(amenity, createdById);
    }

    @GetMapping("getAllAmenities")
    public List<Amenity> getAllAmenities() {
        return secretoryServices.getAllAmenities();
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
    	secretoryServices.deleteAmenity(id);
        return ResponseEntity.ok(Map.of("message", "Deleted"));
    }
    
    // Amenities
    @PatchMapping("/amenity-bookings/approve/{bookingId}")
    public ResponseEntity<AmenityBooking> approveBooking(@PathVariable Integer bookingId,
                                                         @RequestBody Map<String, String> body) {
        Integer approvedById = Integer.parseInt(body.get("approvedById"));
        AmenityBooking approvedBooking = secretoryServices.approveBooking(bookingId, approvedById);
        return ResponseEntity.ok(approvedBooking);
    }

    @GetMapping("/getAllBookings")
    public ResponseEntity<List<AmenityBooking>> all() {
        return ResponseEntity.ok(secretoryServices.getAllBookings());
    }
    
    @GetMapping("/users/{userId}")
    public ResponseEntity<List<AmenityBooking>> byUser(@PathVariable Integer userId) {
        return ResponseEntity.ok(secretoryServices.getBookingsByUser(userId));
    }
    
    @PutMapping("/{bookingId}/cancel/{secretaryId}")
    public ResponseEntity<String> cancelBooking(
            @PathVariable int bookingId,
            @PathVariable int secretaryId) throws Exception {

    	secretoryServices.cancelBooking(bookingId, secretaryId);
        return ResponseEntity.ok("Booking cancelled successfully.");
    }
    
  
}
