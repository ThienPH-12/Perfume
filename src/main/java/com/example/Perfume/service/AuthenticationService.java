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
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;

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
            User user = userDAO.findByUserName(req.getUsername()); // Changed from findByEmail to findByUserName
            if (user == null) {
                throw new RuntimeException("không tồn tại tên người dùng " + req.getUsername());
            }
            if (!"Activated".equals(user.getActivation())) {
                throw new RuntimeException("Tài khoản này chưa được kích hoạt!");
            }
            try {
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword())
                );
            } catch (AuthenticationException e) {
                throw new RuntimeException("Sai mật khẩu");
            }
            String accessToken = jwtUtil.generateToken(user);
            String refreshToken = jwtUtil.generateRefreshToken(user);
            return new AuthenticationRes(
                    "Bearer",
                    user.getUserId().toString(),
                    user.getUsername(), // Changed from getEmail to getUsername
                    user.getAuthority(),
                    "Login successful",
                    accessToken,
                    refreshToken
            );
        } catch (AuthenticationException e) {
            logger.error("Authentication failed for username: {}. Reason: {}", req.getUsername(), e.getMessage()); // Changed from getEmail to getUsername
            throw new RuntimeException(e.getMessage());
        }
    }

    @Transactional
    public void logout(LogoutReq req) {
        try {
            if (jwtUtil.isTokenExpired(req.getToken())) {
                logger.info("Token {} is already expired and deleted. Logging out immediately.", req.getToken());
            } else {
                jwtUtil.invalidateToken(req.getToken());
                logger.info("User with token {} logged out successfully.", req.getToken());
            }
            SecurityContextHolder.clearContext();
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
                // Invalidate the old access token
                jwtUtil.invalidateToken(req.getOldAccessToken());
            }
            return response;
        } catch (AuthenticationException e) {
            logger.error("Authentication failed. Reason: {}", e.getMessage());
            throw new RuntimeException("Authentication failed", e);
        }
    }

    public boolean checkAuth() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication != null && authentication.isAuthenticated();
    }
}
