/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.Perfume.service;

import com.example.Perfume.api.bean.req.RegisterReq;
import com.example.Perfume.jpa.entity.User;
import com.example.Perfume.jpa.repository.UserRepository;
import java.util.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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

    public void register(RegisterReq req) {
        logger.info("Registering user: {}", req.getUsername());

        if (userRepository.existsByUserName(req.getUsername())) {
            throw new RuntimeException("Username already taken");
        }

        User user = new User();
        user.setUserName(req.getUsername());
        user.setPassword(passwordEncoder.encode(req.getPassword()));  // Encoding password
        user.setEmail(req.getEmail());
        user.setGender(req.getGender());
        user.setAuthority("0");  // Default authority
        user.setCreateDateTime(new Date());
        user.setCreateUserId("system");

        userRepository.save(user);
        logger.info("User registered successfully: {}", user.getUsername());
    }
}
