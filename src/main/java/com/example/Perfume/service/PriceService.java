package com.example.Perfume.service;

import com.example.Perfume.api.bean.req.PriceReq;
import com.example.Perfume.dto.PriceDto;
import com.example.Perfume.jpa.entity.Price;
import com.example.Perfume.jpa.entity.User;
import com.example.Perfume.jpa.key.PriceId;
import com.example.Perfume.jpa.repository.PriceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Service
public class PriceService {

    @Autowired
    private PriceRepository priceRepository;

    public Price addPrice(PriceReq priceReq) {
        User userContext = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!"1".equals(userContext.getAuthority())) {
            throw new RuntimeException("Permission denied: Only users with Authority = 1 can add prices.");
        }
        Price price = new Price();
        PriceId priceId = new PriceId(priceReq.getProductId(), priceReq.getCapacityId());
        price.setPriceId(priceId);
        price.setPrice(priceReq.getPrice());
        price.setCreateUserId(String.valueOf(userContext.getUserId())); // Use String.valueOf
        price.setCreateDateTime(new Date(System.currentTimeMillis())); // Set createDateTime
        return priceRepository.save(price); // Use default save method
    }

    public List<Price> getAllPrices() {
        return priceRepository.findAll();
    }

    public BigDecimal getPriceById(PriceId priceId) {
        return priceRepository.findDtoByProductIdAndCapacityId(
            priceId.getProductId(), priceId.getCapacityId()
        ).getPrice(); // Extract only BigDecimal price
    }

    public Price updatePrice(PriceReq priceReq) {
        User userContext = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!"1".equals(userContext.getAuthority())) {
            throw new RuntimeException("Permission denied: Only users with Authority = 1 can update prices.");
        }
        PriceId priceId = new PriceId(priceReq.getProductId(), priceReq.getCapacityId());
        Price old = priceRepository.findById(priceId)
                .orElseThrow(() -> new RuntimeException("Price not found"));
        old.setPrice(priceReq.getPrice());
        old.setUpdateUserId(String.valueOf(userContext.getUserId())); // Use String.valueOf
        old.setUpdateDateTime(new Date(System.currentTimeMillis())); // Set updateDateTime
        return priceRepository.save(old); // Use default save method
    }

    public void deletePrice(PriceId priceId) {
        User userContext = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!"1".equals(userContext.getAuthority())) {
            throw new RuntimeException("Permission denied: Only users with Authority = 1 can delete prices.");
        }
        priceRepository.deleteById(priceId);
    }

    public List<PriceDto> getPriceListByProductId(Integer productId) { // Renamed method
        return priceRepository.findPriceByProductId(productId);
    }
}
