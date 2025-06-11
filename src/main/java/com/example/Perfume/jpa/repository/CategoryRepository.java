package com.example.Perfume.jpa.repository;

import com.example.Perfume.jpa.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    // Additional query methods (if needed) can be added here
}
