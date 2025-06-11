package com.example.Perfume.service;

import com.example.Perfume.api.bean.req.ProductReq;
import com.example.Perfume.api.bean.req.CapacityReq;
import com.example.Perfume.jpa.entity.Product;
import com.example.Perfume.jpa.entity.Capacity;
import com.example.Perfume.jpa.repository.ProductRepository;
import com.example.Perfume.jpa.repository.CapacityRepository;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CapacityRepository capacityRepository;

    public Product addProduct(ProductReq productReq, MultipartFile imageFile) throws IOException {
        Product product = new Product();
        product.setProductName(productReq.getProductName());
        product.setDescription(productReq.getDescription());
        product.setImageName(imageFile.getName());
        product.setImageData(imageFile.getBytes());
        product.setImageType(imageFile.getContentType());
        product.setExpirationDate(productReq.getExpirationDate());
        product.setPotentialCus(productReq.getPotentialCus());
        product.setCreateDateTime(new Date(System.currentTimeMillis()));
        product.setCreateUserId(productReq.getCreateUserId());
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
        old.setUpdateUserId(productReq.getUpdateUserId());
        old.setCategoryId(productReq.getCategoryId());
        return productRepository.save(old);
    }

    public void deleteProduct(int productId) {
        if (!productRepository.existsById(productId)) {
            throw new RuntimeException("Product not found");
        }
        productRepository.deleteById(productId);
    }

    public Capacity addCapacity(CapacityReq capacityReq) {
        Capacity capacity = new Capacity();
        capacity.setCapacity(capacityReq.getCapacity());
        capacity.setDefaultPrice(capacityReq.getDefaultPrice()); // Set defaultPrice
        capacity.setCreateUserId(capacityReq.getCreateUserId());
        capacity.setCreateDateTime(new Date(System.currentTimeMillis())); // Set createDateTime
        return capacityRepository.save(capacity);
    }

    public Capacity updateCapacity(CapacityReq capacityReq) {
        Capacity old = capacityRepository.findById(capacityReq.getCapacityId())
                .orElseThrow(() -> new RuntimeException("Capacity not found"));
        old.setCapacity(capacityReq.getCapacity());
        old.setDefaultPrice(capacityReq.getDefaultPrice()); // Update defaultPrice
        old.setUpdateUserId(capacityReq.getUpdateUserId()); // Set updateUserId
        old.setUpdateDateTime(new Date(System.currentTimeMillis())); // Set updateDateTime
        return capacityRepository.save(old);
    }

    public void deleteCapacity(int capacityId) {
        if (!capacityRepository.existsById(capacityId)) {
            throw new RuntimeException("Capacity not found");
        }
        capacityRepository.deleteById(capacityId);
    }

    public List<Capacity> getAllCapacities() {
        return capacityRepository.findAll();
    }
}
