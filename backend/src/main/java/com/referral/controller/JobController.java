package com.referral.controller;

import java.util.LinkedHashSet;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.referral.model.Job;
import com.referral.service.JobService;

@RestController
@RequestMapping("/v1/jobs")
public class JobController {
	
	@Autowired
	private JobService jobService;
	
	@GetMapping
    public ResponseEntity<LinkedHashSet<Job>> getAllJobs(@RequestParam(value="num", required = false) Integer num,
    													 @RequestParam(value="search", required = false) String search,
    													 @RequestParam(value="skip", required = false) Integer skip){
		try {
            LinkedHashSet<Job> allJobs = jobService.getAllJobs();
            if (search != null) allJobs = jobService.getSearchJobs(search);
            if (skip != null) allJobs = allJobs.stream().skip(skip).collect(Collectors.toCollection(LinkedHashSet::new));
            if (num != null) allJobs = allJobs.stream().limit(num).collect(Collectors.toCollection(LinkedHashSet::new));
            return ResponseEntity.ok(allJobs);
		}
        catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ROLE_USER')")
    public ResponseEntity<Job> addJob(@RequestBody Job job) {
        try {
            return ResponseEntity.ok(jobService.addJob(job));
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping(value = "/{id}")
    @PreAuthorize("hasAnyRole('ROLE_USER')")
    public ResponseEntity<String> updateJob(@PathVariable(value="id") UUID id, @RequestBody Job job) {
     	try {
            if(jobService.updateJob(id, job)) {
                return ResponseEntity.ok("Job with this id has been updated");
            }else {
            	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Update failed");
            }
        }
        catch (Exception e) {
        	e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping(value = "/{id}")
    @PreAuthorize("hasAnyRole('ROLE_USER')")
    public ResponseEntity<String> deleteJob(@PathVariable(value="id") UUID id) {
    	try {
            if(jobService.deleteJob(id)) {
                return ResponseEntity.ok("Job with this id has been deleted");
            }else {
            	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Job id doesn't exist");
            }
        }
        catch (Exception e) {
        	e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
    
    
}
