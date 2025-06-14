package com.example.Perfume.jpa.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "[ConfirmationToken]")
public class ConfirmationToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Integer id;

    @Column(name = "Token", nullable = false)
    private String token;

    @Column(name = "UserId", nullable = false)
    private Integer userId;

    @Column(name = "createdAt", nullable = false)
    private Date createdAt; // Updated to match AbstractEntity's time type

    @Column(name = "expiresAt", nullable = false)
    private Date expiresAt; // Updated to match AbstractEntity's time type

    @Column(name = "confirmedAt")
    private Date confirmedAt; // Updated to match AbstractEntity's time type

    public ConfirmationToken() {
    }

    public ConfirmationToken(Integer id, String token, Integer userId, Date createdAt, Date expiresAt, Date confirmedAt) {
        this.id = id;
        this.token = token;
        this.userId = userId;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
        this.confirmedAt = confirmedAt;
    }

    public ConfirmationToken(String token, Integer userId, Date createdAt, Date expiresAt) {
        this.token = token;
        this.userId = userId;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(Date expiresAt) {
        this.expiresAt = expiresAt;
    }

    public Date getConfirmedAt() {
        return confirmedAt;
    }

    public void setConfirmedAt(Date confirmedAt) {
        this.confirmedAt = confirmedAt;
    }
}