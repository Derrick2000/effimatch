package com.referral.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class Job implements Serializable {
    //New
	@JsonProperty("location")
    private String location;
	@JsonProperty("studentType")
    private String studentType;

   
	//如果不自动生成此序列化UID, 在解析时会使用一个默认的值，而这个默认的值有小概率
	//造成InvalidClassExceptions, this variable merely serves as an insurance.
    
	private static final long serialVersionUID = -5145054486093906259L;

	private UUID id;

    @JsonProperty("jobTitle")
    private String jobTitle;

    @JsonProperty("publisherEmail")
    private String publisherEmail;

    @JsonProperty("companyName")
    private String companyName;
    
    @JsonProperty("createdTime")
    private Date createdTime;
    @JsonProperty("modifiedTime")
	private  Date modifiedTime;
    

	
	

    public Job(String jobTitle, String publisherEmail, String companyName, Date createdTime, Date modifiedTime, String location, String studentType) {
		super();
		this.id = UUID.randomUUID();
		this.jobTitle = jobTitle;
		this.publisherEmail = publisherEmail;
		this.companyName = companyName;
		this.createdTime = createdTime;
		this.modifiedTime = modifiedTime;
		this.location = location;
		this.studentType = studentType;
	}

	public Date getCreatedTime() {
		return createdTime;
	}

	public void setCreatedTime(Date createdTime) {
		this.createdTime = createdTime;
	}

	public Date getModifiedTime() {
		return modifiedTime;
	}

	public void setModifiedTime(Date modifiedTime) {
		this.modifiedTime = modifiedTime;
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

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getStudentType() {
		return studentType;
	}

	public void setStudentType(String studentType) {
		this.studentType = studentType;
	}
	
	
    
    
}
