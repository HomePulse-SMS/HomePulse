package com.homepulse.restcontrollers;

import com.homepulse.entities.VisitorLogs;
import com.homepulse.entities.userEmpSecretory.Notice;
import com.homepulse.entities.userEmpSecretory.Users;
import com.homepulse.services.SecretoryServices;
import com.homepulse.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/secretory")
@RestController
public class SecretoryRestController {

    @Autowired
    private SecretoryServices secretoryServices;
    
  

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

    

    
    



}
