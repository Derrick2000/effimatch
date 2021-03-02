package com.referral.service;

import com.referral.auth.ApplicationUser;
import com.referral.auth.ApplicationUserDao;
import com.referral.dao.SessionDao;
import com.referral.model.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;

import static com.referral.model.Session.TOKEN_EXPIRES_TIME;

@Service
public class SessionService {
    @Autowired
    private SessionDao sessionDao;

    @Autowired
    private ApplicationUserDao applicationUserDao;

    public Session createToken(String userEmail) {

        String token = UUID.randomUUID().toString().replace("-", "");

        while (checkTokenExists(token)) {
            token = UUID.randomUUID().toString().replace("-", "");
        }
        Session session = new Session(userEmail, token);

        sessionDao.addSession(session);
        return session;
    }

    public ApplicationUser getUserByToken(String token) {
        if (token == null || token.length() == 0) {
            return null;
        }
        Session currSession = sessionDao.getSessionByToken(token);
        if (currSession == null) {
            return null;
        }
        Optional<ApplicationUser> currUser = applicationUserDao.selectApplicationUserByUsername(currSession.getUserEmail());
        if (currUser.isEmpty()) {
            return null;
        }
        currSession.setExpiredBy(new Date(new Date().getTime() + TOKEN_EXPIRES_TIME));
        sessionDao.updateSession(currSession);
        return currUser.get();
    }

    public Session getSessionByUserEmail(String userEmail) {
        return sessionDao.getSessionByUserEmail(userEmail);
    }

    public Session getSessionByToken(String token) {
        return sessionDao.getSessionByToken(token);
    }

    public boolean deleteToken(String token) {
        // TODO Auto-generated method stub
        if (token == null || token.length() == 0) {
            return false;
        }
        Session session = sessionDao.getSessionByToken(token);
        sessionDao.deleteSession(session);
        return true;
    }

    public boolean checkTokenExists(String token) {
        if (token == null || token.length() == 0) {
            return false;
        }
        return sessionDao.getSessionByToken(token) != null;
    }
}
