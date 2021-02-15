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
        return (LinkedHashSet<Job>) (LinkedHashSet) redisTemplate.opsForZSet().range(KEY, 0, -1);
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
        Job jobToAdd = new Job(job.getJobTitle(), currentUserEmail, job.getCompanyName(), now, now);
        redisTemplate.opsForZSet().add(KEY, jobToAdd, jobToAdd.getCreatedTime().getTime());
        return jobToAdd;
    }

    @Override
    public Job findJobById(UUID id) {
        //这边可能要throw exception 吧,还是我们可以保证update是在确认job存在的情况下执行。: 可以throw exception
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
        if (job.getJobTitle() != null) {
            newJob.setJobTitle(job.getJobTitle());
        }
        Date modifiedTime = new Date(System.currentTimeMillis());
        newJob.setModifiedTime(modifiedTime);
        if (deleteJob(id) == false) {
            return false;
        }
        redisTemplate.opsForHash().put(KEY, id, newJob);
        return true;
    }

    @Override
    public boolean deleteJob(UUID id) {
        var toDelete = findJobById(id);

        // if remove failed, removed == 0
        Long removed = redisTemplate.opsForZSet().remove(KEY, 1, toDelete);

        return removed != null && removed != 0;
    }
}
