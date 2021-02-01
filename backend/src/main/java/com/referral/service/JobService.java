package com.referral.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.referral.dao.JobDao;
import com.referral.model.Job;

@Service
public class JobService {
	@Autowired
	private JobDao jobDao;
	
	public List<Job> getAllJobs(){
		return jobDao.getAllJobs();
	}
	
	public Job addJob1(String jobTitle, UUID companyId, String publisherEmail) {
		return jobDao.addJob1(jobTitle,companyId,publisherEmail);
	}
	
	public Job addJob2(String jobTitle, String companyName, String logoUrl, String publisherEmail) {
		return jobDao.addJob2(jobTitle, companyName, logoUrl, publisherEmail);
	}
}
