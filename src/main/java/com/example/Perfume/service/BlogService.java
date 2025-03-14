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

@Service
public class BlogService {

    @Autowired
    private BlogRepository blogRepository;

    public Blog addBlog(BlogReq blogReq,MultipartFile imageFile) throws IOException {
        // Logic to save blog and image
        Blog blog = new Blog();
        blog.setBlogTitle(blogReq.getBlogTitle());
        blog.setBlogContent(blogReq.getBlogContent());
        blog.setImageName(imageFile.getName());
        blog.setImageData(imageFile.getBytes());
        blog.setImageType(imageFile.getContentType());
        blog.setCreateDateTime(new Date());
        blog.setCreateUserName(blogReq.getCreateUserName());
        return blogRepository.save(blog);
    }

    public Blog getBlog(int blogId) {
        return blogRepository.findById(blogId).orElseThrow(() -> new RuntimeException("Blog not found"));
    }

    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }
}
