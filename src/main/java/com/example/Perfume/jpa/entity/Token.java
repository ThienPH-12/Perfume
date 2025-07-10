package com.example.Perfume.jpa.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "[Token]")
public class Token extends AbstractEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TokenId")
    private Long tokenId;

    @Column(name = "Token", length = 1000, nullable = false)
    private String token;

    @Column(name = "UserName", length = 30, nullable = false)
    private String userName;

    @Column(name = "UserId", nullable = false) // Added UserId field
    private Integer userId;

    @Column(name = "ExpirationDate")
    private Date expirationDate;

    // Getters and setters
    public Long getTokenId() {
        return tokenId;
    }

    public void setTokenId(Long tokenId) {
        this.tokenId = tokenId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Date getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(Date expirationDate) {
        this.expirationDate = expirationDate;
    }

    
}
