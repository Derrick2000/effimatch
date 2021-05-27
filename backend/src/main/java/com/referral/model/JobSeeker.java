package com.referral.model;

import java.io.Serializable;
import java.util.UUID;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class JobSeeker implements Serializable {
	
	private static final long serialVersionUID = -6744505724807143729L;
	
	@Getter
	UUID id;
	
	@Getter
	@Setter
	String userName;
	
	@Getter
	@Setter
	String userEmail;
	
	@Getter
	@Setter
	String jobPosition;
	
	@Getter
	@Setter
	String skill;
	
	@Getter
	@Setter
	String jobType;
	
	public JobSeeker(String userName, String userEmail, String jobPosition, String skill, String jobType) {
		this.id = UUID.randomUUID();
		this.userName = userName;
		this.userEmail = userEmail;
		this.jobPosition = jobPosition;
		this.skill = skill;
		this.jobType = jobType;
	}
	
}
