package com.nln.hospitalsystem.service.Impl;

import com.nln.hospitalsystem.dto.doctorSchedule.DoctorScheduleDTO;
import com.nln.hospitalsystem.dto.doctorSchedule.DoctorScheduleMapper;
import com.nln.hospitalsystem.entity.DoctorSchedule;
import com.nln.hospitalsystem.entity.key.DoctorScheduleKey;
import com.nln.hospitalsystem.enums.DoctorScheduleStatus;
import com.nln.hospitalsystem.enums.SlotStatus;
import com.nln.hospitalsystem.repository.DoctorScheduleRepository;
import com.nln.hospitalsystem.service.DoctorScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DoctorScheduleServiceImpl implements DoctorScheduleService {
    @Autowired
    private DoctorScheduleRepository doctorScheduleRepository;

    @Override
    public List<DoctorScheduleDTO> getAll() {
        return doctorScheduleRepository.findAll().stream()
                .map(DoctorScheduleMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void approveSchedule(Integer doctorId, Long scheduleId) {
        DoctorScheduleKey key = new DoctorScheduleKey(doctorId, scheduleId);
        DoctorSchedule ds = doctorScheduleRepository.findById(key)
                .orElseThrow(() -> new RuntimeException("DoctorSchedule not found"));

        if (ds.getStatus() != DoctorScheduleStatus.PENDING) {
            throw new RuntimeException("Cannot approve a schedule not pending");
        }

        ds.setStatus(DoctorScheduleStatus.AVAILABLE);

        if (ds.getSlots() != null && !ds.getSlots().isEmpty()) {
            ds.getSlots().forEach(slot -> {
                if (slot.getStatus() != SlotStatus.BOOKED) {
                    slot.setStatus(SlotStatus.AVAILABLE);
                }
            });
        }

        doctorScheduleRepository.save(ds);
    }

    @Override
    public void cancelSchedule(Integer doctorId, Long scheduleId) {
        DoctorScheduleKey key = new DoctorScheduleKey(doctorId, scheduleId);
        DoctorSchedule ds = doctorScheduleRepository.findById(key)
                .orElseThrow(() -> new RuntimeException("DoctorSchedule not found"));

        if (ds.getStatus() != DoctorScheduleStatus.PENDING) {
            throw new RuntimeException("Cannot approve a schedule not pending");
        }

        ds.setStatus(DoctorScheduleStatus.CANCELLED);

        if (ds.getSlots() != null && !ds.getSlots().isEmpty()) {
            ds.getSlots().forEach(slot -> {
                if (slot.getStatus() != SlotStatus.BOOKED) {
                    slot.setStatus(SlotStatus.UNAVAILABLE);
                }
            });
        }

        doctorScheduleRepository.save(ds);
    }
}
