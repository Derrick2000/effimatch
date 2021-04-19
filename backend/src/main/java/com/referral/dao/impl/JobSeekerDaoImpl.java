package com.referral.dao.impl;

import java.util.Date;
import java.util.LinkedHashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Repository;

import com.referral.dao.JobSeekerDao;
import com.referral.model.JobSeeker;
import com.referral.model.Referrer;

@Repository
public class JobSeekerDaoImpl implements JobSeekerDao {

	 @Autowired
	 private RedisTemplate<String, Object> redisTemplate;

	 private static final String KEY = "JobSeeker";

	@Override
	public LinkedHashSet<JobSeeker> getAllJobSeeker() {
        return (LinkedHashSet<JobSeeker>) (LinkedHashSet) redisTemplate.opsForZSet().range(KEY, 0,-1);

	}

	@Override
	public JobSeeker addJobSeeker(JobSeeker jobSeeker) {
		String currentUserEmail = (String) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

	 JobSeeker jobSeekerToAdd = new JobSeeker(jobSeeker.getUserName(),currentUserEmail,jobSeeker.getJobPosition(),jobSeeker.getSkill(),jobSeeker.getJobType());
	 Date now = new Date(System.currentTimeMillis());
     redisTemplate.opsForZSet().add(KEY, jobSeekerToAdd, -now.getTime());
     return jobSeekerToAdd;
	}

	@Override
	public JobSeeker findJobSeekerByEmail(String email) {
		 LinkedHashSet<JobSeeker> list = getAllJobSeeker();
	        return list.stream()
	                .filter(j -> j.getUserEmail().equals(email))
	                .findAny()
	                .orElse(null);
	}

	@Override
	public boolean updateJobSeeker(JobSeeker jobSeeker, String email) {
		JobSeeker newJobSeeker = findJobSeekerByEmail(email);
		if(jobSeeker.getJobPosition() != null) {
			newJobSeeker.setJobPosition(jobSeeker.getJobPosition());
		}
		if(jobSeeker.getJobType() != null) {
			newJobSeeker.setJobType(jobSeeker.getJobType());
		}
		if(jobSeeker.getSkill() != null) {
			newJobSeeker.setSkill(jobSeeker.getSkill());
		}
		if(jobSeeker.getUserName()!= null) {
			newJobSeeker.setUserName(jobSeeker.getUserName());
		}
		Date modifiedTime = new Date(System.currentTimeMillis());
        if (deleteJobSeeker(email) == false) {
            return false;
        }
        redisTemplate.opsForZSet().add(KEY, newJobSeeker, -modifiedTime.getTime());
		return true;
	}

	private boolean deleteJobSeeker(String email) {
		var toDelete = findJobSeekerByEmail(email);

        // if remove failed, removed == 0
        Long removed = redisTemplate.opsForZSet().remove(KEY, 1, toDelete);

        return removed != null && removed != 0;
	}
	 
	 
	


}
