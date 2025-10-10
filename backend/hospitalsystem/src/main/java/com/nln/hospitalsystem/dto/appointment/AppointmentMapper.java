package com.nln.hospitalsystem.dto.appointment;

import com.nln.hospitalsystem.dto.doctor.DoctorMapper;
import com.nln.hospitalsystem.dto.patient.PatientMapper;
import com.nln.hospitalsystem.dto.slot.SlotMapper;
import com.nln.hospitalsystem.entity.Appointment;

public class AppointmentMapper {
    public static AppointmentDTO toDTO(Appointment appointment) {
        if (appointment == null) return null;

        return AppointmentDTO.builder()
                .id(appointment.getId())
                .note(appointment.getNote())
                .status(appointment.getStatus())
                .patient(PatientMapper.toDTO(appointment.getPatient()))
                .doctor(
                        DoctorMapper.toDTO(
                                appointment.getSlot()
                                        .getDoctorSchedule()
                                        .getDoctor()
                        )
                )
                .slot(SlotMapper.toDTO(appointment.getSlot()))
                .createdAt(appointment.getCreatedAt())
                .updatedAt(appointment.getUpdatedAt())
                .build();
    }
}
