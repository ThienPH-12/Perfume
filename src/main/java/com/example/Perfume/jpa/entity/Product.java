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
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import java.util.Date;

/**
 *
 * @author badao
 */
@Entity
@Table(name = "[Product]")
public class Product extends AbstractEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ProductId")
    private int productId;

    @Column(name = "ProductName", length = 50)
    private String productName;

    @Column(name = "CategoryId")
    private int categoryId;

    @Column(name = "Description")
    private String description;

    @Column(name = "ImageName", length = 50)
    private String imageName;

    @Column(name = "ImageType", length = 50)
    private String imageType;
    @Lob
    @Column(name = "ImageData",length=100000)
    private byte[] imageData;

    @Column(name = "ExpirationDate")
    private Date expirationDate;

    @Column(name = "PotentialCus", length = 15)
    private String potentialCus;

    public Product() {
    }

    // Add other fields, getters and setters

    public Product(int productId, String productName, int categoryId, String description, String imageName, String imageType, byte[] imageData, Date expirationDate) {
        this.productId = productId;
        this.productName = productName;
        this.categoryId = categoryId;
        this.description = description;
        this.imageName = imageName;
        this.imageType = imageType;
        this.imageData = imageData;
        this.expirationDate = expirationDate;
    }

    public Product(int productId, String productName, int categoryId, String description, String imageName, String imageType, byte[] imageData, Date expirationDate, String potentialCus) {
        this.productId = productId;
        this.productName = productName;
        this.categoryId = categoryId;
        this.description = description;
        this.imageName = imageName;
        this.imageType = imageType;
        this.imageData = imageData;
        this.expirationDate = expirationDate;
        this.potentialCus = potentialCus;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(Date expirationDate) {
        this.expirationDate = expirationDate;
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

    public String getPotentialCus() {
        return potentialCus;
    }

    public void setPotentialCus(String potentialCus) {
        this.potentialCus = potentialCus;
    }

}
