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

@Entity
@Table(name = "location")
public class Location {

 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 @Column(name = "location_id")
 private int locationId;
 
 
   private String Street;
   private String city;
   private String state;
   private String country;
   private String pinCode;
    
   @OneToMany(mappedBy = "location",cascade = CascadeType.ALL)
   private List<UserLocation> userLocations;
   
}