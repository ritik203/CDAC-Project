package com.sunbeam.admin.entities;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "mobile")
    private String mobile;

    @Column(name = "password")
    private String password;

    @Column(name = "role")
    private String role;

    
    
    
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
	private List<UserLocation> locations;
	
	@OneToMany(mappedBy = "user",cascade = CascadeType.ALL )
	@JsonIgnore
	private List<Booking> bookings;
	
	
	
    
}