package com.homepulse.restcontrollers;

import com.homepulse.entities.userEmpSecretory.LoginRequest;
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

    @PutMapping
    public ResponseUtil<?> addUser(@RequestBody Users users) {
        usersServices.addUser(users);
        return ResponseUtil.apiSuccess("New User is Added");
    }

//    @PatchMapping("/editUser/{id}")
//    public ResponseUtil<?> editUsers(@RequestBody Users user, @PathVariable("id") int id) {
//        usersServices.editUsers(user, id);
//        return  ResponseUtil.apiSuccess("User Data is updated");
//    }

    @PostMapping("/login")
    public ResponseUtil<?> findUser(@RequestBody LoginRequest loginRequest) {

        Users users;
        try {
            users = usersServices.findByEmailAndPassword(loginRequest.getEmail(), loginRequest.getPassword());
        } catch (Exception e) {
            return ResponseUtil.apiError("User Not Found");
        }

        if (users != null)
            return ResponseUtil.apiSuccess(users);

        return ResponseUtil.apiError("user Not Found");
    }

}
