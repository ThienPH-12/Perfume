package com.example.Perfume.jpa.key;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class UsageId implements Serializable {

    @Column(name = "DcId", nullable = false)
    private Integer dcId;

    @Column(name = "UserId", nullable = false)
    private Integer userId;

    public UsageId() {
    }

    public UsageId(Integer dcId, Integer userId) {
        this.dcId = dcId;
        this.userId = userId;
    }

    public Integer getDcId() {
        return dcId;
    }

    public void setDcId(Integer dcId) {
        this.dcId = dcId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UsageId usageId = (UsageId) o;
        return Objects.equals(dcId, usageId.dcId) &&
               Objects.equals(userId, usageId.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(dcId, userId);
    }
}
