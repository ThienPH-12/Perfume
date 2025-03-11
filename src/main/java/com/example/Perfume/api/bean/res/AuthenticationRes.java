package com.example.Perfume.api.bean.res;

public class AuthenticationRes {

    private String tokenType;    // "Bearer"
    private String id;           // User's ID
    private String username;     // User's username
    private String authority;    // User's authority (e.g., role)
    private String message;      // Any custom message (e.g., login success)
    private String accessToken;  // Access token
    private String refreshToken; // Refresh token

    public AuthenticationRes() {
    }

    public AuthenticationRes(String tokenType, String id, String username, String authority, String message, String accessToken, String refreshToken) {
        this.tokenType = tokenType;
        this.id = id;
        this.username = username;
        this.authority = authority;
        this.message = message;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    // Getters and setters
    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
