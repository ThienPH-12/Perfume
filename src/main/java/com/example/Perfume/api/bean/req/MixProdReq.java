package com.example.Perfume.api.bean.req;

import java.math.BigDecimal;
import java.util.List;

/**
 * Request bean for MixProduct operations.
 */
public class MixProdReq {
    private List<Integer> compIds; // Updated to List<Integer>
    private String mixProdName; // New field
    private String description; // New field
    private String potentialCus; // New field

    public List<Integer> getCompIds() {
        return compIds;
    }

    public void setCompIds(List<Integer> compIds) {
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
