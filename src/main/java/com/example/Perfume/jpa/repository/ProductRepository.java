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
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    Product findByProductName(@Param("productName") String userName);

    List<Product> findByCategoryId(int categoryId);

    @Override
    Optional<Product> findById(Integer id);

    @Query("SELECT p FROM Product p ORDER BY p.createDateTime DESC")
    List<Product> findLatestProducts(Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.potentialCus LIKE %:potentialCus%")
    List<Product> findByPotentialCus(@Param("potentialCus") String potentialCus);
}
