package com.homepulse.restcontrollers;

import com.homepulse.entities.admin.Location;
import com.homepulse.entities.admin.Society;
import com.homepulse.entities.userEmpSecretory.Users;
import com.homepulse.services.AdminServices;
import com.homepulse.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {
        "http://172.18.4.209:8081",
        "http://localhost:8081"
})
@RequestMapping("/admin")
@RestController
public class AdminRestController {

    @Autowired
    private AdminServices adminServices;

    @PostMapping("/addSociety")
    public ResponseUtil<?> addSociety(@RequestBody Society society) {
        adminServices.addSociety(society);
        return ResponseUtil.apiSuccess(society);
    }
    
   

    @PostMapping("/addLocation")
    public ResponseUtil<?> addLocation(@RequestBody Location location) {
        adminServices.addLocation(location);
        return ResponseUtil.apiSuccess("New Location Added");
    }

    @GetMapping("/getAllSociety")
    public ResponseUtil<?> findAllSociety() {
        List<Society> list = adminServices.findAllSociety();
        return ResponseUtil.apiSuccess(list);
    }

    @GetMapping("/getAllLocation")
    public ResponseUtil<?> findAllLocation() {
        List<Location> list = adminServices.findAllLocation();
        return ResponseUtil.apiSuccess(list);
    }

    @GetMapping("/location/{id}")
    public ResponseUtil<?> findByLocationId(@PathVariable("id") int id) {
        List<Society> list = adminServices.findByLocationId_Id(id);
        return ResponseUtil.apiSuccess(list);
    }

    @PostMapping("/addSecretory")
    public ResponseUtil<?> addSecretory(@RequestBody Users newSecretory) {
        adminServices.addSecretory(newSecretory);
        return ResponseUtil.apiSuccess("Secretory Added");
    }
}
