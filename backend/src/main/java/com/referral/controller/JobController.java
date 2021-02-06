package com.referral.controller;

import java.util.List;
import java.util.UUID;

import com.referral.model.Company;
import com.referral.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.referral.model.Job;
import com.referral.service.JobService;

@RestController
@RequestMapping("/v1/jobs")
public class JobController {
	
	@Autowired
	private JobService jobService;
	
	@GetMapping
    public ResponseEntity<List<Job>> getAllJobs() {
        try {
            return ResponseEntity.ok(jobService.getAllJobs());
        }
        catch (Exception e) {
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
}
