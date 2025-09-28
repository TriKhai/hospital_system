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
    private Integer doctorId;       // Bác sĩ
    private Long workDetailId;   // Slot làm việc
    private Integer patientId;      // Bệnh nhân
    private String note;            // Ghi chú
}
