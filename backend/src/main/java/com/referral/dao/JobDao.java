package com.referral.dao;

import java.util.List;
import java.util.UUID;

import org.springframework.data.repository.query.Param;

import com.referral.model.Job;

public interface JobDao {
	
	List<Job> getAllJobs();
	
	Job addJob1(@Param("jobTitile")String jobTitle,
			   @Param("companyId")UUID companyId,
			   @Param("publisherEmail")String publisherEmail);
	
	Job addJob2(@Param("jobTitile")String jobTitle,
			   @Param("companyName")String companyName,
			   @Param("logoUrl")String logoUrl,
			   @Param("publisherEmail")String publisherEmail);
	
}
