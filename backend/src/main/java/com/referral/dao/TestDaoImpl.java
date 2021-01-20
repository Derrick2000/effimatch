package com.referral.dao;

import com.referral.model.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class TestDaoImpl implements TestDao{

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    private static final String KEY = "TEST";

    @Override
    public List<Test> getAllTests() {
        return (List) redisTemplate.opsForHash().values(KEY);
    }

    @Override
    public Test addTest(Test test) {
        Test newTest = new Test(test.getTitle(), test.getContent());
        redisTemplate.opsForHash().put(KEY, newTest.getId(), newTest);
        return newTest;
    }
}
