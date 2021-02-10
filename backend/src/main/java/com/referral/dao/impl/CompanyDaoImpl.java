package com.referral.dao.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import com.referral.dao.CompanyDao;
import com.referral.model.Company;

@Repository
public class CompanyDaoImpl implements CompanyDao {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    private static final String KEY = "Companies";

    @Override
    public List<Company> getAllCompanies() {
        return (List) redisTemplate.opsForHash().values(KEY);
    }

    @Override
    public boolean addCompany(Company company) {

        String companyName = company.getCompanyName();

        // TODO: 去掉不必要的 print
        Company companyWithThisName = (Company) redisTemplate.opsForHash().get(KEY, company.getCompanyName());
        if(companyWithThisName != null) {
            return false;
        }
        Company newCompany = new Company(company.getCompanyName(),company.getLogoUrl());
        redisTemplate.opsForHash().put(KEY, newCompany.getCompanyName(),newCompany);
        return true;
    }

}
