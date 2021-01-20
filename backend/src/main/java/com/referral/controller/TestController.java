package com.referral.controller;

import com.referral.model.Test;
import com.referral.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/tests")
public class TestController {

    @Autowired
    private TestService testService;

    @GetMapping
    public ResponseEntity<List<Test>> getAllTests() {
        try {
            return ResponseEntity.ok(testService.getAllTests());
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping
//    @PreAuthorize("hasAuthority('test:write')")
    public ResponseEntity<Test> addTest(@RequestBody Test test) {
        try {
            return ResponseEntity.ok(testService.addTest(test));
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
