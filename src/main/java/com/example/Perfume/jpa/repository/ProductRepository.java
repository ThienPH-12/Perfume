/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.Perfume.jpa.repository;

/**
 *
 * @author badao
 */
import com.example.Perfume.dto.ImageDto;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Perfume.jpa.entity.Product;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    Product findByProductName(@Param("productName") String userName);

    @Query("SELECT new Product(p.productId, p.productName, p.categoryId, p.description, null, null, null, p.expirationDate, p.potentialCus) FROM Product p WHERE p.categoryId = :categoryId")
    List<Product> findByCategoryId(@Param("categoryId") int categoryId);

    @Override
    @Query("SELECT new Product(p.productId, p.productName, p.categoryId, p.description, null, null, null, p.expirationDate, p.potentialCus) FROM Product p WHERE p.productId = :id")
    Optional<Product> findById(@Param("id") Integer id);

    @Query("SELECT new Product(p.productId, p.productName, p.categoryId, p.description, null, null, null, p.expirationDate, p.potentialCus) FROM Product p ORDER BY p.createDateTime DESC")
    List<Product> findLatestProducts(Pageable pageable);

    @Query("SELECT new Product(p.productId, p.productName, p.categoryId, p.description, null, null, null, p.expirationDate, p.potentialCus) FROM Product p WHERE p.potentialCus LIKE %:potentialCus%")
    List<Product> findByPotentialCus(@Param("potentialCus") String potentialCus);

    @Query("SELECT new Product(p.productId, p.productName, p.categoryId, p.description, null, null, null, p.expirationDate, p.potentialCus) FROM Product p")
    @Override
    List<Product> findAll();

    @Query("SELECT new com.example.Perfume.dto.ImageDto(p.imageName, p.imageType, p.imageData) FROM Product p WHERE p.productId = :productId")
    ImageDto findImageDataByProductId(@Param("productId") int productId);
}
