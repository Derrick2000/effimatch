package com.referral.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.referral.model.Company;
import com.referral.service.CompanyService;

@RestController
@RequestMapping("/v1/companies")
public class CompanyController {

	@Autowired
	private CompanyService companyService;
	
	 @GetMapping
	    public ResponseEntity<List<Company>> getAllCompanies() {
	        try {
	            return ResponseEntity.ok(companyService.getAllCompanies());
	        }
	        catch (Exception e) {
	            return ResponseEntity.badRequest().build();
	        }
	    }

	    @PostMapping
//	    @PreAuthorize("hasAuthority('test:write')")
	    public ResponseEntity<String> addCompany(@RequestBody Company company) {
	    	 try {
	             if (companyService.addCompany(company)) {
	         //   	 System.out.println("true");
	                 return ResponseEntity.ok("Company " + company.getCompanyName() + " created");
	             }else return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User " + company.getCompanyName() + " already exist");
	         }
	         catch (Exception e) {
	             e.printStackTrace();
	             return ResponseEntity.badRequest().build();
	         
	        }
	    }
}
