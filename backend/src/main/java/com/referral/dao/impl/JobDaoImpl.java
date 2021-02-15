package com.referral.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

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
    public List<Job> getAllJobs() {

    	List<Job> list = (List) redisTemplate.opsForHash().values(KEY);
    	list.sort((a, b) -> {
			if (a.getCreatedTime().compareTo(b.getCreatedTime()) == 0) return 0;
			else return (a.getCreatedTime().compareTo(b.getCreatedTime()) > 0) ? -1 : 1;
		});
    	return list;
    }

    @Override
    public List<Job> getSomeJobs(Integer num){
    	List<Job> fullList = getAllJobs();
    	List<Job> someList = new ArrayList<>();
    	if(num == 0) {
    		return someList;
    	}
    	for(int i = 0; i < num; ++i) {
    		someList.add(fullList.get(i));
    	}
    	return someList;
    	
    }
    @Override
    public Job addJob(Job job) {

        // get the current currentUserEmail
        String currentUserEmail = (String) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
       
        Date now = new Date(System.currentTimeMillis());
        Job jobToAdd = new Job(job.getJobTitle(), currentUserEmail, job.getCompanyName(),now,now);
        redisTemplate.opsForHash().put(KEY, job.getId(), jobToAdd);
        return jobToAdd;
    }

    @Override
    public Job findJobById(UUID id) {
    	List<Job> list = (List) redisTemplate.opsForHash().values(KEY);
    	for(Job j:list) {
    		if(j.getId().equals(id) ) {
    			return j;
    		}
    	}
    	return null;	//这边可能要throw exception 吧,还是我们可以保证update是在确认job存在的情况下执行。

    }
	@Override
	public boolean updateJob(UUID id, Job job) {
		Job newJob = findJobById(id);
		if(newJob == null) {
			return false;
		}
		if(job.getJobTitle() != null) {
			newJob.setJobTitle(job.getJobTitle());
		}
		Date modifiedTime = new Date(System.currentTimeMillis());
		newJob.setModifiedTime(modifiedTime);
		if(deleteJob(id) == false) {
			return false;
		}
		redisTemplate.opsForHash().put(KEY, id, newJob);
		return true; 
	}

	@Override
	public boolean deleteJob(UUID id) {
		List<Job> before = getAllJobs();
//		for(Job j:before) {
//			System.out.println(j.getId());
//		}
		redisTemplate.opsForHash().delete(KEY, id);
		List<Job> after = getAllJobs();
//		System.out.println();
//
//		for(Job j:after) {
//			System.out.println(j.getId());
//		}
		if(before.size() == after.size()) {
			return false;
		}
		return true;
	}
	
	
}
