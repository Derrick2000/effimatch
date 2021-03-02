package com.referral.dao.impl;

import java.util.Date;
import java.util.LinkedHashSet;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Repository;

import com.referral.dao.ReferrerDao;
import com.referral.model.Job;
import com.referral.model.Referrer;
import com.referral.model.Review;

@Repository
public class ReferrerImpl implements ReferrerDao{
	 @Autowired
	 private RedisTemplate<String, Object> redisTemplate;

	 private static final String KEY = "Referrer";
	 
	 
	 @Override
		public LinkedHashSet<Referrer> getAllReferrer() {
	        return (LinkedHashSet<Referrer>) (LinkedHashSet) redisTemplate.opsForZSet().range(KEY, 0,-1);

		}

	@Override
	public Referrer addReferrer(Referrer referrer) {
		 String currentUserEmail = (String) SecurityContextHolder
	                .getContext()
	                .getAuthentication()
	                .getPrincipal();

		 Referrer referrerToAdd = new Referrer(referrer.getUserName(),currentUserEmail,referrer.getLinkedInUrl(),referrer.getCompanyName(),referrer.getJobTitle());
		 Date now = new Date(System.currentTimeMillis());
	     redisTemplate.opsForZSet().add(KEY, referrerToAdd, -now.getTime());
	     return referrerToAdd;
	}

	@Override
	public Referrer findReferrerByEmail(String email) {
		 LinkedHashSet<Referrer> list = getAllReferrer();
	        return list.stream()
	                .filter(j -> j.getUserEmail().equals(email))
	                .findAny()
	                .orElse(null);
	}

	@Override
	public boolean updateReferrer(Referrer referrer, String email) {
		Referrer newReferrer = findReferrerByEmail(email);
        if (newReferrer == null) {
            return false;
        }
        
        if(referrer.getUserName() != null) {
        	newReferrer.setUserName(referrer.getUserName());
        }
        if(referrer.getLinkedInUrl() != null) {
        	newReferrer.setLinkedInUrl(referrer.getLinkedInUrl());
        }
        if(referrer.getJobTitle() != null) {
        	newReferrer.setJobTitle(referrer.getJobTitle());
        }
        if(referrer.getCompanyName() != null) {
        	newReferrer.setCompanyName(referrer.getCompanyName());
        }
        
        Date modifiedTime = new Date(System.currentTimeMillis());
        if (deleteReferrer(email) == false) {
            return false;
        }
        redisTemplate.opsForZSet().add(KEY, newReferrer, -modifiedTime.getTime());
        return true;
	}

	private boolean deleteReferrer(String email) {
		var toDelete = findReferrerByEmail(email);

        // if remove failed, removed == 0
        Long removed = redisTemplate.opsForZSet().remove(KEY, 1, toDelete);

        return removed != null && removed != 0;
	}

	
}
