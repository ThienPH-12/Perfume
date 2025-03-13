package com.example.Perfume.jpa.repository;

import com.example.Perfume.jpa.entity.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Integer> {
    @Override
    Optional<Blog> findById(Integer id);
}
