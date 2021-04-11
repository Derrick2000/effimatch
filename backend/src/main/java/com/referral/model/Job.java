package com.referral.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class Job implements Serializable {
	//如果不自动生成此序列化UID, 在解析时会使用一个默认的值，而这个默认的值有小概率
	//造成InvalidClassExceptions, this variable merely serves as an insurance.
	private static final long serialVersionUID = -5145054486093906259L;

	@Getter
	private UUID id;

    @JsonProperty("jobTitle")
	@Getter
	@Setter
    private String jobTitle;

	@JsonProperty("jobDescription")
	@Getter
	@Setter
	private String jobDescription;

	@JsonProperty("requiredExperience")
	@Getter
	@Setter
	private String requiredExperience;

	@JsonProperty("jobLink")
	@Getter
	@Setter
	private String jobLink;

	@JsonProperty("location")
	@Getter
	@Setter
	private String location;

	@JsonProperty("companyName")
	@Getter
	@Setter
	private String companyName;

	@JsonProperty("applicationDeadline")
	@Getter
	@Setter
	private Date applicationDeadline;

    @JsonProperty("publisherEmail")
	@Getter
	@Setter
    private String publisherEmail;
    
    @JsonProperty("createdTime")
	@Getter
    private Date createdTime;

    @JsonProperty("modifiedTime")
	@Getter
	@Setter
	private Date modifiedTime;

    public Job(String jobTitle,
			   String jobDescription,
			   String requiredExperience,
			   String jobLink,
			   String location,
			   String companyName,
			   Date applicationDeadline,
			   String publisherEmail,
			   Date createdTime,
			   Date modifiedTime) {
		super();
		this.id = UUID.randomUUID();
		this.jobTitle = jobTitle;
		this.jobDescription = jobDescription;
		this.requiredExperience = requiredExperience;
		this.jobLink = jobLink;
		this.location = location;
		this.companyName = companyName;
		this.applicationDeadline = applicationDeadline;
		this.publisherEmail = publisherEmail;
		this.createdTime = createdTime;
		this.modifiedTime = modifiedTime;
	}

//	// 不需要
//	public void setCreatedTime(Date createdTime) {
//		this.createdTime = createdTime;
//	}
//
}
