package com.nln.hospitalsystem.payload.request.drug;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SupplierRequest {
    private String name;
    private String address;
    private String phone;
    private String email;
}
