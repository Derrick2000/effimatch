package com.referral.model;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

@Data
@NoArgsConstructor
public class Session implements Serializable {

    private static final long serialVersionUID = 9162325150766456901L;

    public static final int TOKEN_EXPIRES_TIME = 72 * 60 * 60 * 1000;

    @Getter
    @Setter
    private String userEmail;

    @Getter
    @Setter
    private String token;

    @Getter
    @Setter
    Date expiredBy;

    @Getter
    @Setter
    Date createdAt;

    public Session (String userEmail, String token) {
        this.userEmail = userEmail;
        this.token = token;
        this.createdAt = new Date();
        this.expiredBy = new Date(createdAt.getTime() + TOKEN_EXPIRES_TIME);
    }

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public Date getExpiredBy() {
		return expiredBy;
	}

	public void setExpiredBy(Date expiredBy) {
		this.expiredBy = expiredBy;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public static int getTokenExpiresTime() {
		return TOKEN_EXPIRES_TIME;
	}
    
    
}

