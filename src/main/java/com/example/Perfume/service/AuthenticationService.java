/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.Perfume.service;

/**
 *
 * @author badao
 */
import com.example.Perfume.am.JwtUtil;
import com.example.Perfume.api.bean.req.AuthenticationReq;
import com.example.Perfume.api.bean.req.LogoutReq;
import com.example.Perfume.api.bean.req.RefreshReq;
import com.example.Perfume.api.bean.res.AuthenticationRes;
import com.example.Perfume.jpa.entity.User;
import com.example.Perfume.jpa.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class AuthenticationService {

    private final Logger logger = LoggerFactory.getLogger(AuthenticationService.class);
    private final UserRepository userDAO;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @Autowired
    public AuthenticationService(UserRepository userRepository,
            AuthenticationManager authenticationManager,
            JwtUtil jwtUtil) {
        this.userDAO = userRepository;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    public AuthenticationRes login(AuthenticationReq req) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword())
            );
            User user = userDAO.findByUserName(req.getUsername());
            String accessToken = jwtUtil.generateToken(user);
            String refreshToken = jwtUtil.generateRefreshToken(user);
            return new AuthenticationRes(
                    "Bearer", // Token type
                    user.getUserId().toString(), // User ID (assuming User has an ID field)
                    user.getUsername(), // Username
                    user.getAuthority(), // User authority
                    "Login successful", // Message
                    accessToken, // Access token
                    refreshToken // Refresh token
            );
        } catch (AuthenticationException e) {
            logger.error("Authentication failed for user: {}. Reason: {}", req.getUsername(), e.getMessage());
            throw new RuntimeException("Authentication failed", e);
        }
    }

    public void logout(LogoutReq req) {
        try {
            logger.info("User with token {} logged out successfully.", req);
        } catch (Exception e) {
            logger.error("Logout failed. Reason: {}", e.getMessage());
            throw new RuntimeException("Logout failed", e);
        }
    }

    public AuthenticationRes refreshToken(RefreshReq req) {
        AuthenticationRes response = new AuthenticationRes();
        try {
            String userName = jwtUtil.extractUsername(req.getOldRefreshToken());
            User user = userDAO.findByUserName(userName);
            if (jwtUtil.isTokenValid(req.getOldRefreshToken(), user.getUsername())) {
                var jwt = jwtUtil.generateToken(user);
                response.setTokenType("Bearer");
                response.setUsername(user.getUsername());
                response.setAuthority(user.getAuthority());
                response.setMessage("Successfully Refreshed Token");
                  response.setAccessToken(jwt);
                response.setRefreshToken(req.getOldRefreshToken());
            }
            return response;
        } catch (AuthenticationException e) {
            logger.error("Authentication failed. Reason: {}", e.getMessage());
            throw new RuntimeException("Authentication failed", e);
        }
    }
}
