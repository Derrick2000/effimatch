package com.referral.dao.impl;

import java.util.*;

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
    public Job addJob(Job job) {

        // get the current currentUserEmail
        String currentUserEmail = (String) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        // get current time
        Date now = new Date(System.currentTimeMillis());

        Job jobToAdd = new Job(job.getJobTitle(),
                job.getJobDescription(),
                job.getRequiredExperience(),
                job.getJobLink(),
                job.getLocation(),
                job.getCompanyName(),
                job.getApplicationDeadline(),
                currentUserEmail,
                now,
                now);

        redisTemplate.opsForZSet().add(KEY, jobToAdd, now.getTime());
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
    /**
     * TODO: improve this
     * title 或者 name 部分包含 search string 也算 match
     * case-insensitive
     */
	public LinkedHashSet<Job> getSearchJobs(String search) {
		 search = search.toLowerCase();
		 LinkedHashSet<Job> list = getAllJobs();
		 LinkedHashSet<Job> searchedJobs = new LinkedHashSet<>();
		 for(Job j:list) {
			 if(j.getJobTitle().toLowerCase().equals(search) || j.getCompanyName().toLowerCase().equals(search)) {
				 searchedJobs.add(j);
				 continue;
			 }
			 //update:包含关系的搜索结果我放后面
			 if(j.getJobTitle().toLowerCase().contains(search) || j.getCompanyName().toLowerCase().contains(search)) {
				 searchedJobs.add(j);
			 }
		 }
	     return searchedJobs;
	}
}
