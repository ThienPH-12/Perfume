/*  * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license  * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template  */ package com.example.Perfume.jpa.entity;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import java.util.Date;

/**
 * * * @author badao
 */
@MappedSuperclass
public abstract class AbstractEntity {

    @Column(name = "CreateUserId", nullable = false, length = 30)
    private String createUserId;

    @Column(name = "CreateDateTime")
    private Date createDateTime;

    @Column(name = "UpdateUserId", length = 30)
    private String updateUserId;

    @Column(name = "UpdateDateTime")
    private Date updateDateTime;

    public AbstractEntity() {
    }

    public AbstractEntity(String createUserId, Date createDateTime, String updateUserId, Date updateDateTime) {
        this.createUserId = createUserId;
        this.createDateTime = createDateTime;
        this.updateUserId = updateUserId;
        this.updateDateTime = updateDateTime;
    }

    
    public String getCreateUserId() {
        return createUserId;
    }

    public void setCreateUserId(String createUserId) {
        this.createUserId = createUserId;
    }

    public Date getCreateDateTime() {
        return createDateTime;
    }

    public void setCreateDateTime(Date createDateTime) {
        this.createDateTime = createDateTime;
    }

    public String getUpdateUserId() {
        return updateUserId;
    }

    public void setUpdateUserId(String updateUserId) {
        this.updateUserId = updateUserId;
    }

    public Date getUpdateDateTime() {
        return updateDateTime;
    }

    public void setUpdateDateTime(Date updateDateTime) {
        this.updateDateTime = updateDateTime;
    }
}
