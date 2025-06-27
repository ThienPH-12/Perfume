package com.example.Perfume.jpa.repository;

import com.example.Perfume.jpa.entity.MixProduct;
import com.example.Perfume.dto.ImageDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MixProductRepository extends JpaRepository<MixProduct, String> { // Updated ID type
    @Query("SELECT new MixProduct(m.compIds, m.mixProdName, m.description, m.potentialCus, null, null, null) FROM MixProduct m WHERE m.compIds = :compIds")
    @Override
    Optional<MixProduct> findById(@Param("compIds") String compIds);

    @Query("SELECT new MixProduct(m.compIds, m.mixProdName, m.description, m.potentialCus, null, null, null) FROM MixProduct m")
    @Override
    List<MixProduct> findAll();

    @Query("SELECT new com.example.Perfume.dto.ImageDto(m.imageName, m.imageType, m.imageData) FROM MixProduct m WHERE m.compIds = :compIds")
    ImageDto findImageDataByCompIds(@Param("compIds") String compIds);
}
