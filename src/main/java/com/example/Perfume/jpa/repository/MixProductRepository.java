package com.example.Perfume.jpa.repository;

import com.example.Perfume.jpa.entity.MixProduct;
import com.example.Perfume.jpa.key.MixPriceId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MixProductRepository extends JpaRepository<MixProduct, String> { // Updated ID type
}
