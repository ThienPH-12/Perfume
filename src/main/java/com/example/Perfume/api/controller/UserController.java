/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.Perfume.api.controller;

import com.example.Perfume.api.bean.req.UpdateUserReq;
import com.example.Perfume.api.bean.req.RegisterReq;
import com.example.Perfume.api.bean.req.ResetPassReq;
import com.example.Perfume.jpa.entity.User;
import com.example.Perfume.service.UserService;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.security.core.context.SecurityContextHolder;

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
    
    @GetMapping("/users")
    public ResponseEntity<?> UserList(){
        try{
            List<User> list =userService.UserList();
            return ResponseEntity.ok(list);
         } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body( ex.getMessage());
        }
    }
    
    @GetMapping("/user/initUserInfo")
    public ResponseEntity<?> initUserInfo() {
        try {
            User userContext = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            User user = userService.initUserInfo(userContext.getUserId());
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
            return ResponseEntity.ok(user);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error during fetching user info: " + ex.getMessage());
        }
    }

    @PostMapping("/user/updateInfo")
    public ResponseEntity<?> updateInfo(@RequestBody UpdateUserReq req) {
        try {
            User userContext = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (!userContext.getUserId().equals(req.getUserId()) && !"1".equals(userContext.getAuthority())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("Permission denied: Không được chỉnh sửa thông tin của người khác.");
            }
            String updatedToken = userService.updateUserInfo(req); // Update user info and generate new token
            return ResponseEntity.ok(Map.of(
                "message", "Thông tin người dùng đã được cập nhật thành công.",
                "token", updatedToken // Return the updated token
            ));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi trong lúc cập nhật thông tin: " + ex.getMessage());
        }
    }

    @PostMapping("/user/resendActivation")
    public ResponseEntity<?> resendActivation(@RequestParam String token) {
        try {
            userService.resendActivationEmail(token);
            return ResponseEntity.ok("Gửi mail kích hoạt thành công.");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error during resending activation email: " + ex.getMessage());
        }
    }

    @PostMapping("/user/forgotPassword")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {
        try {
            userService.sendOtpForPasswordReset(email);
            return ResponseEntity.ok("Gửi OTP thành công.");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi khi gửi OTP: " + ex.getMessage());
        }
    }

    @PostMapping("/user/resetPassword")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPassReq resetPassReq) {
        try {
            userService.resetPassword(resetPassReq);
            return ResponseEntity.ok("Mật khẩu đã được thay đổi.");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi: " + ex.getMessage());
        }
    }
}
