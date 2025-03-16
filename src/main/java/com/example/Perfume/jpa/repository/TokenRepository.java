package com.example.Perfume.jpa.repository;

import com.example.Perfume.jpa.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {
    Token findByToken(String token);
    void deleteByToken(String token);
}
