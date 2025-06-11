/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.Perfume.jpa.key;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

/**
 * Composite key for the Cart entity.
 */
@Embeddable
public class CartId implements Serializable {
    @Column(name = "UserId")
    private Integer userId;

    @Column(name = "ProductId")
    private Integer productId;

    @Column(name = "CapacityId")
    private Integer capacityId;

    public CartId() {
    }

    public CartId(Integer userId, Integer productId, Integer capacityId) {
        this.userId = userId;
        this.productId = productId;
        this.capacityId = capacityId;
    }

    // Getters and Setters
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Integer getCapacityId() {
        return capacityId;
    }

    public void setCapacityId(Integer capacityId) {
        this.capacityId = capacityId;
    }

    // Override equals and hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CartId cartId = (CartId) o;
        return Objects.equals(userId, cartId.userId) &&
               Objects.equals(productId, cartId.productId) &&
               Objects.equals(capacityId, cartId.capacityId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, productId, capacityId);
    }
}
