/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.Perfume.jpa.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;

/**
 *
 * @author badao
 */
@Entity
@Table(name = "[Capacity]")
public class Capacity extends AbstractEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CapacityId")
    private Integer capacityId;

    @Column(name = "Capacity")
    private int capacity;
    
    @Column(name = "DefaultPrice", precision = 18, scale = 3)
    private BigDecimal defaultPrice;

    public Capacity() {
    }

    public Capacity(Integer capacityId, int capacity, BigDecimal defaultPrice) {
        this.capacityId = capacityId;
        this.capacity = capacity;
        this.defaultPrice = defaultPrice;
    }

    public Integer getCapacityId() {
        return capacityId;
    }

    public void setCapacityId(Integer capacityId) {
        this.capacityId = capacityId;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public BigDecimal getDefaultPrice() {
        return defaultPrice;
    }

    public void setDefaultPrice(BigDecimal defaultPrice) {
        this.defaultPrice = defaultPrice;
    }
}
