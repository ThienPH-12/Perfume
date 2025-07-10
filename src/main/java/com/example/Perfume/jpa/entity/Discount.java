package com.example.Perfume.jpa.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "[Discount]")
public class Discount extends AbstractEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "DcId")
    private Integer dcId;

    @Column(name = "Code", length = 20)
    private String code;

    @Column(name = "Method")
    private int method;

    @Column(name = "Value")
    private int value;

    @Column(name = "Quantity")
    private int quantity;

    @Column(name = "ExpiresAt")
    private Date expiresAt;

    public Discount() {
    }

    public Discount(Integer dcId, String code, int option, int value, int quantity, Date expiresAt) {
        this.dcId = dcId;
        this.code = code;
        this.method = option;
        this.value = value;
        this.quantity = quantity;
        this.expiresAt = expiresAt;
    }

    public Integer getDcId() {
        return dcId;
    }

    public void setDcId(Integer dcId) {
        this.dcId = dcId;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public int getMethod() {
        return method;
    }

    public void setMethod(int method) {
        this.method = method;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Date getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(Date expiresAt) {
        this.expiresAt = expiresAt;
    }
}
