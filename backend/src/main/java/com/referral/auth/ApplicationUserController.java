package com.referral.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.referral.model.Session;
import com.referral.service.SessionService;
import com.referral.utils.EmailVerificationUtils;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.List;

// the request class for registering
@NoArgsConstructor
@AllArgsConstructor
class RegisterRequest {

    @JsonProperty
    @Getter
    @Setter
    private String email;

    @JsonProperty
    @Getter
    @Setter
    private String password;

    @JsonProperty
    @Getter
    private String code;

    @JsonProperty
    @Getter
    @Setter
    private String userName;
}

// user's request to change a role (between referrer and job seeker)
@AllArgsConstructor
class ChangeRoleRequest {
    @JsonProperty("newRole")
    @Getter
    private final String newRole;

    @JsonProperty("email")
    @Getter
    private final String email;
}

@RestController
public class ApplicationUserController {

    @Autowired
    private ApplicationUserService applicationUserService;

    @Autowired
    private SessionService sessionService;

    public static final String CONFIG_PATH = "beans/SpringMail.xml";

    public static final String UTIL_NAME = "emailVerificationUtils";

    public static final int SESSION_INTERVAL = 1800;
    
    

    @GetMapping("/v1/users")
    public List<ApplicationUser> getAllUsers() {
        return applicationUserService.getAllUsers();
    }

    @PostMapping("/register")
    public ResponseEntity<String> addUser(HttpServletRequest request,
                                          @Valid @RequestBody RegisterRequest registerRequest) {
        String code = registerRequest.getCode();
        String email = registerRequest.getEmail();
        String password = registerRequest.getPassword();

        if (code == null || email == null || password == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Insufficient information");
        }

        Session existedSession = null;

        try {
            ApplicationUser user;
            if ((user = (ApplicationUser) applicationUserService.loadUserByUsername(email)) != null) {
                existedSession = sessionService.getSessionByUserEmail(user.getUsername());
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unknown server error");
        }

        // check if this email is already registered
        if (applicationUserService.loadUserByUsername(email) != null || existedSession != null) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("Email already exists");
        }

        // check if verification is incorrect
        HttpSession session = request.getSession();

        String verificationCode = (String) session.getAttribute(email);
        if (!code.equals(verificationCode)) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("Incorrect verification code");
        }

        // if all above are ok, add the user into database
        ApplicationUser newUser = new ApplicationUser(
                registerRequest.getEmail(),
                registerRequest.getPassword(),
                registerRequest.getUserName()
        );
        applicationUserService.addUser(newUser);
        return ResponseEntity.ok("User " + newUser.getUsername() + " created");
    }

    @RequestMapping(value = "/v1/send-verification", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> sendVerification(HttpServletRequest request,
                                                   HttpServletResponse response, @Valid @RequestBody RegisterRequest registerRequest) {

        // Get email from request body
        String email = registerRequest.getEmail();

        if (email == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email can not be null");
        }

        HttpSession session = request.getSession();
        response.addHeader("Set-Cookie", session.getId());

        try (ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(CONFIG_PATH)) {

            EmailVerificationUtils emailVerification = (EmailVerificationUtils) context.getBean(UTIL_NAME);

            // Generate verification code
            String code = emailVerification.generateVerificationCode();

            // Store the code in http session
            session.setAttribute(email, code);
            session.setMaxInactiveInterval(SESSION_INTERVAL);

            // Send email
            emailVerification.sendEmail(email, code);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Fail to send email due to server error");
        }

        return ResponseEntity.ok("Email sent");
    }

    // for testing purpose. No email will be sent out, the code will be logged out in console
    @RequestMapping(value = "/v1/send-verification-muted", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> sendVerificationMuted(HttpServletRequest request,
                                                   HttpServletResponse response, @Valid @RequestBody RegisterRequest registerRequest) {

        // Get email from request body
        String email = registerRequest.getEmail();

        if (email == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email can not be null");
        }

        HttpSession session = request.getSession();
        response.addHeader("Set-Cookie", session.getId());

        try (ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(CONFIG_PATH)) {

            EmailVerificationUtils emailVerification = (EmailVerificationUtils) context.getBean(UTIL_NAME);

            // Generate verification code
            String code = emailVerification.generateVerificationCode();

            // Store the code in http session
            session.setAttribute(email, code);
            session.setMaxInactiveInterval(SESSION_INTERVAL);

            System.out.println(code);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Fail to send email due to server error");
        }

        return ResponseEntity.ok("Email sent");
    }

    @PostMapping("/v1/change-role")
    public ResponseEntity<String> changeRole(@RequestBody ChangeRoleRequest changeRoleRequest) {
        // get the current currentUserEmail
        String currentUserEmail = (String) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
        String requestEmail = changeRoleRequest.getEmail();

        if (!requestEmail.equals(currentUserEmail)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You do not have permission to modify " + requestEmail);
        }

        if (applicationUserService.changeRole(currentUserEmail, changeRoleRequest.getNewRole())) {
            return ResponseEntity.ok("Changed permission to " + changeRoleRequest.getNewRole());
        }
        else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Change permission failed");
        }
    }

}
