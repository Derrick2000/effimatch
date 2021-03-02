package com.referral.model;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;

public class Referrer implements Serializable{
	
	private static final long serialVersionUID = 6630666075177516588L;
	String userName;
	String userEmail;
	String linkedInUrl;
	String companyName;
	String jobTitle;
	List<String> offeredJobType;
	List<UUID> offeredJobs;
	List<UUID> reviews;
	
	
	
	public Referrer(String userName, String userEmail, String linkedInUrl, String companyName, String jobTitle) {
		super();
		this.userName = userName;
		this.userEmail = userEmail;
		this.linkedInUrl = linkedInUrl;
		this.companyName = companyName;
		this.jobTitle = jobTitle;
		this.offeredJobType = null;
		this.offeredJobs = null;
		this.reviews = null;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	public String getLinkedInUrl() {
		return linkedInUrl;
	}
	public void setLinkedInUrl(String linkedInUrl) {
		this.linkedInUrl = linkedInUrl;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public String getJobTitle() {
		return jobTitle;
	}
	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}
	public List<String> getOfferedJobType() {
		return (List<String>) offeredJobType;
	}
	public void setOfferedJobType(List<String> offeredJobType) {
		this.offeredJobType = offeredJobType;
	}
	public List<UUID> getOfferedJobs() {
		return offeredJobs;
	}
	public void setOfferedJobs(List<UUID> offeredJobs) {
		this.offeredJobs = offeredJobs;
	}
	public List<UUID> getReviews() {
		return reviews;
	}
	public void setReviews(List<UUID> reviews) {
		this.reviews = reviews;
	}
	
	
}