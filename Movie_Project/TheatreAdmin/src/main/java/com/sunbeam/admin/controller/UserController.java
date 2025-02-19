package com.sunbeam.admin.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.admin.entities.TheatreAdmin;
import com.sunbeam.admin.entities.User;
import com.sunbeam.admin.services.UserServiceImpl;

@RestController
@RequestMapping("/theatre_admin")
public class UserController {

    @Autowired
    private UserServiceImpl userService;

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        userService.registerUser(user);
        return "Success";
    }

 

    @GetMapping("/{id}")
    public Optional<User> getUser(@PathVariable Integer id) {
        return userService.getUserById(id);
    }
    @GetMapping("/allusers")
    public List<User> getAllUsers(){
		return userService.getAllUsers();}
}
