package com.example.Perfume.dto;

import java.math.BigDecimal;

public class PriceDto {
    private Integer capacityId;
    private int capacity; // Updated field name
    private BigDecimal price;

    public PriceDto(Integer capacityId, int capacity, BigDecimal price) {
        this.capacityId = capacityId;
        this.capacity = capacity; // Updated constructor
        this.price = price;
    }

    // Getters and Setters
    public Integer getCapacityId() {
        return capacityId;
    }

    public void setCapacityId(Integer capacityId) {
        this.capacityId = capacityId;
    }

    public int getCapacity() { // Updated getter
        return capacity;
    }

    public void setCapacity(int capacity) { // Updated setter
        this.capacity = capacity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}
