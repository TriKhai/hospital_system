package com.nln.hospitalsystem.dto.appointment;

import com.nln.hospitalsystem.dto.doctor.DoctorDTO;
import com.nln.hospitalsystem.dto.patient.PatientDTO;
import com.nln.hospitalsystem.dto.slot.SlotDTO;
import com.nln.hospitalsystem.enums.AppointmentStatus;
import com.nln.hospitalsystem.enums.RecordStatus;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AppointmentDTO {
    private Integer id;
    private String note;
    private AppointmentStatus status;

    // Bệnh nhân
    private PatientDTO patient;
    // Bác sĩ
    private DoctorDTO doctor;
    // Slot
    private SlotDTO slot;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}