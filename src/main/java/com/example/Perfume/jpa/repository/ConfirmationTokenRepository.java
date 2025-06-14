package com.example.Perfume.jpa.repository;

import com.example.Perfume.jpa.entity.ConfirmationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ConfirmationTokenRepository extends JpaRepository<ConfirmationToken, Integer> {
    Optional<ConfirmationToken> findByToken(String token);
    void deleteByToken(String token);
}
