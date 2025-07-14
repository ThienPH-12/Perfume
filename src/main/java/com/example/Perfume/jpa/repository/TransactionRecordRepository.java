/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.Perfume.jpa.repository;

import com.example.Perfume.jpa.entity.TransactionRecord;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 * @author badao
 */
@Repository
public interface TransactionRecordRepository extends JpaRepository<TransactionRecord, Long> {
    
     List<TransactionRecord> findByUserId(@Param("userId") Integer userId);
}
