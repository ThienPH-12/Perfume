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
                    Token tokenEntity = tokenRepository.findByToken(jwt);
                    if (tokenEntity != null && jwtUtil.isTokenValid(jwt, userDetails.getUsername())) {
                        if (jwtUtil.isTokenExpired(jwt)) {
                        } else {
                            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities());
                            authToken.setDetails(
                                    new WebAuthenticationDetailsSource().buildDetails(request));
                            SecurityContextHolder.getContext().setAuthentication(authToken);
                        }
                    }
                }

            } catch (Exception ex) {
                logger.error("Error occurred during JWT token validation", ex);
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
                return;
            }
        }
        // Proceed with the next filter in the chain
        filterChain.doFilter(request, response);
    }
}
