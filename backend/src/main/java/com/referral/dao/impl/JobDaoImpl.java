package com.referral.dao.impl;

import java.util.*;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Repository;

import com.referral.dao.JobDao;
import com.referral.model.Job;

@Repository
public class JobDaoImpl implements JobDao {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    private static final String KEY = "JOB";

    @Override
    public LinkedHashSet<Job> getAllJobs() {
        return (LinkedHashSet<Job>) (LinkedHashSet) redisTemplate.opsForZSet().range(KEY, 0,-1);
    }

    @Override
    public LinkedHashSet<Job> getSomeJobs(Integer num) {
        return (LinkedHashSet) redisTemplate.opsForZSet().range(KEY, 0, num - 1);
    }

    @Override
    public Job addJob(Job job) {

        // get the current currentUserEmail
        String currentUserEmail = (String) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        Date now = new Date(System.currentTimeMillis());
        Job jobToAdd = new Job(job.getJobTitle(), currentUserEmail, job.getCompanyName(), now, now,job.getLocation(),job.getStudentType());
     
        redisTemplate.opsForZSet().add(KEY, jobToAdd, -now.getTime());
        return jobToAdd;
    }

    @Override
    public Job findJobById(UUID id) {
        LinkedHashSet<Job> list = getAllJobs();
        return list.stream()
                .filter(j -> j.getId().equals(id))
                .findAny()
                .orElse(null);
    }

    @Override
    public boolean updateJob(UUID id, Job job) {
        // TODO: fix this (change corresponding functions to opsForZSet)

        Job newJob = findJobById(id);
        if (newJob == null) {
            return false;
        }
        newJob.setId(UUID.randomUUID());
        
        if (job.getJobTitle() != null) {
            newJob.setJobTitle(job.getJobTitle());
        }
        if(job.getLocation() != null) {
        	newJob.setLocation(job.getLocation());
        }
        if(job.getStudentType() != null) {
        	newJob.setStudentType(job.getStudentType());
        }
        
        Date modifiedTime = new Date(System.currentTimeMillis());
        newJob.setModifiedTime(modifiedTime);
        if (deleteJob(id) == false) {
            return false;
        }
        redisTemplate.opsForZSet().add(KEY, newJob, -newJob.getCreatedTime().getTime());
        return true;
    }

    @Override
    public boolean deleteJob(UUID id) {
        var toDelete = findJobById(id);

        // if remove failed, removed == 0
        Long removed = redisTemplate.opsForZSet().remove(KEY, 1, toDelete);

        return removed != null && removed != 0;
    }

	@Override
	public LinkedHashSet<Job> getSkipJobs(Integer skip) {
		long size = redisTemplate.opsForZSet().size(KEY);
		if(skip >= size) {
			return null;
		}else {
	        return (LinkedHashSet) redisTemplate.opsForZSet().range(KEY, skip, size-1);

		}
	}

	@Override
	public LinkedHashSet<Job> getSearchJobs(String search) {
		 LinkedHashSet<Job> list = getAllJobs();
		 LinkedHashSet<Job> searchedJobs = new LinkedHashSet<>();
		 for(Job j:list) {
			 if(j.getJobTitle().equals(search) || j.getCompanyName().equals(search)) {
				 searchedJobs.add(j);
			 }
		 }
	     return searchedJobs;
	}

	@Override
	public LinkedHashSet<Job> getSearchWithNumJobs(String search, Integer num) {
		LinkedHashSet<Job> list = getSearchJobs(search);
		LinkedHashSet<Job> searchWithNumJobs = new LinkedHashSet<>();
		int temp = num;
		for(Job j:list) {
			if(temp <= 0)
				break;
			searchWithNumJobs.add(j);
			temp--;
		}
		return searchWithNumJobs;
	}
}
