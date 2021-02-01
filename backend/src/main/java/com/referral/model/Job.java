package com.referral.model;

import java.io.Serializable;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class Job implements Serializable{

	
	private static final long serialVersionUID = -5145054486093906259L;

	private UUID id;
	
	@JsonProperty("jobTitle")
	private String jobTitle;
	
	@JsonProperty("publisherEmail")
	private String publisherEmail;
	
	//@JsonProperty("company")
	private Company company;
	
	
	
	
	
	public Job(String jobTitle, String publisherEmail, Company company) {
		super();
		this.id = UUID.randomUUID();
		this.jobTitle = jobTitle;
		this.publisherEmail = publisherEmail;
		this.company = company;
	}
	public UUID getId() {
		return id;
	}
	public void setId(UUID id) {
		this.id = id;
	}
	public String getJobTitle() {
		return jobTitle;
	}
	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}
	public String getPublisherEmail() {
		return publisherEmail;
	}
	public void setPublisherEmail(String publisherEmail) {
		this.publisherEmail = publisherEmail;
	}
	public Company getCompany() {
		return company;
	}
	public void setCompany(Company company) {
		this.company = company;
	}
	
	
}
