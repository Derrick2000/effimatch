package com.referral.controller;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.UUID;

import com.referral.model.Company;
import com.referral.service.CompanyService;
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
import org.springframework.web.bind.annotation.RequestMethod;
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
//        try {
//        	if(num != null) {
//        		return ResponseEntity.ok(jobService.getSomeJobs(num));
//        	}else {
//                return ResponseEntity.ok(jobService.getAllJobs());
//        	}
//        }
		try {
			if(skip != null) {
				return ResponseEntity.ok(jobService.getSkipJobs(skip));
			}else if(search != null){
				if(num == null) {
					return ResponseEntity.ok(jobService.getSearchJobs(search));
				}else {
					return ResponseEntity.ok(jobService.getSearchWithNumJobs(search,num));
				}
			}else if(num != null){
				return ResponseEntity.ok(jobService.getSomeJobs(num));
			}else {
				return ResponseEntity.ok(jobService.getAllJobs());
			}
		}
        catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
	
//	@GetMapping
//	public ResponseEntity<LinkedHashSet<Job>> getAllJobs(@RequestParam(value="num", required = false) Integer num){
//													
//	    try {
//	    	if(num != null) {
//	    		return ResponseEntity.ok(jobService.getSomeJobs(num));
//	    	}else {
//	            return ResponseEntity.ok(jobService.getAllJobs());
//	    	}
//	    }
//	    catch (Exception e) {
//	        System.out.println(e.getMessage());
//	        return ResponseEntity.badRequest().build();
//	    }
//	}

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
    public ResponseEntity<String> UpdateJob(@PathVariable(value="id") UUID id, @RequestBody Job job) {
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
    public ResponseEntity<String> DeleteJob(@PathVariable(value="id") UUID id) {
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
