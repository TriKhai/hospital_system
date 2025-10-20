package com.nln.hospitalsystem.dto.doctorSchedule;

import com.nln.hospitalsystem.dto.doctor.DoctorDTO;
import com.nln.hospitalsystem.dto.schedule.ScheduleDTO;
import com.nln.hospitalsystem.dto.schedule.ScheduleDocDTO;
import com.nln.hospitalsystem.dto.slot.SlotDTO;
import com.nln.hospitalsystem.dto.slot.SlotDocDTO;
import com.nln.hospitalsystem.entity.Doctor;
import com.nln.hospitalsystem.entity.Schedule;
import com.nln.hospitalsystem.entity.Slot;
import com.nln.hospitalsystem.entity.key.DoctorScheduleKey;
import com.nln.hospitalsystem.enums.DoctorScheduleStatus;
import com.nln.hospitalsystem.enums.Shifts;
import lombok.*;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DoctorScheduleDTO {
    private DoctorScheduleKey id;
    private DoctorDTO doctor;
    private ScheduleDocDTO schedule;
    private DoctorScheduleStatus status;
    private LocalTime startTime;
    private LocalTime endTime;
    private Shifts shiftType;
    private String note;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<SlotDocDTO> slots;
}
