package com.nln.hospitalsystem.security;

import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.util.Base64;

public class SKGenerator {
    public static void main(String[] args) {
        // Tạo byte array 256-bit ngẫu nhiên
        byte[] keyBytes = new byte[32]; // 32 bytes = 256 bit
        new java.security.SecureRandom().nextBytes(keyBytes);

        // Tạo SecretKey từ byte array
        SecretKey key = Keys.hmacShaKeyFor(keyBytes);

        // Encode Base64 để lưu
        String encodedKey = Base64.getEncoder().encodeToString(key.getEncoded());
        System.out.println("Secret Key (Base64): " + encodedKey);
    }
}
