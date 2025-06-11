package com.example.Perfume.service;

import com.example.Perfume.api.bean.req.PriceReq;
import com.example.Perfume.dto.PriceDto;
import com.example.Perfume.jpa.entity.Price;
import com.example.Perfume.jpa.key.PriceId;
import com.example.Perfume.jpa.repository.PriceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Service
public class PriceService {

    @Autowired
    private PriceRepository priceRepository;

    public Price addPrice(PriceReq priceReq) {
        Price price = new Price();
        PriceId priceId = new PriceId(priceReq.getProductId(), priceReq.getCapacityId());
        price.setPriceId(priceId);
        price.setPrice(priceReq.getPrice());
        price.setCreateUserId(priceReq.getCreateUserId());
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
        PriceId priceId = new PriceId(priceReq.getProductId(), priceReq.getCapacityId());
        Price old = priceRepository.findById(priceId)
                .orElseThrow(() -> new RuntimeException("Price not found"));
        old.setPrice(priceReq.getPrice());
        old.setUpdateUserId(priceReq.getUpdateUserId());
        old.setUpdateDateTime(new Date(System.currentTimeMillis())); // Set updateDateTime
        return priceRepository.save(old); // Use default save method
    }

    public void deletePrice(PriceId priceId) {
        priceRepository.deleteById(priceId);
    }

    public List<PriceDto> getPriceListByProductId(Integer productId) { // Renamed method
        return priceRepository.findPriceByProductId(productId);
    }
}
