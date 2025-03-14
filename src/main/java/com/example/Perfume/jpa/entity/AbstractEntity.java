/*  * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license  * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template  */ package com.example.Perfume.jpa.entity;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import java.util.Date;

/**
 * * * @author badao
 */
@MappedSuperclass
public abstract class AbstractEntity {

    @Column(name = "CreateUserName")
    private String createUserName;
    @Column(name = "CreateDateTime")
    private Date createDateTime;
    @Column(name = "UpdateUserName")
    private String updateUserName;
    @Column(name = "UpdateDateTime")
    private Date updateDateTime;

    public String getCreateUserName() {
        return createUserName;
    }

    public void setCreateUserName(String createUserName) {
        this.createUserName = createUserName;
    }

    public Date getCreateDateTime() {
        return createDateTime;
    }

    public void setCreateDateTime(Date createDateTime) {
        this.createDateTime = createDateTime;
    }

    public String getUpdateUserName() {
        return updateUserName;
    }

    public void setUpdateUserName(String updateUserName) {
        this.updateUserName = updateUserName;
    }

    public Date getUpdateDateTime() {
        return updateDateTime;
    }

    public void setUpdateDateTime(Date updateDateTime) {
        this.updateDateTime = updateDateTime;
    }
}
