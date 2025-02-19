package com.sunbeam.admin.entities;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
@Table(name="theatre")
@Entity
public class Theatre {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int theatre_id;
	@Column
	private String name;
	@Column
	private int no_of_screens;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="theatre_admin_id")
	private TheatreAdmin theaterAdmin;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="city_id")
	private City city;

	public int getTheatre_id() {
		return theatre_id;
	}

	public void setTheatre_id(int theatre_id) {
		this.theatre_id = theatre_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getNo_of_screens() {
		return no_of_screens;
	}

	public void setNo_of_screens(int no_of_screens) {
		this.no_of_screens = no_of_screens;
	}

	public TheatreAdmin getTheaterAdmin() {
		return theaterAdmin;
	}

	public void setTheaterAdmin(TheatreAdmin theaterAdmin) {
		this.theaterAdmin = theaterAdmin;
	}

	public City getCity() {
		return city;
	}

	public void setCity(City city) {
		this.city = city;
	}
	
	
	

}
