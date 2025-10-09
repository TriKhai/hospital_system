package com.nln.hospitalsystem.payload.request.appointment;

import com.nln.hospitalsystem.enums.AppointmentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AppointmentRequest {
    private String usernamePatient;      // Bệnh nhân
    private Long slotId;   // Slot làm việc
    private String note;            // Ghi chú
}
