/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.Perfume.service;

import com.example.Perfume.am.OtpService;
import com.example.Perfume.api.bean.req.RegisterReq;
import com.example.Perfume.jpa.entity.User;
import com.example.Perfume.jpa.repository.UserRepository;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

    private OtpService otpService;

    @Autowired
    private JavaMailSender javaMailSender;

    private Map<String, String> otpStorage = new HashMap<>();
    private Map<String, Long> otpExpiry = new HashMap<>();

    public void register(RegisterReq req) {
        logger.info("Registering user: {}", req.getUsername());

        if (userRepository.existsByUserName(req.getUsername())) {
            throw new RuntimeException("Username already taken");
        }

        String otp = otpService.generateOtp();
        otpStorage.put(req.getEmail(), otp);
        otpExpiry.put(req.getEmail(), System.currentTimeMillis() + 60000); // 1 minute expiry

        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(req.getEmail());
        simpleMailMessage.setSubject("Your OTP Code");
        simpleMailMessage.setText("Your OTP code is: " + otp);

        javaMailSender.send(simpleMailMessage);
    }

    public boolean verifyOtp(String email, String otp) {
        if (otpStorage.containsKey(email) && otpStorage.get(email).equals(otp)) {
            if (System.currentTimeMillis() <= otpExpiry.get(email)) {
                otpStorage.remove(email);
                otpExpiry.remove(email);
                return true;
            }
        }
        return false;
    }

    public void saveUser(RegisterReq req) {
        User user = new User();
        user.setUserName(req.getUsername());
        user.setPassword(passwordEncoder.encode(req.getPassword()));  // Encoding password
        user.setEmail(req.getEmail());
        user.setGender(req.getGender());
        user.setAuthority("0");  // Default authority
        user.setCreateDateTime(new Date());
        user.setCreateUserName("system");

        userRepository.save(user);
        logger.info("User registered successfully: {}", user.getUsername());
    }

    public User findByUsername(String username) {
        return userRepository.findByUserName(username);
    }
}
