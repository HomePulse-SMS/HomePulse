package com.homepulse.restcontrollers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.homepulse.models.Credentials;
import com.homepulse.security.JwtUtil;
import com.homepulse.services.UsersServices;

@RestController
public class CommonLoginController {
	private UsersServices usersServices;
	@Autowired
	private AuthenticationManager authManager;
	@Autowired
	private JwtUtil jwtUtil;
	
	 
	@Autowired
	public CommonLoginController(UsersServices usersServices) {
		this.usersServices = usersServices;
	}

	
	// Login
    @PostMapping("/authenticate")
	public ResponseEntity<?> authenticate(@RequestBody Credentials cr) {
	    Authentication auth = new UsernamePasswordAuthenticationToken(cr.getEmail(), cr.getPassword());
	    auth = authManager.authenticate(auth);
	    String token = jwtUtil.createToken(auth);

	    Map<String, String> response = new HashMap<>();
	    response.put("jwttoken", token);
	    return ResponseEntity.ok(response);
	}

}


