package com.nln.hospitalsystem.dto.account;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class LoginDTO {
//    private int id;
    private String username;
    private String role;
    private String token;
}
