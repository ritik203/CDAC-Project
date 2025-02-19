package com.sunbeam.admin.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "booking")
public class Booking {

	@Id
	@Column(name = "booking_id")
	private int bookingId;
	
	@Column(name = "no_of_seats")
	private int noOfSeats;
	@Column(name = "booking_time")
	private int bookingTime;
	@Column(name = "theatre_id")
	private int theatreId;
	
	@Column(name = "show_id")
	private int showId;
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	@OneToOne
	@JoinColumn(name = "payment_id")
	private Payment payment;
	

    @ManyToOne
    @JoinColumn(name = "theatre_id", nullable = false) 
    private Theatre theatre;
    


}
	