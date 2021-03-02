package com.referral.dao;


import com.referral.model.Session;

public interface SessionDao {

    void addSession(Session token);

    Session getSessionByToken(String token);

    Session getSessionByUserEmail(String email);

    void updateSession(Session currSession);

    void deleteSession(Session token);
}

