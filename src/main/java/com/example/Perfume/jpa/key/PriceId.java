package com.example.Perfume.jpa.key;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

/**
 * Composite key for the Price entity.
 */
@Embeddable
public class PriceId implements Serializable {

    @Column(name = "ProductId")
    private Integer productId;

    @Column(name = "CapacityId")
    private Integer capacityId;

    public PriceId() {
    }

    public PriceId(Integer productId, Integer capacityId) {
        this.productId = productId;
        this.capacityId = capacityId;
    }

    
    // Getters and Setters
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
        PriceId priceId = (PriceId) o;
        return Objects.equals(productId, priceId.productId) &&
               Objects.equals(capacityId, priceId.capacityId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productId, capacityId);
    }
}
