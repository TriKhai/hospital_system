package com.nln.hospitalsystem.dto.appointment;

import com.nln.hospitalsystem.enums.AppointmentStatus;
import com.nln.hospitalsystem.enums.RecordStatus;

import java.time.LocalDateTime;

public class AppointmentDTO {
    private Integer id;
    private AppointmentStatus status;
    private String note;
    private RecordStatus delStatus;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Dữ liệu phụ (nếu bạn muốn hiển thị tên bệnh nhân và slot)
    private Integer patientId;
    private String patientName;
    private Integer slotId;
    private String slotTime;
}
