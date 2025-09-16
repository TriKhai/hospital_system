package com.nln.hospitalsystem.payload.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {
    private String username;
    private String password;
}