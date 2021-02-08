package com.referral.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.referral.dao.CompanyDao;
import com.referral.model.Company;

@Service
public class CompanyService {
	@Autowired
	private CompanyDao companyDao;
	
	public List<Company> getAllCompanies(){
		return companyDao.getAllCompanies();
	}
	
	public boolean addCompany(Company company) {
		return companyDao.addCompany(company);
	}
}
