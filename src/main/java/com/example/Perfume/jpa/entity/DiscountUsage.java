package com.example.Perfume.jpa.entity;

import com.example.Perfume.jpa.key.UsageId;
import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "[DiscountUsage]")
public class DiscountUsage {

    @EmbeddedId
    private UsageId usageId; // Composite key

    @Column(name = "CreateDateTime")
    private Date createDateTime;

    public DiscountUsage() {
    }

    public DiscountUsage(UsageId usageId, Date createDateTime) {
        this.usageId = usageId;
        this.createDateTime = createDateTime;
    }

    public UsageId getUsageId() {
        return usageId;
    }

    public void setUsageId(UsageId usageId) {
        this.usageId = usageId;
    }

    public Date getCreateDateTime() {
        return createDateTime;
    }

    public void setCreateDateTime(Date createDateTime) {
        this.createDateTime = createDateTime;
    }
}
