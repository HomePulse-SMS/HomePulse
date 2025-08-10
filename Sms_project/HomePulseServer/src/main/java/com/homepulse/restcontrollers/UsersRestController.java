package com.homepulse.restcontrollers;

import com.homepulse.entities.userEmpSecretory.Users;
import com.homepulse.services.UsersServices;
import com.homepulse.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
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

}
