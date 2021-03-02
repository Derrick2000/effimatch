package com.referral.service;

import java.util.LinkedHashSet;
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
	
	public LinkedHashSet<Job> getAllJobs(){
		return jobDao.getAllJobs();
	}
	public LinkedHashSet<Job> getSomeJobs(Integer num){
		if(num < 0) {
			throw new IllegalArgumentException();
		}
		return jobDao.getSomeJobs(num);
	}
	
	public LinkedHashSet<Job> getSkipJobs(Integer skip){
		if(skip < 0) {
			throw new IllegalArgumentException();
		}
		return jobDao.getSkipJobs(skip);
	}
	public LinkedHashSet<Job> getSearchJobs(String search){
		return jobDao.getSearchJobs(search);
	}
	public LinkedHashSet<Job> getSearchWithNumJobs(String search, Integer num){
		if(num < 0) {
			throw new IllegalArgumentException();
		}
		return jobDao.getSearchWithNumJobs(search,num);
	}
	
	
	

	public Job addJob(Job job) {
		return jobDao.addJob(job);
	}
	
	public boolean updateJob(UUID id, Job job) {
		return jobDao.updateJob(id,job);
	}
	
	public boolean deleteJob(UUID id) {
		return jobDao.deleteJob(id);
	}
}
