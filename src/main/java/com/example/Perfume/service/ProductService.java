package com.example.Perfume.service;

import com.example.Perfume.api.bean.req.ProductReq;
import com.example.Perfume.api.bean.req.CapacityReq;
import com.example.Perfume.dto.ImageDto;
import com.example.Perfume.jpa.entity.Product;
import com.example.Perfume.jpa.entity.Capacity;
import com.example.Perfume.jpa.repository.ProductRepository;
import com.example.Perfume.jpa.repository.CapacityRepository;
import com.example.Perfume.jpa.entity.User;
import org.springframework.security.core.context.SecurityContextHolder;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.PageRequest;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CapacityRepository capacityRepository;

    public Product addProduct(ProductReq productReq, MultipartFile imageFile) throws IOException {
        User userContext = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!"1".equals(userContext.getAuthority())) {
            throw new RuntimeException("Permission denied: Only users with Authority = 1 can add products.");
        }
        Product product = new Product();
        product.setProductName(productReq.getProductName());
        product.setDescription(productReq.getDescription());
        product.setImageName(imageFile.getName());
        product.setImageData(imageFile.getBytes());
        product.setImageType(imageFile.getContentType());
        product.setExpirationDate(productReq.getExpirationDate());
        product.setPotentialCus(productReq.getPotentialCus());
        product.setCreateDateTime(new Date(System.currentTimeMillis()));
        product.setCreateUserId(String.valueOf(userContext.getUserId())); // Use String.valueOf
        product.setCategoryId(productReq.getCategoryId());
        return productRepository.save(product);
    }

    public Product getProduct(int productId) {
        return productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public List<Product> getAllProducts() {
    return productRepository.findAll();
    }

    public List<Product> getProductsByCategory(int categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    public Product updateProduct(ProductReq productReq, MultipartFile imageFile) throws IOException {
        User userContext = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!"1".equals(userContext.getAuthority())) {
            throw new RuntimeException("Permission denied: Only users with Authority = 1 can update products.");
        }
        Product old = productRepository.findById(productReq.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));
        old.setProductName(productReq.getProductName());
        old.setDescription(productReq.getDescription());
        old.setImageName(imageFile.getName());
        old.setImageData(imageFile.getBytes());
        old.setImageType(imageFile.getContentType());
        old.setExpirationDate(productReq.getExpirationDate());
        old.setPotentialCus(productReq.getPotentialCus());
        old.setUpdateDateTime(new Date(System.currentTimeMillis()));
        old.setUpdateUserId(String.valueOf(userContext.getUserId())); // Use String.valueOf
        old.setCategoryId(productReq.getCategoryId());
        return productRepository.save(old);
    }

    public void deleteProduct(int productId) {
        User userContext = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!"1".equals(userContext.getAuthority())) {
            throw new RuntimeException("Permission denied: Only users with Authority = 1 can delete products.");
        }
        if (!productRepository.existsById(productId)) {
            throw new RuntimeException("Product not found");
        }
        productRepository.deleteById(productId);
    }

    public Capacity addCapacity(CapacityReq capacityReq) {
        User userContext = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!"1".equals(userContext.getAuthority())) {
            throw new RuntimeException("Permission denied: Only users with Authority = 1 can add capacities.");
        }
        Capacity capacity = new Capacity();
        capacity.setCapacity(capacityReq.getCapacity());
        capacity.setDefaultPrice(capacityReq.getDefaultPrice()); // Set defaultPrice
        capacity.setCreateDateTime(new Date(System.currentTimeMillis())); // Set createDateTime
        capacity.setCreateUserId(String.valueOf(userContext.getUserId())); // Use String.valueOf
        return capacityRepository.save(capacity);
    }

    public Capacity updateCapacity(CapacityReq capacityReq) {
        User userContext = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!"1".equals(userContext.getAuthority())) {
            throw new RuntimeException("Permission denied: Only users with Authority = 1 can update capacities.");
        }
        Capacity old = capacityRepository.findById(capacityReq.getCapacityId())
                .orElseThrow(() -> new RuntimeException("Capacity not found"));
        old.setCapacity(capacityReq.getCapacity());
        old.setDefaultPrice(capacityReq.getDefaultPrice()); // Update defaultPrice
        old.setUpdateDateTime(new Date(System.currentTimeMillis())); // Set updateDateTime
        old.setUpdateUserId(String.valueOf(userContext.getUserId())); // Use String.valueOf
        return capacityRepository.save(old);
    }

    public void deleteCapacity(int capacityId) {
        User userContext = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!"1".equals(userContext.getAuthority())) {
            throw new RuntimeException("Permission denied: Only users with Authority = 1 can delete capacities.");
        }
        if (!capacityRepository.existsById(capacityId)) {
            throw new RuntimeException("Capacity not found");
        }
        capacityRepository.deleteById(capacityId);
    }

    public List<Capacity> getAllCapacities() {
        return capacityRepository.findAll();
    }

    public List<Product> getTwoLatestProducts() {
        return productRepository.findLatestProducts(PageRequest.of(0, 2));
    }

    public List<Product> getProductsByPotentialCus(String potentialCus) {
        return productRepository.findByPotentialCus(potentialCus);
    }

    public ImageDto getImageDataByProductId(int productId) {
        return productRepository.findImageDataByProductId(productId);
    }
}
