package com.referral.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
//   @PreAuthorize("hasAuthority('test:write')")
   public ResponseEntity<Job> addTest1(String jobTitle, UUID companyId, String publisherEmail) {
       try {
           return ResponseEntity.ok(jobService.addJob1(jobTitle,companyId,publisherEmail));
       }
       catch (Exception e) {
           return ResponseEntity.badRequest().build();
       }
   }
	 
	 //@PostMapping
//   @PreAuthorize("hasAuthority('test:write')")
   public ResponseEntity<Job> addTest2(String jobTitle, String companyName, String logoUrl, String publisherEmail) {
       try {
           return ResponseEntity.ok(jobService.addJob2(jobTitle,companyName,logoUrl,publisherEmail));
       }
       catch (Exception e) {
           return ResponseEntity.badRequest().build();
       }
   }
	
}
