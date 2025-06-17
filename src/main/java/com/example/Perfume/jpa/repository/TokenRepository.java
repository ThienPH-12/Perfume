package com.example.Perfume.jpa.repository;

import com.example.Perfume.jpa.entity.Token;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {
    Optional<Token> findByToken(String token);
    
    @Transactional
    void deleteByToken(String token);
}
