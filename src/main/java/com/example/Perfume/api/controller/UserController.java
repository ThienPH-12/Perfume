/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.Perfume.api.controller;

import com.example.Perfume.api.bean.req.RegisterReq;
import com.example.Perfume.jpa.entity.User;
import com.example.Perfume.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author badao
 * 
 */
@RestController
@RequestMapping("/api")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/user/register")
    public ResponseEntity<?> register(@RequestBody RegisterReq req) {
        try {
            String token = userService.register(req);
            return ResponseEntity.ok("User registered successfully. Activation email sent. Token: " + token);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body( ex.getMessage());
        }
    }

    @PostMapping("/user/activateUser")
    public ResponseEntity<?> activateUser(@RequestParam String token) {
        try {
            String result = userService.activateUser(token);
            return ResponseEntity.ok(result);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi trong lúc xác nhận: " + ex.getMessage());
        }
    }
    
    @GetMapping("/user/initUserInfo")
    public ResponseEntity<?> initUserInfo(@RequestParam String username) {
        try {
            User user = userService.findByUsername(username);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
            return ResponseEntity.ok(user);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error during fetching user info: " + ex.getMessage());
        }
    }

    @PostMapping("/user/resendActivation")
    public ResponseEntity<?> resendActivation(@RequestParam String token) {
        try {
            userService.resendActivationEmail(token);
            return ResponseEntity.ok("Activation email resent successfully.");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error during resending activation email: " + ex.getMessage());
        }
    }
}
