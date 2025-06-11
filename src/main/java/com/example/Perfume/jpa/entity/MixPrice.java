package com.example.Perfume.jpa.entity;

import com.example.Perfume.jpa.key.MixPriceId;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.math.BigDecimal;

/**
 * Entity representing the MixPrice table.
 */
@Entity
@Table(name = "[MixPrice]")
public class MixPrice extends AbstractEntity {

    @EmbeddedId
    private MixPriceId mixPriceId;

    @Column(name = "Price")
    private BigDecimal price;

    public MixPrice() {
    }

    public MixPrice(MixPriceId mixPriceId, BigDecimal price) {
        this.mixPriceId = mixPriceId;
        this.price = price;
    }

    // Getters and Setters
    public MixPriceId getMixPriceId() {
        return mixPriceId;
    }

    public void setMixPriceId(MixPriceId mixPriceId) {
        this.mixPriceId = mixPriceId;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}
