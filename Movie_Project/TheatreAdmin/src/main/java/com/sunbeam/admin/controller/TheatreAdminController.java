package com.sunbeam.admin.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.admin.entities.TheatreAdmin;
import com.sunbeam.admin.services.TheaterAdminServiceImpl;

@RestController
@RequestMapping("/admin")
public class TheatreAdminController {
     @Autowired
	private TheaterAdminServiceImpl service;
     
     @GetMapping("/allAdmins")
     public List<TheatreAdmin> getAllAdmins(){
		return service.getAllAdmins();
    	 
     }
     @PostMapping("/login")
     public ResponseEntity<String> loginAdmin(@RequestBody Map<String, String> credentials) {
         String email = credentials.get("email");
         String password = credentials.get("password");
         service.authenticateAdmin(email, password);
         return ResponseEntity.ok("Success");
     }
    
	
}
