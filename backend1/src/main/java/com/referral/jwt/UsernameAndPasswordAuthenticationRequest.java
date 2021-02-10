package com.referral.jwt;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UsernameAndPasswordAuthenticationRequest {

    @JsonProperty("email")
    private String username;
    @JsonProperty("password")
    private String password;

    public UsernameAndPasswordAuthenticationRequest() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
