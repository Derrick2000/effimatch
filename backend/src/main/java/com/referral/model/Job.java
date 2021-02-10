package com.referral.model;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class Job implements Serializable {

    //TODO: 看看这个serialVersionUID是干什么的 不需要删的话写一下注释
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
    private LocalDateTime createdTime;
    @JsonProperty("modifiedTime")
	private LocalDateTime modifiedTime;
	
	

    public Job(String jobTitle, String publisherEmail, String companyName, LocalDateTime createdTime, LocalDateTime modifiedTime) {
		super();
		this.id = UUID.randomUUID();
		this.jobTitle = jobTitle;
		this.publisherEmail = publisherEmail;
		this.companyName = companyName;
		this.createdTime = createdTime;
		this.modifiedTime = modifiedTime;
	}

	public LocalDateTime getCreatedTime() {
		return createdTime;
	}

	public void setCreatedTime(LocalDateTime createdTime) {
		this.createdTime = createdTime;
	}

	public LocalDateTime getModifiedTime() {
		return modifiedTime;
	}

	public void setModifiedTime(LocalDateTime modifiedTime) {
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
    
    
}
