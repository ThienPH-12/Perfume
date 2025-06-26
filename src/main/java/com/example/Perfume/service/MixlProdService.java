package com.example.Perfume.service;

import com.example.Perfume.jpa.entity.MixProduct;
import com.example.Perfume.api.bean.req.MixProdReq;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import com.example.Perfume.jpa.repository.MixProductRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import com.example.Perfume.jpa.entity.User;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@Service
public class MixlProdService {

    @Autowired
    private MixProductRepository mixProductRepository;

    public MixProduct addMixProduct(MixProdReq mixProdReq, MultipartFile imageFile) throws IOException {
        User userContext = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!"1".equals(userContext.getAuthority())) {
            throw new RuntimeException("Permission denied: Only users with Authority = 1 can add mix products.");
        }
        MixProduct mixProduct = new MixProduct();
        String sortedCompIds = mixProdReq.getCompIds().stream()
                .sorted()
                .map(String::valueOf)
                .collect(Collectors.joining("-")); // Convert list to sorted string
        mixProduct.setCompIds(sortedCompIds);
        mixProduct.setMixProdName(mixProdReq.getMixProdName());
        mixProduct.setDescription(mixProdReq.getDescription());
        mixProduct.setPotentialCus(mixProdReq.getPotentialCus());
        mixProduct.setImageName(imageFile.getOriginalFilename());
        mixProduct.setImageType(imageFile.getContentType());
        mixProduct.setImageData(imageFile.getBytes());
        mixProduct.setCreateUserId(String.valueOf(userContext.getUserId())); // Use String.valueOf
        mixProduct.setCreateDateTime(new Date(System.currentTimeMillis()));
        return mixProductRepository.save(mixProduct);
    }

    public MixProduct updateMixProduct(MixProdReq mixProdReq, MultipartFile imageFile) throws IOException {
        User userContext = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!"1".equals(userContext.getAuthority())) {
            throw new RuntimeException("Permission denied: Only users with Authority = 1 can update mix products.");
        }
        String sortedCompIds = mixProdReq.getCompIds().stream()
                .sorted()
                .map(String::valueOf)
                .collect(Collectors.joining("-")); // Convert list to sorted string
        MixProduct old = mixProductRepository.findById(sortedCompIds)
                .orElseThrow(() -> new RuntimeException("MixProduct not found"));
        old.setMixProdName(mixProdReq.getMixProdName());
        old.setDescription(mixProdReq.getDescription());
        old.setPotentialCus(mixProdReq.getPotentialCus());
        old.setImageName(imageFile.getOriginalFilename());
        old.setImageType(imageFile.getContentType());
        old.setImageData(imageFile.getBytes());
        old.setUpdateUserId(String.valueOf(userContext.getUserId())); // Use String.valueOf
        old.setUpdateDateTime(new Date(System.currentTimeMillis()));
        return mixProductRepository.save(old);
    }

    public List<MixProduct> getAllMixProducts() {
        return mixProductRepository.findAll();
    }

    public MixProduct getMixProductById(String compIds) {
        return mixProductRepository.findById(compIds)
                .orElseThrow(() -> new RuntimeException("MixProduct not found"));
    }

    public void deleteMixProduct(String compIds) {
        User userContext = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!"1".equals(userContext.getAuthority())) {
            throw new RuntimeException("Permission denied: Only users with Authority = 1 can delete mix products.");
        }
        if (!mixProductRepository.existsById(compIds)) {
            throw new RuntimeException("MixProduct not found");
        }
        mixProductRepository.deleteById(compIds);
    }
}
