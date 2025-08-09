package com.homepulse.services;

import com.homepulse.daos.admin.SocietyDao;
import com.homepulse.daos.guard.GuardDao;
import com.homepulse.daos.secretory.AmenityBookingDao;
import com.homepulse.daos.secretory.AmenityDao;
import com.homepulse.daos.secretory.NoticeDao;
import com.homepulse.daos.secretory.SecretoryDao;
import com.homepulse.daos.users.ComplaintsDao;
import com.homepulse.daos.users.UsersDao;
import com.homepulse.entities.VisitorLogs;
import com.homepulse.entities.admin.Society;
import com.homepulse.entities.userEmpSecretory.Amenity;
import com.homepulse.entities.userEmpSecretory.AmenityBooking;
import com.homepulse.entities.userEmpSecretory.Complaints;
import com.homepulse.entities.userEmpSecretory.Notice;
import com.homepulse.entities.userEmpSecretory.Users;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.ListableBeanFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class SecretoryServicesImpl implements SecretoryServices {

    @Autowired
    private SecretoryDao secretoryDao;
    
    @Autowired
    private GuardDao guardDao;
    
    @Autowired
    private NoticeDao noticeDao;
    
    @Autowired
    private UsersDao usersDao;
    
    @Autowired
    private ComplaintsDao complaintsDao;
    
    @Autowired 
    private SocietyDao societyDao;
    
    @Autowired 
    private AmenityDao amenityDao;
    
    @Autowired
    private AmenityBookingDao amenitybookingDao;
  

    @Override
    public int updateUserProfile(int id, String fname, String lname, String contact) {
        int rowsAffected = secretoryDao.updateProfile(id, fname, lname, contact);
        return rowsAffected;
    }

    @Override
    public List<Users> findAll() {
        return secretoryDao.findAll();
    }

    @Override
    public List<Users> findByRole(String role) {
        return secretoryDao.findByRole(role);
    }

    @Override
    public List<Users> findByApprovalFalse() {
        return secretoryDao.findByApprovalFalse();
    }

    @Override
    public List<Users> findByApprovalTrue() {
        return secretoryDao.findByApprovalTrue();
    }

    @Override
    public List<Users> findByWing(String wing) {
        return secretoryDao.findByWing(wing);
    }

    @Override
    public void approveUser(int id) {
        int updatedRows = secretoryDao.approveUserById(id);
        if (updatedRows == 0) {
            throw new RuntimeException("User Not Found");
        }
    }

    @Override
    public void disapproveUser(int id) {
        int updatedRows = secretoryDao.disapproveUserById(id);
        if (updatedRows == 0) {
            throw new RuntimeException("User Not Found");
        }
    }

    @Override
    public void deleteUser(int id) {
        int updatedRows = secretoryDao.deleteUser(id);
        if (updatedRows == 0) {
            throw new RuntimeException("User Not Found");
        }
    }

    @Override
    public List<Users> findBySocietyId(int id) {
        return secretoryDao.findBySocietyId_Id(id);
    }

    @Override
    public List<VisitorLogs> findAllVisitor() {
        return guardDao.findAll();
    }

    @Override
    public VisitorLogs findById(int id) {
        return guardDao.findById(id)
                .orElseThrow(() -> new RuntimeException("User Not found"));
    }

    @Override
    public List<VisitorLogs> findByType(String type) {
        return guardDao.findByType(type);
    }

    @Override
    public List<VisitorLogs> findByUsersId_Id(int usersIdId) {
        return guardDao.findByUsersId_Id(usersIdId);
    }

    @Override
    public List<VisitorLogs> findByGuardId_Id(int guardIdId) {
        return guardDao.findByGuardId_Id(guardIdId);
    }

    
    // ADD NOTICES -- SECRETARY
	@Override
	public Notice addNotice(Notice notice) {
	//	Ensure society exists
		if (notice.getSociety() != null && notice.getSociety().getId() != 0) {
            Society society = societyDao.findById(notice.getSociety().getId()).orElse(null);
            notice.setSociety(society);
	}
		
		// Ensure postedBy user exists
        if (notice.getPostedBy() != null && notice.getPostedBy().getId() != 0) {
            Users user = usersDao.findById(notice.getPostedBy().getId()).orElse(null);
            notice.setPostedBy(user);
        }

        return noticeDao.save(notice);
	}

	
	//GET ALL NOTICES --- USRES
	@Override
	public List<Notice> getAllNotices() {
        return noticeDao.findAll();

	}

	
	// DELETE NOTICE --- SECRETARY
	@Override
	public void deleteNotice(int id) {
        noticeDao.deleteById(id);

		
	}

	
	// UPDATE NOTICE --- SECRETARY
	@Override
	public void updateNotice(int id, Notice updatedNotice) {
		Notice existingNotice = noticeDao.findById(id)
		        .orElseThrow(() -> new RuntimeException("Notice not found with id: " + id));

		    existingNotice.setTitle(updatedNotice.getTitle());
		    existingNotice.setContent(updatedNotice.getContent());
		    existingNotice.setCreatedAt(LocalDateTime.now());

		    noticeDao.save(existingNotice);

	


}

	@Override
	public ResponseEntity<String> replyToComplaint(int complaintId, String secretaryEmail, String reply) {

		Optional<Complaints> complaintOpt = complaintsDao.findById(complaintId);
	        if (!complaintOpt.isPresent()) {
	            return ResponseEntity.badRequest().body("Complaint not found");
	        }

	        Users secretary = usersDao.findByEmail(secretaryEmail);
	        if (secretary == null || !secretary.getRole().equalsIgnoreCase("SECRETARY")) {
	            return ResponseEntity.badRequest().body("Invalid secretary email");
	        }

	        Complaints complaint = complaintOpt.get();
	        complaint.setReply(reply);
	        complaint.setStatus("Resolved");
	        complaintsDao.save(complaint);

	        return ResponseEntity.ok("Reply sent to user successfully");
	}
	 @Override
	    public List<Complaints> getAllComplaints() {
	        return complaintsDao.findAll();
	    }

	@Override
	public List<Complaints> getComplaintsByUser(int userId) {
		  
		    
		        Users user = usersDao.findById(userId)
		                .orElseThrow(() -> new EntityNotFoundException("User not found"));
		        return complaintsDao.findByUser(user);
		    }

	@Override
	public List<Complaints> getComplaintsByStatus(String status) {
		 return complaintsDao.findByStatus(status);
	}

	
	// Amenities
	 @Override
	    public Amenity createAmenity(Amenity amenity, Integer createdById) {
	        if (amenityDao.existsByName(amenity.getName())) {
	            throw new IllegalArgumentException("Amenity with this name already exists.");
	        }
	        amenity.setCreatedById(createdById);
	        // createdAt and active set automatically in entity lifecycle callback
	        return amenityDao.save(amenity);
	    }
	 
	 @Override
	    public List<Amenity> getAllAmenities() {
	        return amenityDao.findAll();
	    }
	 
	 @Override
	    public void deleteAmenity(Integer id) {
	        amenityDao.deleteById(id);
	    }

	@Override
	public AmenityBooking approveBooking(Integer bookingId, Integer approvedById) {
		AmenityBooking booking = amenitybookingDao.findById(bookingId)
		        .orElseThrow(() -> new IllegalArgumentException("Booking not found with id: " + bookingId));

		    Users approver = usersDao.findById(approvedById)
		        .orElseThrow(() -> new IllegalArgumentException("Approver not found with id: " + approvedById));

		    booking.setStatus("APPROVED");
		    booking.setApprovedBy(approver);

		    return amenitybookingDao.save(booking);
	}

	@Override
	public List<AmenityBooking> getAllBookings() {
        return amenitybookingDao.findAll();

	}

	@Override
	public List<AmenityBooking> getBookingsByUser(Integer userId) {
        return amenitybookingDao.findByUserId(userId);

	}

	@Override
	public void cancelBooking(int bookingId, int secretaryId) throws Exception {
		 AmenityBooking booking = amenitybookingDao.findById(bookingId).orElse(null);

	        if (booking == null) {
	            throw new Exception("Booking not found with ID: " + bookingId);
	        }

	        Users approvedBy = booking.getApprovedBy();
	        if (approvedBy == null) {
	            throw new IllegalStateException("Booking not approved yet, cannot cancel.");
	        }

	        if (!Objects.equals(approvedBy.getId(), secretaryId)) {
	            throw new IllegalStateException("You are not authorized to cancel this booking.");
	        }

	        booking.setStatus("CANCELLED");
	        booking.setCreatedAt(LocalDateTime.now());

	        amenitybookingDao.save(booking);
	
} 
}
		

