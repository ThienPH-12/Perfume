/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.Perfume.am;

/**
 *
 * @author badao
 */
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

import com.example.Perfume.jpa.entity.Token;
import com.example.Perfume.jpa.repository.TokenRepository;
import com.example.Perfume.jpa.entity.User;
import java.util.HashMap;
import java.util.Map;
import java.util.Base64;

@Component
public class JwtUtil {

    private final Key key;
    private final long jwtExpiration;

    @Autowired
    private TokenRepository tokenRepository;

    public JwtUtil(@Value("${jwt.expiration}") long jwtExpiration, @Value("${jwt.secret}") String secret) {
        this.jwtExpiration = jwtExpiration;
        try {
            byte[] decodedKey = Base64.getDecoder().decode(secret);
            this.key = Keys.hmacShaKeyFor(decodedKey);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid Base64 secret key", e);
        }
    }

    public String generateToken(UserDetails userDetails) {
        User user = (User) userDetails;
        Map<String, Object> claims = new HashMap<>(user.getAdditionalAttributes());
        claims.put("sub", userDetails.getUsername());
        claims.put("iat", new Date(System.currentTimeMillis()));
        claims.put("exp", new Date(System.currentTimeMillis() + jwtExpiration));
        claims.put("authority", user.getAuthorities().toString());
        
        String token = Jwts.builder()
                .setClaims(claims)
                .signWith(key)
                .compact();
        saveToken(token, userDetails.getUsername(), new Date(System.currentTimeMillis() + jwtExpiration));
        return token;
    }

    private void saveToken(String token, String username, Date expirationDate) {
        Token tokenEntity = new Token();
        tokenEntity.setToken(token);
        tokenEntity.setUserName(username);
        tokenEntity.setExpirationDate(expirationDate);
        tokenEntity.setCreateDateTime(new Date(System.currentTimeMillis()));
        tokenEntity.setCreateUserId("system");
        tokenRepository.save(tokenEntity);
    }

    public String generateRefreshToken(UserDetails userDetails) {
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration * 2)) // Refresh token with longer expiration
                .signWith(key)
                .compact();
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
        return claimsResolver.apply(claims);
    }

    public boolean isTokenValid(String token, String userName) {
        Token tokenEntity = tokenRepository.findByToken(token).orElseThrow(() -> new RuntimeException("Token không tồn tại."));
        return tokenEntity != null && !isTokenExpired(token) && tokenEntity.getUserName().equals(userName);
    }

    public boolean isTokenExpired(String token) {
        boolean expired = extractClaim(token, Claims::getExpiration).before(new Date());
        if (expired) {
            tokenRepository.deleteByToken(token);
        }
        return expired;
    }

    public void invalidateToken(String token) {
        tokenRepository.deleteByToken(token);
    }
}
