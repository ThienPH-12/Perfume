package com.example.Perfume.service;

import com.example.Perfume.jpa.entity.Product;
import com.example.Perfume.jpa.entity.Capacity;
import com.example.Perfume.jpa.repository.ProductRepository;
import com.example.Perfume.jpa.repository.CapacityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CapacityRepository capacityRepository;

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Product product) {
        if (!productRepository.existsById((long) product.getProductId())) {
            throw new RuntimeException("Product not found");
        }
        return productRepository.save(product);
    }

    public void deleteProduct(int productId) {
        if (!productRepository.existsById((long) productId)) {
            throw new RuntimeException("Product not found");
        }
        productRepository.deleteById((long) productId);
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
}
