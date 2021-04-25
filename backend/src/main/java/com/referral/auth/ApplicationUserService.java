package com.referral.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationUserService implements UserDetailsService {

    private final ApplicationUserDao applicationUserDao;

    @Autowired
    public ApplicationUserService(@Qualifier("redis") ApplicationUserDao applicationUserDao) {
        this.applicationUserDao = applicationUserDao;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return applicationUserDao
                .selectApplicationUserByUsername(username)
                .orElse(null);
    }

    public boolean addUser(ApplicationUser user) {
        return applicationUserDao.addUser(user);
    }

    public List<ApplicationUser> getAllUsers() {
        return applicationUserDao.getApplicationUsers();
    }

    public boolean changeRole(String email, String newRole) {
        return applicationUserDao.changeRole(email, newRole);
    }

    public ApplicationUser getOwnInformation() {
        return applicationUserDao.getOwnInformation();
    }

    public void finishedTutorial() {
        applicationUserDao.finishedTutorial();
    }

    public void finishedInitialSettings() {
        applicationUserDao.finishedInitialSettings();
    }
}
