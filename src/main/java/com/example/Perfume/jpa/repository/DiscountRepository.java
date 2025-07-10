package com.example.Perfume.jpa.repository;

import com.example.Perfume.jpa.entity.Discount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiscountRepository extends JpaRepository<Discount, Integer> {
    List<Discount> findByMethod(int methods); // New method to find discounts by option
}
