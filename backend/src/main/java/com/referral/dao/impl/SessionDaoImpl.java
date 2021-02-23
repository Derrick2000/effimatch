package com.referral.dao.impl;

import com.referral.dao.SessionDao;
import com.referral.model.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SessionDaoImpl implements SessionDao {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    private static final String KEY = "Sessions";

    @Override
    public void addSession(Session session) {
        Session existedSession = session.getUserEmail() == null ?
                getSessionByToken(session.getToken()) : getSessionByUserEmail(session.getUserEmail());
        if (existedSession != null) deleteSession(existedSession);
        else redisTemplate.opsForSet().add(KEY, session);
    }

    @Override
    public Session getSessionByToken(String token) {
        List<Session> allSessions = (List) redisTemplate.opsForHash().values(KEY);
        return allSessions.stream()
                .filter(s -> s.getToken().equals(token))
                .findAny()
                .orElse(null);
    }

    @Override
    public Session getSessionByUserEmail(String userEmail) {
        return (Session) redisTemplate.opsForHash().get(KEY, userEmail);
    }

    @Override
    public void updateSession(Session currSession) {
        Session session = getSessionByUserEmail(currSession.getUserEmail());
        session.setExpiredBy(currSession.getExpiredBy());
        redisTemplate.opsForHash().put(KEY, session.getUserEmail(), session);
    }

    @Override
    public void deleteSession(Session session) {
        redisTemplate.opsForHash().delete(KEY, session.getUserEmail());
    }
}
