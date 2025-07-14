/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.Perfume.service;

import com.example.Perfume.jpa.entity.TransactionRecord;
import com.example.Perfume.jpa.repository.TransactionRecordRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.payos.type.ItemData;

/**
 *
 * @author badao
 */
@Service
public class OrderService {

    @Autowired
    private TransactionRecordRepository recordRepository;

    public TransactionRecord addOrder(long orderCode, int id, List<ItemData> items) {
        String itemsString = items.stream()
                .map(item -> item.getName() + "|" + item.getPrice() + "|" + item.getQuantity())
                .collect(Collectors.joining(";"));

        TransactionRecord data = new TransactionRecord(orderCode, id,itemsString);
        return recordRepository.save(data);
    }

    public List<TransactionRecord> getUserOrders(int id) {
        return recordRepository.findByUserId(id);
    }
}
