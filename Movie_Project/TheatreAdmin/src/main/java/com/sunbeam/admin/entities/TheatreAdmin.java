package com.sunbeam.admin.entities;


import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Table(name="theatre_admin")
@Entity
public class TheatreAdmin {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int theatre_admin_id;
	
	@Column
	private String name;
	 
	@Column
    private String email;
	@Column
    private String mobile;
	@Column
    private String password;
	@Column
    private String role;
		
	@JsonIgnore
	 @OneToMany(mappedBy = "theaterAdmin")
	private List<Theatre> theatres;
    
 



public int getTheatre_admin_id() {
		return theatre_admin_id;
	}

	public void setTheatre_admin_id(int theatre_admin_id) {
		this.theatre_admin_id = theatre_admin_id;
	}

public String getName() {
	return name;
}

public void setName(String name) {
	this.name = name;
}

public String getEmail() {
	return email;
}

public void setEmail(String email) {
	this.email = email;
}

public String getMobile() {
	return mobile;
}

public void setMobile(String mobile) {
	this.mobile = mobile;
}

public String getPassword() {
	return password;
}

public void setPassword(String password) {
	this.password = password;
}

public String getRole() {
	return role;
}

public void setRole(String role) {
	this.role = role;
}

public List<Theatre> getTheatres() {
	return theatres;
}

public void setTheatres(List<Theatre> theatres) {
	this.theatres = theatres;
}    

   
   
	

}

