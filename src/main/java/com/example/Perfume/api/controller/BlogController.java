/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.Perfume.api.controller;

import com.example.Perfume.service.BlogService;
import com.example.Perfume.jpa.entity.Blog;
import com.example.Perfume.api.bean.req.BlogReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BlogController {

    @Autowired
    private BlogService blogService;

    @PostMapping("/blog/add")
    public ResponseEntity<?> addBlog(@RequestPart BlogReq blogReq,@RequestPart MultipartFile imageFile) {
        try {
            Blog blog = blogService.addBlog(blogReq,imageFile);
            return new ResponseEntity<>(blog, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/blogs")
    public ResponseEntity<?> getAllBlogs() {
        try {
            List<Blog> blogs = blogService.getAllBlogs();
            return new ResponseEntity<>(blogs, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/blog/image/{blogId}")
    public ResponseEntity<byte[]> getImageByBlogId(@PathVariable int blogId) {
        Blog blog = blogService.getBlog(blogId);
        byte[] imageFile = blog.getImageData();

        return ResponseEntity.ok().contentType(MediaType.valueOf(blog.getImageType())).body(imageFile);
    }

    @GetMapping("/blog/{id}")
    public ResponseEntity<?> getBlogById(@PathVariable int id) {
        try {
            Blog blog = blogService.getBlog(id);
            return new ResponseEntity<>(blog, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
