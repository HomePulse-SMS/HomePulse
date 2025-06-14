package com.homepulse.restcontrollers;

import com.homepulse.entities.admin.Location;
import com.homepulse.entities.admin.Society;
import com.homepulse.services.AdminServices;
import com.homepulse.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/admin")
@RestController
public class AdminRestController {

    @Autowired
    private AdminServices adminServices;

    @PostMapping("/addSociety")
    public ResponseUtil<?> addSociety(@RequestBody Society society) {
        adminServices.addSociety(society);
        return ResponseUtil.apiSuccess("New Society Added");
    }

    @PostMapping("/addLocation")
    public ResponseUtil<?> addLocation(@RequestBody Location location) {
        adminServices.addLocation(location);
        return ResponseUtil.apiSuccess("New Location Added");
    }
}
