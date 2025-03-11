/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.Perfume.api.controller;

import com.example.Perfume.api.bean.req.AuthenticationReq;
import com.example.Perfume.api.bean.req.EmailReq;
import com.example.Perfume.api.bean.req.LogoutReq;
import com.example.Perfume.api.bean.req.RefreshReq;
import com.example.Perfume.api.bean.res.AuthenticationRes;
import com.example.Perfume.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author badao
 */
@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private JavaMailSender javaMailSender;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationRes> login(@RequestBody AuthenticationReq req) {
        try {
            AuthenticationRes response = authenticationService.login(req);
            return ResponseEntity.ok(response);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthenticationRes("Bearer", "", "", "", "Authentication failed", "", ""));
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthenticationRes> refresh(@RequestBody RefreshReq req) {
        try {
            AuthenticationRes response = authenticationService.refreshToken(req);
            return ResponseEntity.ok(response);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthenticationRes("Bearer", "", "", "", "Authentication failed", "", ""));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody LogoutReq req) {
        try {
            authenticationService.logout(req);
            return ResponseEntity.ok("Logged out successfully");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error during logout: " + ex.getMessage());
        }
    }

    @PostMapping("/send-email")
    public ResponseEntity<?> sendEmail(@RequestBody EmailReq req) {

        try {
            
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setTo(req.getTo());
            simpleMailMessage.setSubject(req.getSubject());
            simpleMailMessage.setText(req.getText());

            javaMailSender.send(simpleMailMessage);
            return ResponseEntity.ok("Email sent successfully!");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error during sendmail: " + ex.getMessage());
        }
    }
}
