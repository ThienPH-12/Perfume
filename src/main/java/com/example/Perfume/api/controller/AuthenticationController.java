/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.Perfume.api.controller;

import com.example.Perfume.api.bean.req.AuthenticationReq;
import com.example.Perfume.api.bean.req.LogoutReq;
import com.example.Perfume.api.bean.req.RefreshReq;
import com.example.Perfume.api.bean.res.AuthenticationRes;
import com.example.Perfume.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author badao
 */
@RestController
@RequestMapping("/api")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private JavaMailSender javaMailSender;

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationReq req) {
        try {
            AuthenticationRes response = authenticationService.login(req);
            return ResponseEntity.ok(response);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ex.getMessage()); // Changed from getEmail to getUsername
        }
    }

    @PostMapping("/auth/refresh")
    public ResponseEntity<?> refresh(@RequestBody RefreshReq req) {
        try {
            AuthenticationRes response = authenticationService.refreshToken(req);
            return ResponseEntity.ok(response);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ex.getMessage());
        }
    }

    @PostMapping("/auth/logout")
    public ResponseEntity<?> logout(@RequestBody LogoutReq req) {
        try {
            authenticationService.logout(req);
            return ResponseEntity.ok("Logged out successfully");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error during logout: " + ex.getMessage());
        }
    }
    
}
