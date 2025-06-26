/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.Perfume.config;

import com.example.Perfume.filter.JWTRequestFilter;
import com.example.Perfume.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private UserDetailsServiceImpl UserDetailsService;

    @Autowired
    private JWTRequestFilter jwtRequestFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        String allowList[] = {
            "/api/auth/login",
            "/api/user/register", // Added new API
            "/api/user/activateUser", // Added new API
            "/api/user/resendActivation",
            "/api/blogs",
            "/api/categories",
            "/api/capacities",
            "/api/products",
            "/api/mixProducts",
            "/api/blog/image/**",
            "/api/product/image/**",
            "/api/mixProduct/image/**",
            "/api/price/search",
            "/api/product/search/**",
            "/api/blog/search/**",
            "/api/price/list/**",
            "/api/createPayment",
            "/api/order/**",
            "/api/products/latest", // Added new API
            "/api/products/potentialCus/**", // Added new API
            "/api/products/category/**"
        };
        http.csrf(AbstractHttpConfigurer::disable)
                .cors().and()
                .authorizeHttpRequests(api -> api
                .requestMatchers(allowList).permitAll() // Allow access to /api/auth/login and /api/user/register
                .requestMatchers("/api/admin").hasAnyAuthority("1")
                .anyRequest().authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                ).authenticationProvider(authenticationProvider()).addFilterBefore(
                jwtRequestFilter, UsernamePasswordAuthenticationFilter.class
        );
        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(UserDetailsService);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        return daoAuthenticationProvider;
    }

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.addAllowedOrigin("http://localhost:3000"); // Corrected URL
        corsConfig.addAllowedOrigin("https://perfume-1-e16y.onrender.com"); //Deploy URL
        corsConfig.addAllowedOrigin("https://shineaura.io.vn/"); //Deploy URL
        corsConfig.addAllowedOrigin("https://www.shineaura.io.vn/"); //Deploy URL
        corsConfig.addAllowedMethod("*");
        corsConfig.addAllowedHeader("*");
        corsConfig.setAllowCredentials(true); // Add this line

        UrlBasedCorsConfigurationSource urlBasedCorsConfig = new UrlBasedCorsConfigurationSource();
        urlBasedCorsConfig.registerCorsConfiguration("/**", corsConfig);
        return new CorsFilter(urlBasedCorsConfig);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

}
