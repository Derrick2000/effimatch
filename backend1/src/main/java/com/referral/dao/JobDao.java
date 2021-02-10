package com.referral.dao;

import java.util.List;
import java.util.UUID;

import org.springframework.data.repository.query.Param;

import com.referral.model.Job;

public interface JobDao {
	
	List<Job> getAllJobs();

	Job addJob(Job job);
}
