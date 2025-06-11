package com.example.Perfume.api.controller;

import com.example.Perfume.api.bean.req.PriceReq;
import com.example.Perfume.dto.PriceDto;
import com.example.Perfume.jpa.entity.Price;
import com.example.Perfume.jpa.key.PriceId;
import com.example.Perfume.service.PriceService;
import java.math.BigDecimal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PriceController {

    @Autowired
    private PriceService priceService;

    @PostMapping("/price")
    public ResponseEntity<?> addPrice(@RequestBody PriceReq priceReq) {
        try {
            Price savedPrice = priceService.addPrice(priceReq);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedPrice);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/prices")
    public ResponseEntity<?> getAllPrices() {
        try {
            List<Price> prices = priceService.getAllPrices();
            return new ResponseEntity<>(prices, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/price/search")
    public ResponseEntity<?> getPriceById(@RequestBody PriceId priceId) {
        try {
            BigDecimal price = priceService.getPriceById(priceId); // Directly get BigDecimal price
            return new ResponseEntity<>(price, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/price")
    public ResponseEntity<?> updatePrice(@RequestBody PriceReq priceReq) {
        try {
            Price updatedPrice = priceService.updatePrice(priceReq);
            return ResponseEntity.ok(updatedPrice);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @DeleteMapping("/price")
    public ResponseEntity<?> deletePrice(@RequestBody PriceId priceId) {
        try {
            priceService.deletePrice(priceId);
            return ResponseEntity.ok("Price deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/price/list/{productId}") // Updated endpoint path
    public ResponseEntity<?> getPriceListByProductId(@PathVariable Integer productId) { // Renamed method
        try {
            List<PriceDto> priceList = priceService.getPriceListByProductId(productId); // Updated variable name
            return new ResponseEntity<>(priceList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
