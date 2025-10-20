package com.nln.hospitalsystem.config;

import com.nln.hospitalsystem.security.JwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
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
//        System.out.println(">>> SecurityFilterChain bean loaded");
        http.csrf(AbstractHttpConfigurer::disable) // Tắt CSRF (nếu không cần)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Stateless session
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/register-doctor").hasRole("ADMIN")
                        .requestMatchers("/auth/**").permitAll() // Cho phép truy cập các endpoint bắt đầu bằng /login/

                        .requestMatchers(HttpMethod.GET, "/department").permitAll()
                        .requestMatchers("/department/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.GET, "/specialty").permitAll()
                        .requestMatchers("/specialty/**").hasRole("ADMIN")

                        .requestMatchers("/doctor/specialty").permitAll()
                        .requestMatchers("/doctor/doctor-work").permitAll()
                        .requestMatchers(HttpMethod.GET, "/doctor").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/doctor/count").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/doctor/profile").hasRole("DOCTOR")
                        .requestMatchers(HttpMethod.PUT, "/doctor/avatar").hasRole("DOCTOR")
                        .requestMatchers(HttpMethod.PUT, "/doctor/infor").hasRole("DOCTOR")
                        .requestMatchers(HttpMethod.GET, "/doctor/schedule").hasRole("DOCTOR")
                        .requestMatchers("/doctor/profile").hasAnyRole("ADMIN", "DOCTOR")

                        .requestMatchers(HttpMethod.GET, "/patient").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/patient/count").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/patient/profile").hasRole("PATIENT")
                        .requestMatchers(HttpMethod.PUT, "/patient/avatar").hasRole("PATIENT")
                        .requestMatchers(HttpMethod.PUT, "/patient/infor").hasRole("PATIENT")

                        .requestMatchers("/drug-type/**").permitAll()

                        .requestMatchers("/manufacturer/**").permitAll()

                        .requestMatchers("/supplier/**").permitAll()

                        .requestMatchers(HttpMethod.GET, "/drug").permitAll()
                        .requestMatchers(HttpMethod.GET, "/drug/count").permitAll()
                        .requestMatchers("/drug/**").permitAll()

                        .requestMatchers("/account/**").hasRole("ADMIN")

                        .requestMatchers("/staff-schedule/**").hasAnyRole("ADMIN", "DOCTOR")
                        .requestMatchers("/work/**").hasAnyRole("ADMIN", "DOCTOR")
                        .requestMatchers("/schedule/**").hasAnyRole("ADMIN", "DOCTOR")

                        .requestMatchers(HttpMethod.POST, "/appointment").hasRole("PATIENT")
                        .requestMatchers(HttpMethod.GET, "/appointment").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/appointment").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/appointment/patient").hasAnyRole("ADMIN", "PATIENT")
                        .requestMatchers(HttpMethod.GET, "/appointment/doctor").hasAnyRole("DOCTOR", "PATIENT")
                        .requestMatchers(HttpMethod.PATCH, "/appointment/{id}/cancel-by-patient").hasRole("PATIENT")
                        .requestMatchers(HttpMethod.PATCH, "/appointment/{id}/cancel-by-doctor").hasRole("DOCTOR")
                        .requestMatchers(HttpMethod.PATCH, "/appointment/{id}/confirm-by-doctor").hasRole("DOCTOR")

                        .requestMatchers(HttpMethod.GET, "/doctor-schedule").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/doctor-schedule/{doctorId}/{scheduleId}/approve").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/doctor-schedule/{doctorId}/{scheduleId}/cancel").hasRole("ADMIN")


                        .anyRequest().authenticated() // Các request khác phải xác thực
                )
                .cors(cors -> cors.configurationSource(corsConfigurationSource));
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
