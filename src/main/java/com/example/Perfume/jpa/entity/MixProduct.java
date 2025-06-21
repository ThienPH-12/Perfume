package com.example.Perfume.jpa.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Entity representing the MixProduct table.
 */
@Entity
@Table(name = "[MixProduct]")
public class MixProduct extends AbstractEntity {

    @Id
    @Column(name = "CompIds", length = 15)
    private String compIds;

    @Column(name = "MixProdName")
    private String mixProdName;

    @Column(name = "Description",length=1000)
    private String description;

    @Column(name = "PotentialCus", length = 15)
    private String potentialCus;

    // Getters and Setters
    public String getCompIds() {
        return compIds;
    }

    public void setCompIds(String compIds) {
        this.compIds = compIds;
    }

    public String getMixProdName() {
        return mixProdName;
    }

    public void setMixProdName(String mixProdName) {
        this.mixProdName = mixProdName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPotentialCus() {
        return potentialCus;
    }

    public void setPotentialCus(String potentialCus) {
        this.potentialCus = potentialCus;
    }
}
