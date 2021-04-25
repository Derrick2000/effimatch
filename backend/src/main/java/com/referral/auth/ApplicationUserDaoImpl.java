package com.referral.auth;

import com.amazonaws.services.cognitoidp.model.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import static com.referral.security.ApplicationUserRole.*;

@Repository("redis")
public class ApplicationUserDaoImpl implements ApplicationUserDao {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    private static final String KEY = "USERS";

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public ApplicationUserDaoImpl(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Optional<ApplicationUser> selectApplicationUserByUsername(String username) {
        return getApplicationUsers()
                .stream()
                .filter(applicationUser -> username.equals(applicationUser.getUsername()))
                .findFirst();
    }

    @Override
    public boolean addUser(ApplicationUser user) {
        ApplicationUser userWithThisEmail = (ApplicationUser) redisTemplate.opsForHash().get(KEY, user.getUsername());
        if (userWithThisEmail != null) return false;

        ApplicationUser newUser = new ApplicationUser(
                user.getUsername(),
                passwordEncoder.encode(user.getPassword()),
                user.getNickname(),
//                USER.getGrantedAuthorities(),
                null, // the default roles and authorities for a user is null. The user has to choose a role on 'onBoarding' page
                true,
                true,
                true,
                true
        );
        redisTemplate.opsForHash().put(KEY, user.getUsername(), newUser);
        return true;
    }

    @Override
    public List<ApplicationUser> getApplicationUsers() {
        return (List) redisTemplate.opsForHash().values(KEY);
    }

    @Override
    public boolean changeRole(String email, String newPermission) {
        Optional<ApplicationUser> theUser = selectApplicationUserByUsername(email);

        // if no user with this email
        if (theUser.isEmpty()) return false;

        switch(newPermission) {
            case "JS":
                theUser.get().setGrantedAuthorities(JS.getGrantedAuthorities());
                break;
            case "R":
                theUser.get().setGrantedAuthorities(R.getGrantedAuthorities());
                addUser(theUser.get());
                break;
            default:
                return false;
        }

        redisTemplate.opsForHash().put(KEY, theUser.get().getUsername(), theUser.get());
        return true;
    }

    @Override
    public ApplicationUser getOwnInformation() {
        // get the current currentUserEmail
        String currentUserEmail = (String) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        Optional<ApplicationUser> user = selectApplicationUserByUsername(currentUserEmail);
        // not sending password to the client
        user.get().setPassword("");
        return user.get();
    }

    @Override
    public void finishedInitialSettings() {
        // get the current currentUserEmail
        String currentUserEmail = (String) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
        ApplicationUser user = selectApplicationUserByUsername(currentUserEmail).get();

        user.setFinishedInitialSettings(true);
        redisTemplate.opsForHash().put(KEY, user.getUsername(), user);
    }

    @Override
    public void finishedTutorial() {
        // get the current currentUserEmail
        String currentUserEmail = (String) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
        ApplicationUser user = selectApplicationUserByUsername(currentUserEmail).get();

        user.setFinishedTutorial(true);
        redisTemplate.opsForHash().put(KEY, user.getUsername(), user);
    }
}
