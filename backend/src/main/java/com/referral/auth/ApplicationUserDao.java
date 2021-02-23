package com.referral.auth;

import java.util.List;
import java.util.Optional;

public interface ApplicationUserDao {

    Optional<ApplicationUser> selectApplicationUserByUsername(String username);

    boolean addUser(ApplicationUser user);

    List<ApplicationUser> getApplicationUsers();
}
