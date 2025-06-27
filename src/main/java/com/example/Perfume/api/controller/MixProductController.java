package com.example.Perfume.api.controller;

import com.example.Perfume.jpa.entity.MixProduct;
import com.example.Perfume.service.MixlProdService;
import com.example.Perfume.api.bean.req.MixProdReq;
import com.example.Perfume.dto.ImageDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MixProductController {

    @Autowired
    private MixlProdService mixProdService;

    @PostMapping("/mixProduct")
    public ResponseEntity<?> addMixProduct(@RequestPart MixProdReq mixProdReq, @RequestPart MultipartFile imageFile) {
        try {
            MixProduct savedMixProduct = mixProdService.addMixProduct(mixProdReq, imageFile);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedMixProduct);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/mixProduct")
    public ResponseEntity<?> updateMixProduct(@RequestPart MixProdReq mixProdReq, @RequestPart MultipartFile imageFile) {
        try {
            MixProduct updatedMixProduct = mixProdService.updateMixProduct(mixProdReq, imageFile);
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

    @GetMapping("/mixProduct/image/{compIds}")
    public ResponseEntity<byte[]> getImageByCompIds(@PathVariable String compIds) {
        ImageDto imageDto = mixProdService.getImageDataByCompIds(compIds);

        return ResponseEntity.ok()
                .contentType(MediaType.valueOf(imageDto.getImageType()))
                .body(imageDto.getImageData());
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
