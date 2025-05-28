package com.example.Perfume.service;

import com.example.Perfume.api.bean.req.ProductReq;
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
        product.setCreateDateTime(new Date(System.currentTimeMillis()));
        product.setCreateUserId(productReq.getCreateUserId());
        return productRepository.save(product);
    }

    public Product getProduct(int productId) {
        return productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product updateProduct(ProductReq productReq, MultipartFile imageFile) throws IOException {
        Product product = new Product();
        product.setProductId(productReq.getProductId());
        product.setProductName(productReq.getProductName());
        product.setDescription(productReq.getDescription());
        product.setImageName(imageFile.getName());
        product.setImageData(imageFile.getBytes());
        product.setImageType(imageFile.getContentType());
        product.setExpirationDate(productReq.getExpirationDate());
        product.setCreateDateTime(productReq.getCreateDateTime());
        product.setCreateUserId(productReq.getCreateUserId());
        product.setUpdateDateTime(new Date(System.currentTimeMillis()));
        product.setUpdateUserId(productReq.getUpdateUserId());
        if (!productRepository.existsById( product.getProductId())) {
            throw new RuntimeException("Product not found");
        }
        return productRepository.save(product);
    }

    public void deleteProduct(int productId) {
        if (!productRepository.existsById(productId)) {
            throw new RuntimeException("Product not found");
        }
        productRepository.deleteById(productId);
    }

    public Capacity addCapacity(Capacity capacity) {
        return capacityRepository.save(capacity);
    }

    public Capacity updateCapacity(Capacity capacity) {
        if (!capacityRepository.existsById(capacity.getCapacityId())) {
            throw new RuntimeException("Capacity not found");
        }
        return capacityRepository.save(capacity);
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
