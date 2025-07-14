package com.example.Perfume.jpa.repository;

import com.example.Perfume.jpa.entity.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;
import java.util.List;
import com.example.Perfume.dto.ImageDto;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Integer> {
    @Query("SELECT new Blog(b.blogId, b.blogTitle, b.blogContent, null, null, null,b.createUserId,b.createDateTime, null, null) FROM Blog b WHERE b.blogId = :id")
    @Override
    Optional<Blog> findById(@Param("id") Integer id);

    @Query("SELECT new Blog(b.blogId, b.blogTitle, b.blogContent, null, null, null,b.createUserId,b.createDateTime, null, null) FROM Blog b ORDER BY b.createDateTime DESC")
    @Override
    List<Blog> findAll();

    @Query("SELECT new com.example.Perfume.dto.ImageDto(b.imageName, b.imageType, b.imageData) FROM Blog b WHERE b.blogId = :blogId")
    ImageDto findImageDataByBlogId(@Param("blogId") int blogId);
}
