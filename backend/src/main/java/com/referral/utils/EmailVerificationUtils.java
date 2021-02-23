package com.referral.utils;

import com.referral.BackendApplication;
import lombok.NoArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;
import java.util.Random;

@NoArgsConstructor
public class EmailVerificationUtils {

    private MailSender mailSender;
    private static final int VERIFICATION_CODE_LENGTH = 6;
    private static final int VERIFICATION_CODE_RANGE = 10;

    public void setMailSender(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendEmail(String dst, String code) {

        if (mailSender == null) {
            // Log warnings
            return;
        }

        SimpleMailMessage message = new SimpleMailMessage();

        // needs to be changed for future works
        String emailFrom = "William@dekun.me";

        String msg = "Your verification code is: " + code + "\n This code will expire in 30 minutes.";
        String subject = "[EffiMatch] Registration verification code";

        message.setFrom(emailFrom);
        message.setTo(dst);
        message.setSubject(subject);
        message.setText(msg);

        mailSender.send(message);
    }

    public String generateVerificationCode() {

        StringBuilder str = new StringBuilder();
        Random random = new Random();

        for (int i = 0; i < VERIFICATION_CODE_LENGTH; i++) {
            str.append(random.nextInt(VERIFICATION_CODE_RANGE));
        }

        return str.toString();
    }

//    private String getEmailFrom() {
//
//        Properties prop = new Properties();
//        String config_path = Thread.currentThread().getContextClassLoader().getResource("config.properties").getPath();
//
//        try {
//            prop.load(new FileInputStream(config_path));
//            return prop.getProperty("email");
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//        return null;
//    }
}

