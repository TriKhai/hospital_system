package com.nln.hospitalsystem.security;


import com.nln.hospitalsystem.utils.JwtUtils;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {
    @Autowired
    JwtUtils jwtUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String token = getTokenFromRequest(request);
            if (token != null && jwtUtils.verifyToken(token)) {

                // Giải mã token thành Claims
                Claims claims = jwtUtils.extractClaims(token);

                // Lấy thông tin từ Claims
                String username = claims.getSubject();
                String scope = claims.get("scope", String.class);
                System.out.println("username: " + username + " scope: " + scope);

                // Tạo danh sách quyền hạn từ "scope"

                List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_" + scope));

                // Tạo đối tượng Authentication
                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(username, null, authorities);

                // Đặt Claims vào details (tuỳ chọn)
                authenticationToken.setDetails(claims);

                // Đặt vào SecurityContext
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        filterChain.doFilter(request, response);
    }

    public String getTokenFromRequest(HttpServletRequest request) {
        String token = request.getHeader("Authorization");

//        System.out.println("token: " + token);
        if (token == null) {
            return null;
        }
        if (!token.startsWith("Bearer ")) {
            return null;
        }
        return token.substring(7);
    }
}
