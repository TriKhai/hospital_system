package com.nln.hospitalsystem.config;

import com.nln.hospitalsystem.security.JwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class MySecurityConfig {

    @Autowired
    CorsConfigurationSource corsConfigurationSource;

    @Autowired
    JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable) // Tắt CSRF (nếu không cần)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Stateless session
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**").permitAll() // Cho phép truy cập các endpoint bắt đầu bằng /login/
                        .requestMatchers("/admin/**").hasRole("STAFF")
                        .anyRequest().authenticated() // Các request khác phải xác thực
                )
                .cors(cors -> cors.configurationSource(corsConfigurationSource));
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }



}
