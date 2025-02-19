package com.sunbeam.admin.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunbeam.admin.entities.TheatreAdmin;
import com.sunbeam.admin.repository.TheatreAdminRepo;

@Service
public class TheaterAdminServiceImpl implements TheatreAdminService {
  
	@Autowired
	private TheatreAdminRepo repo;
	
	
	@Override
	public List<TheatreAdmin> getAllAdmins() {		
		return repo.findAll();
	}


    public TheatreAdmin authenticateAdmin(String email, String password) {
        return repo.findByEmailAndPassword(email, password);
    }



	 

}
