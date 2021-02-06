package com.referral.dao.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.context.SecurityContextHolder;
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
    public Job addJob(Job job) {

        // get the current username
        String currentUserName = (String) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        Job jobToAdd = new Job(job.getJobTitle(), currentUserName, job.getCompanyName());
        redisTemplate.opsForHash().put(KEY, job.getId(), jobToAdd);
        return jobToAdd;
    }
}
