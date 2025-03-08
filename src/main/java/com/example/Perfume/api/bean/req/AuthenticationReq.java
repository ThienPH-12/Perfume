package com.example.Perfume.api.bean.req;

public class AuthenticationReq {
    private String username;
    private String password;

    // Getters and setters

    public AuthenticationReq() {
    }

    public AuthenticationReq(String username, String Password) {
        this.username = username;
        this.password = Password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


  
}
