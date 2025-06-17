/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.Perfume.filter;

/**
 *
 * @author badao
 */
import com.example.Perfume.am.JwtUtil;
import com.example.Perfume.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import com.example.Perfume.jpa.entity.Token;
import com.example.Perfume.jpa.repository.TokenRepository;
import io.jsonwebtoken.ExpiredJwtException;

@Component
public class JWTRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    @Autowired
    private TokenRepository tokenRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {

        } else {
            final String authHeader = request.getHeader("Authorization");

            String username = null;
            String jwt = null;

            try {
                // Extract the JWT token and username
                if (authHeader != null && authHeader.startsWith("Bearer")) {
                    jwt = authHeader.substring(7);
                    username = jwtUtil.extractUsername(jwt);
                }

                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                    // Validate the token against the database
                    if (jwtUtil.isTokenValid(jwt, userDetails.getUsername())) {
                        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities());
                        authToken.setDetails(
                                new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authToken);
                    }
                }

            } catch (ExpiredJwtException ex) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json");
                response.getWriter().write("{\"message\": \"JWT token has expired\"}");
                SecurityContextHolder.clearContext();
                tokenRepository.deleteByToken(jwt);
                return; // <--- This is important!
            } catch (Exception ex) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json");
                response.getWriter().write("{\"message\": \"Other error has occured\"}");
                return; // <--- This is important!
            }
        }
        // Proceed with the next filter in the chain
        filterChain.doFilter(request, response);
    }
}
