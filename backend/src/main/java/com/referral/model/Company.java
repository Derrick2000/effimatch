package com.referral.model;

import java.io.Serializable;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class Company implements Serializable {

    //TODO: 看看这个serialVersionUID是干什么的 不需要删的话写一下注释
    private static final long serialVersionUID = -2784896358654617303L;

    private UUID id;

    @JsonProperty("companyName")
    private String companyName;
    @JsonProperty("logoUrl")
    private String logoUrl;

    public Company(String companyName, String logoUrl) {
        super();
        this.id = UUID.randomUUID();
        this.companyName = companyName;
        this.logoUrl = logoUrl;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }


}
