package com.referral.dao;

import com.referral.model.Test;

import java.util.List;

public interface TestDao {

    List<Test> getAllTests();

    Test addTest(Test test);
}
