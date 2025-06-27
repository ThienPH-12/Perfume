package com.example.Perfume.service;

import com.example.Perfume.jpa.entity.Blog;
import com.example.Perfume.api.bean.req.BlogReq;
import com.example.Perfume.jpa.repository.BlogRepository;
import java.io.IOException;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.core.context.SecurityContextHolder;
import com.example.Perfume.jpa.entity.User;
import com.example.Perfume.dto.ImageDto;

@Service
public class BlogService {

    @Autowired
    private BlogRepository blogRepository;

    public Blog addBlog(BlogReq blogReq, MultipartFile imageFile) throws IOException {
        if (blogReq.getBlogContent().length() > 10000 || blogReq.getBlogTitle().length() > 100) {
            throw new RuntimeException("Blog content or title exceeds the allowed limit.");
        }
        if (imageFile.getSize() > 100000) {
            throw new RuntimeException("Image file size exceeds the allowed limit.");
        }
        User userContext = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!"1".equals(userContext.getAuthority())) {
            throw new RuntimeException("Permission denied: Only users with Authority = 1 can add blogs.");
        }
        // Logic to save blog and image
        Blog blog = new Blog();
        blog.setBlogTitle(blogReq.getBlogTitle());
        blog.setBlogContent(blogReq.getBlogContent());
        blog.setImageName(imageFile.getName());
        blog.setImageData(imageFile.getBytes());
        blog.setImageType(imageFile.getContentType());
        blog.setCreateDateTime(new Date(System.currentTimeMillis()));
        blog.setCreateUserId(String.valueOf(userContext.getUserId()));
        return blogRepository.save(blog);
    }

    public Blog getBlog(int blogId) {
        return blogRepository.findById(blogId).orElseThrow(() -> new RuntimeException("Blog not found"));
    }

    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    public Blog updateBlog(BlogReq blogReq, MultipartFile imageFile) throws Exception {
        if (blogReq.getBlogContent().length() > 10000 || blogReq.getBlogTitle().length() > 100) {
            throw new RuntimeException("Blog content or title exceeds the allowed limit.");
        }
        if (imageFile != null && !imageFile.isEmpty() && imageFile.getSize() > 100000) {
            throw new RuntimeException("Image file size exceeds the allowed limit.");
        }
        Blog existingBlog = blogRepository.findById(blogReq.getBlogId()).orElseThrow(() -> new Exception("Blog not found"));
        
        existingBlog.setBlogTitle(blogReq.getBlogTitle());
        existingBlog.setBlogContent(blogReq.getBlogContent());
        // Update image if provided
        if (imageFile != null && !imageFile.isEmpty()) {
            existingBlog.setImageData(imageFile.getBytes());
            existingBlog.setImageType(imageFile.getContentType());
        }
        // Set update metadata
        existingBlog.setUpdateDateTime(new Date(System.currentTimeMillis()));
        User userContext = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        existingBlog.setUpdateUserId(String.valueOf(userContext.getUserId()));

        return blogRepository.save(existingBlog);
    }

    public void deleteBlog(int id) throws Exception {
        User userContext = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!"1".equals(userContext.getAuthority())) {
            throw new RuntimeException("Permission denied: Only users with Authority = 1 can delete blogs.");
        }
        Blog existingBlog = blogRepository.findById(id).orElseThrow(() -> new Exception("Blog not found"));
        blogRepository.delete(existingBlog);
    }

    public ImageDto getImageDataByBlogId(int blogId) {
        return blogRepository.findImageDataByBlogId(blogId);
    }
}
