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

    @Column(name = "Token")
    private String token;

    @Column(name = "UserName")
    private String userName;

    @Column(name = "ExpirationDate")
    private Date expirationDate;

    // Getters and setters
    // ...existing code...

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

    public Date getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(Date expirationDate) {
        this.expirationDate = expirationDate;
    }

    
}
