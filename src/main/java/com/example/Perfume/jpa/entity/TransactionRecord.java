/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.Perfume.jpa.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 *
 * @author badao
 */
@Entity
@Table(name = "[TransactionRecord]")
public class TransactionRecord {

    @Id
    @Column(name = "OrderCode")
    private Long orderCode;

    @Column(name = "UserId")
    private Integer userId;

    @Column(name = "Link", length = 1000)
    private String link;

    @Column(name = "Items", length = 5000)
    private String items;

    public TransactionRecord() {
    }

    public TransactionRecord(Long orderCode, Integer userId, String link, String items) {
        this.orderCode = orderCode;
        this.userId = userId;
        this.link = link;
        this.items = items;
    }

    public Long getOrderCode() {
        return orderCode;
    }

    public void setOrderCode(Long orderCode) {
        this.orderCode = orderCode;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getItems() {
        return items;
    }

    public void setItems(String items) {
        this.items = items;
    }

}
