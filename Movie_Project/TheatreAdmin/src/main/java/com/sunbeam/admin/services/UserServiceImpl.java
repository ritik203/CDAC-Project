package com.sunbeam.admin.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunbeam.admin.entities.TheatreAdmin;
import com.sunbeam.admin.entities.User;
import com.sunbeam.admin.repository.UserRepository;

@Service
public class UserServiceImpl{

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        return userRepository.save(user);
    }



    public Optional<User> getUserById(Integer id) {
        return userRepository.findById(id);
    }
    
	public List<User> getAllUsers() {		
		return userRepository.findAll();
	}
}