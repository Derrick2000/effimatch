package com.referral.service;

import com.referral.dao.TestDao;
import com.referral.model.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestService {

    @Autowired
    private TestDao testDao;

    public List<Test> getAllTests() {
        return testDao.getAllTests();
    }

    public Test addTest(Test test) {
            return testDao.addTest(test);
    }
}
