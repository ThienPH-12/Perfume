package com.example.Perfume.jpa.entity;

import com.example.Perfume.jpa.key.PriceId;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.math.BigDecimal;

/**
 * Entity representing the Price table.
 */
@Entity
@Table(name = "[Price]")
public class Price extends AbstractEntity{

    @EmbeddedId
    private PriceId priceId;

    @Column(name = "Price", precision = 18, scale = 3)
    private BigDecimal price; // Changed to BigDecimal

    public Price() {
    }

    public Price(PriceId priceId, BigDecimal price) {
        this.priceId = priceId;
        this.price = price;
    }

    // Getters and Setters
    public PriceId getPriceId() {
        return priceId;
    }

    public void setPriceId(PriceId priceId) {
        this.priceId = priceId;
    }

    public BigDecimal getPrice() { // Updated return type
        return price;
    }

    public void setPrice(BigDecimal price) { // Updated parameter type
        this.price = price;
    }
}
