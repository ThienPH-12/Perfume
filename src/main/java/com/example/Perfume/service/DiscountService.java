package com.example.Perfume.service;

import com.example.Perfume.api.bean.req.DiscountReq;
import com.example.Perfume.jpa.entity.Discount;
import com.example.Perfume.jpa.entity.DiscountUsage;
import com.example.Perfume.jpa.entity.User;
import com.example.Perfume.jpa.repository.DiscountRepository;
import com.example.Perfume.jpa.repository.DiscountUsageRepository;
import com.example.Perfume.jpa.key.UsageId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class DiscountService {

    @Autowired
    private DiscountRepository discountRepository;

    @Autowired
    private DiscountUsageRepository discountUsageRepository; // Inject DiscountUsageRepository

    public Discount addDiscount(DiscountReq discountReq) {
        User userContext = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!"1".equals(userContext.getAuthority())) {
            throw new RuntimeException("Permission denied: Only users with Authority = 1 can add discounts.");
        }
        Discount discount = new Discount();
        discount.setCode(discountReq.getCode());
        discount.setMethod(discountReq.getMethod());
        discount.setValue(discountReq.getValue());
        discount.setQuantity(discountReq.getQuantity());
        discount.setExpiresAt(discountReq.getExpiresAt());
        discount.setCreateUserId(String.valueOf(userContext.getUserId())); // Use String.valueOf
        discount.setCreateDateTime(new Date(System.currentTimeMillis())); // Set createDateTime
        return discountRepository.save(discount);
    }

    public Discount updateDiscount(DiscountReq discountReq) {
        User userContext = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!"1".equals(userContext.getAuthority())) {
            throw new RuntimeException("Permission denied: Only users with Authority = 1 can update discounts.");
        }
        Discount discount = discountRepository.findById(discountReq.getDcId())
                .orElseThrow(() -> new RuntimeException("Discount not found"));
        discount.setCode(discountReq.getCode());
        discount.setMethod(discountReq.getMethod());
        discount.setValue(discountReq.getValue());
        discount.setQuantity(discountReq.getQuantity());
        discount.setExpiresAt(discountReq.getExpiresAt());
        discount.setUpdateUserId(String.valueOf(userContext.getUserId())); // Use String.valueOf
        discount.setUpdateDateTime(new Date(System.currentTimeMillis())); // Set updateDateTime
        return discountRepository.save(discount);
    }

    public void deleteDiscount(Integer dcId) {
        User userContext = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!"1".equals(userContext.getAuthority())) {
            throw new RuntimeException("Permission denied: Only users with Authority = 1 can delete discounts.");
        }
        if (!discountRepository.existsById(dcId)) {
            throw new RuntimeException("Discount not found");
        }
        discountRepository.deleteById(dcId);
    }

    public List<Discount> getAllDiscounts() {
        return discountRepository.findAll();
    }

    public List<Discount> getDiscountsByMethod(int method) {
        return discountRepository.findByMethod(method); // Use repository method
    }

    public void recordDiscountUsage(Integer dcId, Integer userId) {
        UsageId usageId = new UsageId(dcId, userId); // Create composite key
        DiscountUsage discountUsage = new DiscountUsage();
        discountUsage.setUsageId(usageId); // Set composite key
        discountUsage.setCreateDateTime(new Date(System.currentTimeMillis()));
        discountUsageRepository.save(discountUsage); // Save DiscountUsage record
    }
}
