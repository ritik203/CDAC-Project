package com.sunbeam.admin.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "User_location")
public class UserLocation {
	
    @ManyToOne
    @JoinColumn(name="user_id")
	private User user;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "location_id")
    private int locationId;
    
    
    @ManyToOne
    @JoinColumn(name="location_id")
    private Location location;
    
    
}
