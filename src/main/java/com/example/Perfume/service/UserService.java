/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.Perfume.service;

import static com.example.Perfume.am.OtpService.generateOtp;
import com.example.Perfume.api.bean.req.RegisterReq;
import com.example.Perfume.jpa.entity.User;
import com.example.Perfume.jpa.repository.UserRepository;
import java.util.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.regex.Pattern;

/**
 *
 * @author badao
 */
@Service
public class UserService {

    private final Logger logger = LoggerFactory.getLogger(UserDetailsServiceImpl.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender javaMailSender;

    public String sendOtp(RegisterReq req) {
        logger.info("Registering user: {}", req.getUsername());

        CheckRegister(req);

        String otp = generateOtp();

        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(req.getEmail());
        simpleMailMessage.setSubject("Your OTP Code");
        simpleMailMessage.setText("Your OTP code is: " + otp);

        javaMailSender.send(simpleMailMessage);
        return otp;
    }

    public void saveUser(RegisterReq req) {
        CheckRegister(req);

        User user = new User();
        user.setUserName(req.getUsername());
        user.setPassword(passwordEncoder.encode(req.getPassword()));  // Encoding password
        user.setEmail(req.getEmail());
        user.setGender(req.getGender());
        user.setAuthority("0");  // Default authority
        user.setCreateDateTime(new Date(System.currentTimeMillis()));
        user.setCreateUserId("system");

        userRepository.save(user);
        logger.info("User registered successfully: {}", user.getUsername());
    }

    public User findByUsername(String username) {
        return userRepository.findByUserName(username);
    }

    public boolean isValidEmail(String email) {
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        return Pattern.compile(emailRegex).matcher(email).matches();
    }

    public boolean CheckRegister(RegisterReq req) {
        boolean validate = true;
        if (!isValidEmail(req.getEmail())) {
            logger.info("Email not valid", req.getEmail());
            validate = false;
            return validate;
        }
        if (userRepository.existsByUserName(req.getUsername())) {
            logger.info("Username existed", req.getUsername());
            validate = false;
            return validate;
        }
        if (userRepository.existsByEmail(req.getEmail())) {
            logger.info("Email existed", req.getEmail());
            validate = false;
            return validate;
        }
        return validate;
    }
}
