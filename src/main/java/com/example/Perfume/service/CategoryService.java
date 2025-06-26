package com.example.Perfume.service;

import com.example.Perfume.api.bean.req.CategoryReq;
import com.example.Perfume.jpa.entity.Category;
import com.example.Perfume.jpa.repository.CategoryRepository;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.core.context.SecurityContextHolder;
import com.example.Perfume.jpa.entity.User;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public Category addCategory(CategoryReq categoryReq) {
        User userContext = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!"1".equals(userContext.getAuthority())) {
            throw new RuntimeException("Permission denied: Only users with Authority = 1 can add categories.");
        }
        Category category = new Category();
        category.setCategory(categoryReq.getCategory());
        category.setCreateUserId(String.valueOf(userContext.getUserId())); // Use String.valueOf
        category.setCreateDateTime(new Date(System.currentTimeMillis())); // Set createDateTime
        return categoryRepository.save(category);
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category getCategoryById(int id) {
        return categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Category not found"));
    }

    public Category updateCategory(CategoryReq categoryReq) {
        User userContext = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!"1".equals(userContext.getAuthority())) {
            throw new RuntimeException("Permission denied: Only users with Authority = 1 can update categories.");
        }
        if (!categoryRepository.existsById(categoryReq.getCategoryId())) {
            throw new RuntimeException("Category not found");
        }
        Category old = categoryRepository.findById(categoryReq.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        old.setCategory(categoryReq.getCategory());
        old.setUpdateUserId(String.valueOf(userContext.getUserId())); // Use String.valueOf
        old.setUpdateDateTime(new Date(System.currentTimeMillis())); // Set updateDateTime
        return categoryRepository.save(old);
    }

    public void deleteCategory(int id) {
        User userContext = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!"1".equals(userContext.getAuthority())) {
            throw new RuntimeException("Permission denied: Only users with Authority = 1 can delete categories.");
        }
        if (!categoryRepository.existsById(id)) {
            throw new RuntimeException("Category not found");
        }
        categoryRepository.deleteById(id);
    }
}
