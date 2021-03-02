package com.referral.model;

import java.io.Serializable;
import java.util.Date;
import java.util.UUID;

import lombok.Data;

@Data
public class Review implements Serializable {

	private static final long serialVersionUID = -4434526674812051394L;
	UUID id;
	String username;
	String referrerEmail;
	String reviewContent;
	Date date;
	public Review(String username, String referrerEmail, String reviewContent, Date date) {
		super();
		this.id = UUID.randomUUID();
		this.username = username;
		this.referrerEmail = referrerEmail;
		this.reviewContent = reviewContent;
		this.date = date;
	}
	public UUID getId() {
		return id;
	}
	public void setId(UUID id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getReferrerEmail() {
		return referrerEmail;
	}
	public void setReferrerEmail(String referrerEmail) {
		this.referrerEmail = referrerEmail;
	}
	public String getReviewContent() {
		return reviewContent;
	}
	public void setReviewContent(String reviewContent) {
		this.reviewContent = reviewContent;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	
	
	
	
}
