package com.example.Perfume.api.controller;

import com.example.Perfume.jpa.entity.MixProduct;
import com.example.Perfume.service.MixlProdService;
import com.example.Perfume.api.bean.req.MixProdReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MixProductController {

    @Autowired
    private MixlProdService mixProdService;

    @PostMapping("/mixProduct")
    public ResponseEntity<?> addMixProduct(@RequestBody MixProdReq mixProdReq) {
        try {
            MixProduct savedMixProduct = mixProdService.addMixProduct(mixProdReq);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedMixProduct);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/mixProduct")
    public ResponseEntity<?> updateMixProduct(@RequestBody MixProdReq mixProdReq) {
        try {
            MixProduct updatedMixProduct = mixProdService.updateMixProduct(mixProdReq);
            return ResponseEntity.ok(updatedMixProduct);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/mixProducts")
    public ResponseEntity<List<MixProduct>> getAllMixProducts() {
        List<MixProduct> mixProducts = mixProdService.getAllMixProducts();
        return ResponseEntity.ok(mixProducts);
    }

    @GetMapping("/mixProduct/search")
    public ResponseEntity<?> getMixProductById(@RequestParam String compIds) { // Updated to use compIds
        try {
            MixProduct mixProduct = mixProdService.getMixProductById(compIds);
            return ResponseEntity.ok(mixProduct);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/mixProduct")
    public ResponseEntity<?> deleteMixProduct(@RequestParam String compIds) { // Updated to use compIds
        try {
            mixProdService.deleteMixProduct(compIds);
            return ResponseEntity.ok("MixProduct deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
