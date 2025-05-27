/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.Perfume.jpa.repository;

/**
 *
 * @author badao
 */
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Perfume.jpa.entity.Product;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    Product findByProductName(@Param("productName") String userName);

    @Override
    Optional<Product> findById(Integer id);
}
