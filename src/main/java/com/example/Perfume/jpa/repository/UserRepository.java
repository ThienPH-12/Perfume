/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.Perfume.jpa.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Perfume.jpa.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
/**
 *
 * @author badao
 */

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserName(@Param("userName") String username);
    
    boolean existsByUserName(@Param("userName") String username);
    
    boolean existsByEmail(@Param("email") String email);
}
