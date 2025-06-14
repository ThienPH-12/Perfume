package com.example.Perfume.service;

import com.example.Perfume.jpa.repository.ConfirmationTokenRepository;
import com.example.Perfume.jpa.entity.ConfirmationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.Optional;

@Service
public class ConfirmationTokenService {

    @Autowired
    private ConfirmationTokenRepository confirmationTokenRepository;

    public void saveConfirmationToken(ConfirmationToken token) {
        confirmationTokenRepository.save(token);
    }

    public Optional<ConfirmationToken> getToken(String token) {
        return confirmationTokenRepository.findByToken(token);
    }

    public void setConfirmedAt(String token) {
        ConfirmationToken confirmationToken = getToken(token)
                .orElseThrow(() -> new RuntimeException("Token not found"));
        confirmationToken.setConfirmedAt(new Date()); // Use java.util.Date
        confirmationTokenRepository.save(confirmationToken);
    }

    public void deleteToken(String token) {
        confirmationTokenRepository.deleteByToken(token);
    }

    public void deleteTokenById(Integer id) {
        confirmationTokenRepository.deleteById(id);
    }
}
