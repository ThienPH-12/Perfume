package com.example.Perfume.jpa.key;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

/**
 * Composite key for the MixProduct entity.
 */
@Embeddable
public class MixPriceId implements Serializable {

      @Column(name = "CompIds")
    private String compIds;
      
    @Column(name = "CapacityId")
    private Integer capacityId;

  

    public MixPriceId() {
    }

    public MixPriceId( String compIds,Integer capacityId) {
        this.capacityId = capacityId;
        this.compIds = compIds;
    }

    // Getters and Setters
    public Integer getCapacityId() {
        return capacityId;
    }

    public void setCapacityId(Integer capacityId) {
        this.capacityId = capacityId;
    }

    public String getCompIds() {
        return compIds;
    }

    public void setCompIds(String compIds) {
        this.compIds = compIds;
    }

    // Override equals and hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MixPriceId that = (MixPriceId) o;
        return Objects.equals(capacityId, that.capacityId) &&
               Objects.equals(compIds, that.compIds);
    }

    @Override
    public int hashCode() {
        return Objects.hash(capacityId, compIds);
    }
}
