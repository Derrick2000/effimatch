package com.referral.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/users")
public class ApplicationUserController {

    @Autowired
    private ApplicationUserService applicationUserService;

    @PostMapping
    public ResponseEntity<String> addUser(@RequestBody ApplicationUser user) {
        try {
            if (applicationUserService.addUser(user))
                return ResponseEntity.ok("User " + user.getUsername() + " created");
            else return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User " + user.getUsername() + " already exist");
        }
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
}
