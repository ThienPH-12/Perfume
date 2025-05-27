package com.example.Perfume.api.controller;

import com.example.Perfume.api.bean.req.ProductReq;
import com.example.Perfume.jpa.entity.Product;
import com.example.Perfume.jpa.entity.Capacity;
import com.example.Perfume.service.ProductService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/product")
    public ResponseEntity<?> addProduct(@RequestPart ProductReq productReq, @RequestPart MultipartFile imageFile) {
        try {
            Product savedProduct = productService.addProduct(productReq, imageFile);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/products")
    public ResponseEntity<?> getAllProducts() {
        try {
            List<Product> products = productService.getAllProducts();
            return new ResponseEntity<>(products, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/product/image/{productId}")
    public ResponseEntity<byte[]> getImageByProductId(@PathVariable int productId) {
        Product product = productService.getProduct(productId);
        byte[] imageFile = product.getImageData();

        return ResponseEntity.ok().contentType(MediaType.valueOf(product.getImageType())).body(imageFile);
    }

    @GetMapping("/product/search/{id}")
    public ResponseEntity<?> getProductById(@PathVariable int id) {
        try {
            Product product = productService.getProduct(id);
            return new ResponseEntity<>(product, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/product")
    public ResponseEntity<?> updateProduct(@RequestPart ProductReq productReq, @RequestPart MultipartFile imageFile) {
        try {
            Product updatedProduct = productService.updateProduct(productReq, imageFile);
            return ResponseEntity.ok(updatedProduct);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @DeleteMapping("/product/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable int productId) {
        try {
            productService.deleteProduct(productId);
            return ResponseEntity.ok("Product deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/capacity")
    public ResponseEntity<?> addCapacity(@RequestBody Capacity capacity) {
        try {
            Capacity savedCapacity = productService.addCapacity(capacity);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedCapacity);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("/capacity")
    public ResponseEntity<?> updateCapacity(@RequestBody Capacity capacity) {
        try {
            Capacity updatedCapacity = productService.updateCapacity(capacity);
            return ResponseEntity.ok(updatedCapacity);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @DeleteMapping("/capacity/{capacityId}")
    public ResponseEntity<?> deleteCapacity(@PathVariable int capacityId) {
        try {
            productService.deleteCapacity(capacityId);
            return ResponseEntity.ok("Capacity deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/capacities")
    public ResponseEntity<?> getAllCapacities() {
        try {
            List<Capacity> capacities = productService.getAllCapacities();
            return new ResponseEntity<>(capacities, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
