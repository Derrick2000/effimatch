package com.referral.dao;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.UUID;

import org.springframework.data.repository.query.Param;

import com.referral.model.Job;

public interface JobDao {

	LinkedHashSet<Job> getAllJobs();
	LinkedHashSet<Job> getSomeJobs(Integer num);

	Job addJob(Job job);
	
	Job findJobById(UUID id);
	boolean updateJob(UUID id, Job job);
	
	boolean deleteJob(UUID id);
	
	
}
