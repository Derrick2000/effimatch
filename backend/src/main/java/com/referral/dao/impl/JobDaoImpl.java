package com.referral.dao.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.referral.dao.JobDao;
import com.referral.model.Company;
import com.referral.model.Job;
import com.referral.model.Test;

@Repository
public class JobDaoImpl implements JobDao {
	
	 @Autowired
	    private RedisTemplate<String, Object> redisTemplate;

	    private static final String KEY = "JOB";


	@Override
	public List<Job> getAllJobs() {
		return (List) redisTemplate.opsForHash().values(KEY);
	}


	@Override
	public Job addJob1(@Param("jobTitile")String jobTitle,
			   @Param("companyId")UUID companyId,
			   @Param("publisherEmail")String publisherEmail) {
		
		List<Job> jobs= (List)redisTemplate.opsForHash().values(KEY);
		Company company=null;
		for(Job job:jobs) {
			if(job.getCompany().getId()==companyId) {
				company = job.getCompany();
				break;
			}
		}
		Job newJob = new Job(jobTitle, publisherEmail,company);
	    return newJob;
	}


	@Override
	public Job addJob2(String jobTitle, String companyName, String logoUrl, String publisherEmail) {
		Company newCompany = new Company(companyName,publisherEmail);
		Job newJob = new Job(jobTitle,jobTitle,newCompany);
		return newJob;
	}
	
}
