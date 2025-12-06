package com.nln.hospitalsystem.service.Impl;

import com.nln.hospitalsystem.dto.schedule.ScheduleDTO;
import com.nln.hospitalsystem.dto.schedule.ScheduleMapper;
import com.nln.hospitalsystem.entity.*;
import com.nln.hospitalsystem.entity.key.DoctorScheduleKey;
import com.nln.hospitalsystem.enums.*;
import com.nln.hospitalsystem.payload.request.schedule.ScheduleByDocRequest;
import com.nln.hospitalsystem.payload.request.schedule.ScheduleRequest;
import com.nln.hospitalsystem.repository.*;
import com.nln.hospitalsystem.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ScheduleServiceImpl implements ScheduleService {
    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private DoctorScheduleRepository doctorScheduleRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private SlotRepository slotRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Value("${system.doctor.change-limit-days}")
    private int doctorChangeLimitDays;

    @Override
    public List<ScheduleDTO> getSchedulesbySchedule(Integer specialtyId) {
        List<DoctorSchedule> doctorSchedules;

        if (specialtyId == null) {
            // Lấy tất cả
            doctorSchedules = doctorScheduleRepository.findAll();
        } else {
            // Lấy theo chuyên khoa
            doctorSchedules = doctorScheduleRepository.findBySpecialtyId(specialtyId);
        }

        return doctorSchedules.stream()
                .map(ScheduleMapper::toDTO) // truyền thẳng DoctorSchedule
                .collect(Collectors.toList());
    }


    @Override
    public void createSchedule(ScheduleRequest scheduleRequest) {
        LocalDate today = LocalDate.now();
        if (scheduleRequest.getWorkDate().isBefore(today)) {
            throw new IllegalArgumentException("Work date must be today or in the future");
        }

        // Doctor
        Doctor doctor = doctorRepository.findById(scheduleRequest.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor Not Found"));

        // Shift info
        Shifts shift = scheduleRequest.getShift();
        LocalTime startTime = shift.getStartTime();
        LocalTime endTime = shift.getEndTime();

        // Lặp lại theo repeat
        int repeatCount = scheduleRequest.getRepeatCount() != null ? scheduleRequest.getRepeatCount() : 1;
        RepeatSchedule repeatType = scheduleRequest.getRepeat();

        if (repeatType == RepeatSchedule.NONE) {
            repeatCount = 1;
        }

        for (int i = 0; i < repeatCount; i++) {
            LocalDate targetDate = scheduleRequest.getWorkDate();

            if (i > 0) { // apply repeat
                if (repeatType == RepeatSchedule.DAILY) {
                    targetDate = targetDate.plusDays(i);
                } else if (repeatType == RepeatSchedule.WEEKLY) {
                    targetDate = targetDate.plusWeeks(i);
                } else if (repeatType == RepeatSchedule.MONTHLY) {
                    targetDate = targetDate.plusMonths(i);
                }
            }

            // 1. Tạo hoặc lấy Schedule
            LocalDate finalDate = targetDate;
            Schedule schedule = scheduleRepository.findByWorkDate(finalDate)
                    .orElseGet(() -> {
                        Schedule s = new Schedule();
                        s.setWorkDate(finalDate);
                        s.setStatus(ShiftStatus.AVAILABLE);
//                        s.setShiftType(scheduleRequest.getShift());
                        return scheduleRepository.save(s);
                    });

            // 2. Tạo hoặc lấy DoctorSchedule
            DoctorScheduleKey key = new DoctorScheduleKey(doctor.getId(), schedule.getId(), shift);
            DoctorSchedule doctorSchedule = doctorScheduleRepository.findById(key)
                    .orElseGet(() -> {
                        DoctorSchedule ds = new DoctorSchedule();
                        ds.setId(key);
                        ds.setDoctor(doctor);
                        ds.setSchedule(schedule);
                        ds.setStartTime(startTime);
                        ds.setEndTime(endTime);
                        ds.setShiftType(shift);
                        ds.setNote(scheduleRequest.getNote());
                        ds.setStatus(scheduleRequest.getStatus());
                        return doctorScheduleRepository.save(ds);
                    });

            // 3. Sinh slot theo slotMinutes
            if (scheduleRequest.getSlotMinutes() != null && scheduleRequest.getSlotMinutes() > 0) {
                int slotMinutes = scheduleRequest.getSlotMinutes();
                LocalTime slotStart = startTime;

                while (slotStart.plusMinutes(slotMinutes).compareTo(endTime) <= 0) {
                    LocalTime slotEnd = slotStart.plusMinutes(slotMinutes);

                    boolean exists = slotRepository.existsByDoctorScheduleAndStartTimeAndEndTime(
                            doctorSchedule, slotStart, slotEnd
                    );

                    if (!exists) {
                        Slot slot = new Slot();
                        slot.setDoctorSchedule(doctorSchedule);
                        slot.setStatus(SlotStatus.AVAILABLE);
                        slot.setStartTime(slotStart);
                        slot.setEndTime(slotEnd);
                        slotRepository.save(slot);
                    }
                    slotStart = slotEnd; // move next slot
                }
            }
        }
    }

    @Override
    public void createScheduleByDoctor(ScheduleByDocRequest request) {
        LocalDate today = LocalDate.now();
        if (request.getWorkDate().isBefore(today)) {
            throw new IllegalArgumentException("Work date must be today or in the future");
        }

        // Doctor
        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor Not Found"));

        // Shift info
        Shifts shift = request.getShift();
        LocalTime startTime = shift.getStartTime();
        LocalTime endTime = shift.getEndTime();

        // Lặp lại theo repeat
        int repeatCount = request.getRepeatCount() != null ? request.getRepeatCount() : 1;
        RepeatSchedule repeatType = request.getRepeat();

        if (repeatType == RepeatSchedule.NONE) {
            repeatCount = 1;
        }

        for (int i = 0; i < repeatCount; i++) {
            LocalDate targetDate = request.getWorkDate();

            if (i > 0) { // apply repeat
                if (repeatType == RepeatSchedule.DAILY) {
                    targetDate = targetDate.plusDays(i);
                } else if (repeatType == RepeatSchedule.WEEKLY) {
                    targetDate = targetDate.plusWeeks(i);
                } else if (repeatType == RepeatSchedule.MONTHLY) {
                    targetDate = targetDate.plusMonths(i);
                }
            }

            // 1. Tạo hoặc lấy Schedule
            LocalDate finalDate = targetDate;
            Schedule schedule = scheduleRepository.findByWorkDate(finalDate)
                    .orElseGet(() -> {
                        Schedule s = new Schedule();
                        s.setWorkDate(finalDate);
                        s.setStatus(ShiftStatus.AVAILABLE);
                        return scheduleRepository.save(s);
                    });

            // 2. Tạo hoặc lấy DoctorSchedule
            DoctorScheduleKey key = new DoctorScheduleKey(doctor.getId(), schedule.getId(), shift);
            DoctorSchedule doctorSchedule = doctorScheduleRepository.findById(key)
                    .orElseGet(() -> {
                        DoctorSchedule ds = new DoctorSchedule();
                        ds.setId(key);
                        ds.setDoctor(doctor);
                        ds.setSchedule(schedule);
                        ds.setStartTime(startTime);
                        ds.setEndTime(endTime);
                        ds.setNote(request.getNote());
                        ds.setStatus(DoctorScheduleStatus.PENDING);
                        return doctorScheduleRepository.save(ds);
                    });

            // 3. Sinh slot theo slotMinutes
            if (request.getSlotMinutes() != null && request.getSlotMinutes() > 0) {
                int slotMinutes = request.getSlotMinutes();
                LocalTime slotStart = startTime;

                while (slotStart.plusMinutes(slotMinutes).compareTo(endTime) <= 0) {
                    LocalTime slotEnd = slotStart.plusMinutes(slotMinutes);

                    boolean exists = slotRepository.existsByDoctorScheduleAndStartTimeAndEndTime(
                            doctorSchedule, slotStart, slotEnd
                    );

                    if (!exists) {
                        Slot slot = new Slot();
                        slot.setDoctorSchedule(doctorSchedule);
                        slot.setStatus(SlotStatus.UNAVAILABLE);
                        slot.setStartTime(slotStart);
                        slot.setEndTime(slotEnd);

                        slotRepository.save(slot);
                    }

                    slotStart = slotEnd; // move next slot
                }
            }
        }
    }

    @Override
    public void updateSchedule(ScheduleRequest scheduleRequest) {
        // ===== 1. Kiểm tra ngày =====
        LocalDate today = LocalDate.now();
        if (scheduleRequest.getWorkDate() == null) {
            throw new IllegalArgumentException("Work date is required for update");
        }
        if (!scheduleRequest.getWorkDate().isAfter(today)) {
            throw new IllegalArgumentException("Only schedules from tomorrow can be updated");
        }
        if (scheduleRequest.getWorkDate().isBefore(today.plusDays(doctorChangeLimitDays))) {
            throw new IllegalArgumentException("Lịch chỉ có thể thay đổi nếu còn ít nhất 30 ngày nữa tới ngày làm việc");
        }

        // ===== 2. Lấy lịch cũ =====
        DoctorScheduleKey key = new DoctorScheduleKey(scheduleRequest.getDoctorId(), scheduleRequest.getScheduleId(),  scheduleRequest.getShift());
        DoctorSchedule oldSchedule = doctorScheduleRepository.findById(key)
                .orElseThrow(() -> new RuntimeException("DoctorSchedule not found"));

        // ===== 3. Nếu KHÔNG đổi ngày và KHÔNG đổi ca (shift) → update trực tiếp =====
        boolean sameDay = oldSchedule.getSchedule().getWorkDate().equals(scheduleRequest.getWorkDate());
        boolean sameShift = oldSchedule.getShiftType() == scheduleRequest.getShift();

        if (sameDay && sameShift) {
            // 👉 Cập nhật trực tiếp
            oldSchedule.setStatus(scheduleRequest.getStatus());
            oldSchedule.setNote(scheduleRequest.getNote());
            doctorScheduleRepository.save(oldSchedule);

            // Nếu cần sinh lại slot → xoá mềm slot cũ rồi tạo lại
            if (scheduleRequest.getSlotMinutes() != null && scheduleRequest.getSlotMinutes() > 0) {
                softDeleteSlotsByDoctorSchedule(oldSchedule);
                generateSlots(oldSchedule, scheduleRequest.getSlotMinutes());
            }
            return;
        }

        // ===== 4. Nếu có đổi ngày hoặc ca → huỷ ca cũ, tạo ca mới =====
        oldSchedule.setStatus(DoctorScheduleStatus.CANCELLED);
        oldSchedule.setNote("Replaced by new schedule at " + LocalDateTime.now());
        doctorScheduleRepository.save(oldSchedule);

        cancelAppointmentsByDoctorSchedule(oldSchedule);

        // Lấy hoặc tạo schedule mới
        Schedule schedule = oldSchedule.getSchedule();
        if (!sameDay) {
            schedule = scheduleRepository.findByWorkDate(scheduleRequest.getWorkDate())
                    .orElseGet(() -> {
                        Schedule s = new Schedule();
                        s.setWorkDate(scheduleRequest.getWorkDate());
                        s.setStatus(ShiftStatus.AVAILABLE);
                        return scheduleRepository.save(s);
                    });
        }

        Doctor doctor = oldSchedule.getDoctor();
        boolean exists = doctorScheduleRepository.existsByDoctorAndScheduleWorkDateAndScheduleShiftType(
                doctor, scheduleRequest.getWorkDate(), scheduleRequest.getShift()
        );
        if (exists) {
            throw new IllegalArgumentException("Doctor already has a schedule for this shift on " + schedule.getWorkDate());
        }

        // Tạo ca mới
        DoctorScheduleKey newKey = new DoctorScheduleKey(doctor.getId(), schedule.getId(), scheduleRequest.getShift());
        DoctorSchedule newSchedule = DoctorSchedule.builder()
                .id(newKey)
                .doctor(doctor)
                .schedule(schedule)
                .startTime(scheduleRequest.getShift().getStartTime())
                .endTime(scheduleRequest.getShift().getEndTime())
                .status(scheduleRequest.getStatus())
                .note(scheduleRequest.getNote())
                .build();

        doctorScheduleRepository.save(newSchedule);

        // Sinh slots mới nếu có
        if (scheduleRequest.getSlotMinutes() != null && scheduleRequest.getSlotMinutes() > 0) {
            generateSlots(newSchedule, scheduleRequest.getSlotMinutes());
        }
    }

// ===== HÀM HỖ TRỢ =====

    private void cancelAppointmentsByDoctorSchedule(DoctorSchedule doctorSchedule) {
        // Lấy tất cả appointment thuộc ca này
        List<Appointment> appointments = appointmentRepository.findBySlot_DoctorSchedule(doctorSchedule);

        for (Appointment appointment : appointments) {
            AppointmentStatus status = appointment.getStatus();

            // Nếu đã xác nhận (CONFIRMED) -> không cho đổi
            if (status == AppointmentStatus.CONFIRMED) {
                throw new IllegalStateException(
                        "Không thể huỷ hoặc đổi ca vì có cuộc hẹn đã được xác nhận (ID: " + appointment.getId() + ")"
                );
            }

            // Nếu chưa bị huỷ thì huỷ bằng lý do bác sĩ
            if (status != AppointmentStatus.CANCELLED_BY_PATIENT
                    && status != AppointmentStatus.CANCELLED_BY_ADMIN
                    && status != AppointmentStatus.REJECTED
                    && status != AppointmentStatus.CANCELLED_BY_DOCTOR) {
                appointment.setStatus(AppointmentStatus.CANCELLED_BY_DOCTOR);
                appointment.setNote("Cuộc hẹn bị huỷ do bác sĩ thay đổi lịch (" + LocalDateTime.now() + ")");
            }
        }

        // Lưu lại tất cả thay đổi
        appointmentRepository.saveAll(appointments);
    }


    // Soft delete (đánh dấu slot cũ là CANCELLED)
    private void softDeleteSlotsByDoctorSchedule(DoctorSchedule schedule) {
        List<Slot> slots = slotRepository.findByDoctorSchedule(schedule);
        for (Slot s : slots) {
            s.setStatus(SlotStatus.CANCELLED);
        }
        slotRepository.saveAll(slots);
    }

    // Sinh lại slot mới
    private void generateSlots(DoctorSchedule schedule, int slotMinutes) {
        LocalTime start = schedule.getStartTime();
        while (start.plusMinutes(slotMinutes).compareTo(schedule.getEndTime()) <= 0) {
            LocalTime end = start.plusMinutes(slotMinutes);
            Slot slot = new Slot();
            slot.setDoctorSchedule(schedule);
            slot.setStatus(SlotStatus.AVAILABLE);
            slot.setStartTime(start);
            slot.setEndTime(end);
            slotRepository.save(slot);
            start = end;
        }
    }
//    public void updateSchedule(ScheduleRequest scheduleRequest) {
//        // Check ngày sửa (Lon hon ngay hien tai)
//        LocalDate today = LocalDate.now();
//        if (scheduleRequest.getWorkDate() == null) {
//            throw new IllegalArgumentException("Work date is required for update");
//        }
//        if (!scheduleRequest.getWorkDate().isAfter(today)) {
//            throw new IllegalArgumentException("Only schedules from tomorrow can be updated");
//        }
//
//        DoctorScheduleKey key = new DoctorScheduleKey(scheduleRequest.getDoctorId(), scheduleRequest.getScheduleId());
//        DoctorSchedule oldSchedule = doctorScheduleRepository.findById(key)
//                .orElseThrow(() -> new RuntimeException("DoctorSchedule not found"));
//
//        // 2. Đánh dấu ca cũ là CANCELLED
//        oldSchedule.setStatus(DoctorScheduleStatus.CANCELLED);
//        oldSchedule.setNote("Replaced by new schedule at " + LocalDateTime.now());
//        doctorScheduleRepository.save(oldSchedule);
//
//        // 3. Tạo ca mới (Schedule vẫn giữ nguyên ngày, hoặc lấy ngày mới nếu request có)
//        Schedule schedule = oldSchedule.getSchedule();
//        if (scheduleRequest.getWorkDate() != null && !scheduleRequest.getWorkDate().equals(schedule.getWorkDate())) {
//            // Nếu muốn đổi ngày thì tạo schedule mới
//            schedule = scheduleRepository.findByWorkDate(scheduleRequest.getWorkDate())
//                    .orElseGet(() -> {
//                        Schedule s = new Schedule();
//                        s.setWorkDate(scheduleRequest.getWorkDate());
//                        s.setStatus(ShiftStatus.AVAILABLE);
//                        return scheduleRepository.save(s);
//                    });
//        }
//
//        Doctor doctor = oldSchedule.getDoctor();
//        boolean exists = doctorScheduleRepository.existsByDoctorAndWorkDateAndShiftType(
//                doctor, scheduleRequest.getWorkDate(), scheduleRequest.getShift()
//        );
//        if (exists) {
//            throw new IllegalArgumentException("Doctor already has a schedule for this shift on " + schedule.getWorkDate());
//        }
//
//
//        DoctorScheduleKey newKey = new DoctorScheduleKey(doctor.getId(), schedule.getId());
//
//        DoctorSchedule newSchedule = DoctorSchedule.builder()
//                .id(newKey)
//                .doctor(doctor)
//                .schedule(schedule)
//                .startTime(scheduleRequest.getShift().getStartTime())
//                .endTime(scheduleRequest.getShift().getEndTime())
//                .shiftType(scheduleRequest.getShift())
//                .status(scheduleRequest.getStatus())
//                .note(scheduleRequest.getNote())
//                .build();
//
//        doctorScheduleRepository.save(newSchedule);
//
//        // 4. Sinh slots mới nếu có
//        if (scheduleRequest.getSlotMinutes() != null && scheduleRequest.getSlotMinutes() > 0) {
//            int slotMinutes = scheduleRequest.getSlotMinutes();
//            LocalTime slotStart = newSchedule.getStartTime();
//
//            while (slotStart.plusMinutes(slotMinutes).compareTo(newSchedule.getEndTime()) <= 0) {
//                LocalTime slotEnd = slotStart.plusMinutes(slotMinutes);
//
//                Slot slot = new Slot();
//                slot.setDoctorSchedule(newSchedule);
//                slot.setStatus(SlotStatus.AVAILABLE);
//                slot.setStartTime(slotStart);
//                slot.setEndTime(slotEnd);
//
//                slotRepository.save(slot);
//                slotStart = slotEnd;
//            }
//        }
//    }

//    @Override
//    public void delelteSchedule(Integer doctorId, Long scheduleId) {
//        DoctorScheduleKey key = new DoctorScheduleKey(doctorId, scheduleId, );
//        DoctorSchedule doctorSchedule = doctorScheduleRepository.findById(key)
//                .orElseThrow(() -> new RuntimeException("DoctorSchedule not found"));
//
//        doctorSchedule.setStatus(DoctorScheduleStatus.CANCELLED);
//        doctorSchedule.setNote("Cancelled at " + LocalDateTime.now());
//        doctorScheduleRepository.save(doctorSchedule);
//
//        // Optionally: cập nhật tất cả slots -> CANCELLED
//        List<Slot> slots = slotRepository.findByDoctorSchedule(doctorSchedule);
//        slots.forEach(slot -> slot.setStatus(SlotStatus.CANCELLED));
//        slotRepository.saveAll(slots);
//    }


}
