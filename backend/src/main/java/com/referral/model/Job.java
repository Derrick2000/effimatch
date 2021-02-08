package com.referral.model;

import java.io.Serializable;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class Job implements Serializable {

    //TODO: 看看这个serialVersionUID是干什么的 不需要删的话写一下注释
    private static final long serialVersionUID = -5145054486093906259L;

    private UUID id;

    @JsonProperty("jobTitle")
    private String jobTitle;

    @JsonProperty("publisherEmail")
    private String publisherEmail;

    @JsonProperty("companyName")
    private String companyName;

    public Job(String jobTitle, String publisherEmail, String companyName) {
        super();
        this.id = UUID.randomUUID();
        this.jobTitle = jobTitle;
        this.publisherEmail = publisherEmail;
        this.companyName = companyName;
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
}
