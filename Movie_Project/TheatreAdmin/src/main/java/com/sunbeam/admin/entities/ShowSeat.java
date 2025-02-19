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
@Table(name = "show_seat")
public class ShowSeat {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "show_seat_id")
	private int showSeatId;
	
	private int status;
	
	private double price;
	private String duration;
	
	@ManyToOne
	@JoinColumn(name = "show_id")
	private Show show;
	
	@ManyToOne
	@JoinColumn(name = "screen_id")
	private Screen screen;
}