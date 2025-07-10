package com.example.Perfume.api.controller;

import com.example.Perfume.api.bean.req.DiscountReq;
import com.example.Perfume.jpa.entity.Discount;
import com.example.Perfume.service.DiscountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class DiscountController {

    @Autowired
    private DiscountService discountService;

    @PostMapping("/discount")
    public ResponseEntity<?> addDiscount(@RequestBody DiscountReq discountReq) {
        try {
            Discount savedDiscount = discountService.addDiscount(discountReq);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedDiscount);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("/discount")
    public ResponseEntity<?> updateDiscount(@RequestBody DiscountReq discountReq) {
        try {
            Discount updatedDiscount = discountService.updateDiscount(discountReq);
            return ResponseEntity.ok(updatedDiscount);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @DeleteMapping("/discount/{dcId}")
    public ResponseEntity<?> deleteDiscount(@PathVariable Integer dcId) {
        try {
            discountService.deleteDiscount(dcId);
            return ResponseEntity.ok("Discount deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/discounts")
    public ResponseEntity<?> getAllDiscounts() {
        try {
            List<Discount> discounts = discountService.getAllDiscounts();
            return new ResponseEntity<>(discounts, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/discounts/method/{method}")
    public ResponseEntity<?> getDiscountsByMethod(@PathVariable int method) {
        try {
            List<Discount> discounts = discountService.getDiscountsByMethod(method);
            return ResponseEntity.ok(discounts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
