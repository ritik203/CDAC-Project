 package com.sunbeam.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sunbeam.admin.entities.TheatreAdmin;

@Repository
public interface TheatreAdminRepo extends JpaRepository<TheatreAdmin, Integer> {

	TheatreAdmin findByEmailAndPassword(String email, String password);
	

}
