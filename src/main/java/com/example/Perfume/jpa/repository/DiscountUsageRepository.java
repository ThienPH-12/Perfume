package com.example.Perfume.jpa.repository;

import com.example.Perfume.jpa.entity.DiscountUsage;
import com.example.Perfume.jpa.key.UsageId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiscountUsageRepository extends JpaRepository<DiscountUsage, UsageId> { // Use UsageId as the key
    // Additional query methods can be added here if needed
}
