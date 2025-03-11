/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.Perfume.api.controller;

import com.example.Perfume.api.bean.req.OtpReq;
import com.example.Perfume.api.bean.req.RegisterReq;
import com.example.Perfume.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;

/**
 *
 * @author badao
 * 
 */
@RestController
@RequestMapping("/api/user")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterReq req) {
        try {
            userService.register(req);
            return ResponseEntity.ok("OTP sent to email");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error during registration: " + ex.getMessage());
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody OtpReq req) {
        if (userService.verifyOtp(req.getEmail(), req.getOtp())) {
            return ResponseEntity.ok("OTP verified");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired OTP");
        }
    }

    @PostMapping("/save-user")
    public ResponseEntity<?> saveUser(@RequestBody RegisterReq req) {
        try {
            userService.saveUser(req);
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error during saving user: " + ex.getMessage());
        }
    }
    
    @GetMapping("/initUserInfo")
    public ResponseEntity<?> initUserInfo(@RequestBody RegisterReq registerRequest) {
//        try {
//            userService.register(registerRequest);
            return ResponseEntity.ok("User do what successfully");
//        } catch (Exception ex) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("Error during registration: " + ex.getMessage());
//        }
    }
}
