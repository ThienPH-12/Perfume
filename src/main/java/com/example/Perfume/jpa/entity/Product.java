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
import java.math.BigDecimal;
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

    @Column(name = "ProductName")
    private String productName;

    @Column(name = "Price")
    private BigDecimal price;;

    @Column(name = "Description")
    private String description;

    @Column(name = "ImageName")
    private String imageName;

    @Column(name = "ImageType")
    private String imageType;
    @Lob
    @Column(name = "ImageData")
    private byte[] imageData;

    @Column(name = "ExpirationDate")
    private Date expirationDate;

    public Product() {
    }

    // Add other fields, getters and setters

    public Product(int productId, String productName, BigDecimal price, String description, String imageName, String imageType, byte[] imageData, Date expirationDate) {
        this.productId = productId;
        this.productName = productName;
        this.price = price;
        this.description = description;
        this.imageName = imageName;
        this.imageType = imageType;
        this.imageData = imageData;
        this.expirationDate = expirationDate;
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

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
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

}
