package com.referral.dao;

import java.util.List;

import com.referral.model.Company;

public interface CompanyDao {
	
	List<Company> getAllCompanies();
	
	boolean addCompany(Company company);
	//Company addCompany(Company company);
}
