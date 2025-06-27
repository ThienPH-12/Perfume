package com.example.Perfume.jpa.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
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

    @Column(name = "Description", length = 1000)
    private String description;

    @Column(name = "PotentialCus", length = 15)
    private String potentialCus;

    @Column(name = "ImageName", length = 50)
    private String imageName;

    @Column(name = "ImageType", length = 50)
    private String imageType;

    @Lob
    @Column(name = "ImageData", length = 100000)
    private byte[] imageData;

    public MixProduct() {
    }

    public MixProduct(String compIds, String mixProdName, String description, String potentialCus, String imageName, String imageType, byte[] imageData) {
        this.compIds = compIds;
        this.mixProdName = mixProdName;
        this.description = description;
        this.potentialCus = potentialCus;
        this.imageName = imageName;
        this.imageType = imageType;
        this.imageData = imageData;
    }

    
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

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public String getImageType() {
        return imageType;
    }

    public void setImageType(String imageType) {
        this.imageType = imageType;
    }

    public byte[] getImageData() {
        return imageData;
    }

    public void setImageData(byte[] imageData) {
        this.imageData = imageData;
    }
}
