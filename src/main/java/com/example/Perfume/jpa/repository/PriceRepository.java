package com.example.Perfume.jpa.repository;

import com.example.Perfume.jpa.entity.Price;
import com.example.Perfume.jpa.key.PriceId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.example.Perfume.dto.PriceDto;

import java.util.List;

public interface PriceRepository extends JpaRepository<Price, PriceId> {

    @Query("SELECT new com.example.Perfume.dto.PriceDto(c.capacityId, c.capacity, " +
           "COALESCE(p.price, c.defaultPrice)) " +
           "FROM Capacity c LEFT JOIN Price p ON p.priceId.capacityId = c.capacityId AND p.priceId.productId = :productId " +
           "WHERE c.capacityId = :capacityId")
    PriceDto findDtoByProductIdAndCapacityId(@Param("productId") Integer productId, @Param("capacityId") Integer capacityId);

    @Query("SELECT new com.example.Perfume.dto.PriceDto(c.capacityId, c.capacity, " +
           "COALESCE(p.price, c.defaultPrice)) " +
           "FROM Capacity c LEFT JOIN Price p ON p.priceId.capacityId = c.capacityId AND p.priceId.productId = :productId")
    List<PriceDto> findPriceByProductId(@Param("productId") Integer productId);
}
