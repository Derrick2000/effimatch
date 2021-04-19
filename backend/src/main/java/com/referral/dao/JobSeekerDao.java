package com.referral.dao;

import java.util.LinkedHashSet;

import com.referral.model.JobSeeker;
import com.referral.model.Referrer;

public interface JobSeekerDao {
	LinkedHashSet<JobSeeker> getAllJobSeeker();
	JobSeeker addJobSeeker(JobSeeker jobSeeker);
	JobSeeker findJobSeekerByEmail(String email);
	boolean updateJobSeeker(JobSeeker jobSeeker,String email);
}
