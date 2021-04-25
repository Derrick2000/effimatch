package com.referral.auth;

import java.util.List;
import java.util.Optional;

public interface ApplicationUserDao {

    Optional<ApplicationUser> selectApplicationUserByUsername(String username);

    boolean addUser(ApplicationUser user);

    List<ApplicationUser> getApplicationUsers();

    // change the permission of a user
    boolean changeRole(String email, String newPermission);

    // a user get his own information
    ApplicationUser getOwnInformation();

    // finishes the initial settings (on boarding)
    void finishedInitialSettings();

    // finishes the tutorial
    void finishedTutorial();
}
