package com.referral.dao.impl;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
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
    	List<Job> list = (List) redisTemplate.opsForHash().values(KEY);
    	list.sort((a, b) -> {
			if (a.getCreatedTime().isEqual(b.getCreatedTime())) return 0;
			else return a.getCreatedTime().isBefore(b.getCreatedTime()) ? -1 : 1;
		});
    	return list;
//    	List<LocalDateTime> time = new ArrayList<>();
//    	List<Job> answerList = new ArrayList<>();
//    	for(Job t:list) {
//    		time.add(t.getCreatedTime());
//    	}
//    	Collections.sort(time);	//根据时间排序
//    	int pos = 0;
//    	while(time.get(pos) != null) {
//    		for(Job jb: list) {
//    			if(time.get(pos) == jb.getCreatedTime()) {
//    				answerList.add(jb);
//    			}
//    		}
//    		pos++;
//    	}
//        return answerList;
    }

    @Override
    public Job addJob(Job job) {

        // get the current currentUserEmail
        String currentUserEmail = (String) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
        

        LocalDateTime now = LocalDateTime.now();
       // DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
      //  String now = time.format(myFormatObj);
      //  System.out.println(now);

        Job jobToAdd = new Job(job.getJobTitle(), currentUserEmail, job.getCompanyName(),now,now);

        redisTemplate.opsForHash().put(KEY, job.getId(), jobToAdd);
        return jobToAdd;
    }
}
