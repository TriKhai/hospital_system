package com.nln.hospitalsystem.service.Impl;

import com.nln.hospitalsystem.dto.work.WorkDTO;
import com.nln.hospitalsystem.dto.work.WorkMapper;
import com.nln.hospitalsystem.entity.*;
import com.nln.hospitalsystem.entity.key.DoctorWorkDetailKey;
import com.nln.hospitalsystem.entity.key.DoctorWorkKey;
import com.nln.hospitalsystem.enums.ScheduleStatus;
import com.nln.hospitalsystem.payload.request.work.WorkRequest;
import com.nln.hospitalsystem.repository.*;
import com.nln.hospitalsystem.service.WorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class WorkServiceImpl implements WorkService {

    @Autowired
    private WorkRepository workRepository;

    @Autowired
    private WorkShiftRepository workShiftRepository;

    @Autowired
    private WorkDetailRepository workDetailRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private DoctorWorkDetailRepository doctorWorkDetailRepository;

    @Override
    public void createWork(WorkRequest request) {
        // 1. Check doctor
        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        // 2. Check work (ngày)
        Work work = workRepository.findByWorkDate(request.getWorkDate())
                .orElseGet(() -> {
                    Work newWork = new Work();
                    newWork.setWorkDate(request.getWorkDate());
                    return workRepository.save(newWork);
                });

        // 3. Check shift (ca)
        WorkShift shift = work.getWorkShifts().stream()
                .filter(ws -> ws.getShiftType() == request.getShift())
                .findFirst()
                .orElse(null);

        if (shift == null) {
            // 4️⃣ Tạo shift mới
            if (request.getShift() == null) {
                throw new RuntimeException("Shift must not be null");
            }

            shift = new WorkShift();
            shift.setWork(work);
            shift.setShiftType(request.getShift());

            LocalTime start = LocalTime.parse(request.getShift().getStart());
            LocalTime end   = LocalTime.parse(request.getShift().getEnd());

            if (!start.isBefore(end)) {
                throw new RuntimeException("Shift start time must be before end time");
            }

            shift.setStartTime(start);
            shift.setEndTime(end);
            shift.setDetails(new ArrayList<>());

            // 5️⃣ Persist shift trước để Hibernate quản lý id
            work.getWorkShifts().add(shift);
            workShiftRepository.save(shift);

            // 6️⃣ Chia slotMinutes thành WorkDetail và persist từng slot
            generateWorkDetails(shift, request.getSlotMinutes());
        }


        // 4. Gán bác sĩ vào các WorkDetail của shift
        for (WorkDetail detail : shift.getDetails()) {
            boolean exists = doctorWorkDetailRepository
                    .existsByIdDoctorIdAndIdWorkDetailId(doctor.getId(), detail.getId());

            if (!exists) {
                DoctorWorkDetail dwd = new DoctorWorkDetail();
                dwd.setId(new DoctorWorkDetailKey(doctor.getId(), detail.getId()));
                dwd.setDoctor(doctor);
                dwd.setWorkDetail(detail);
                doctorWorkDetailRepository.save(dwd);
            }
        }

        // 5. Lưu work (cascade sẽ lưu shift và detail)
        workRepository.save(work);
    }

//    @Override
//    public List<WorkDTO> getAllWorkShift() {
//        List<Work> works = workRepository.findAll();
//        List<WorkDTO> result = new ArrayList<>();
//
//        for (Work work : works) {
//            for (WorkShift shift : work.getWorkShifts()) {
//                Map<Integer, WorkDTO> doctorMap = new HashMap<>();
//
//                for (WorkDetail detail : shift.getDetails()) {
//                    for (DoctorWorkDetail dwd : detail.getDoctorWorkDetails()) {
//                        Doctor doctor = dwd.getDoctor();
//                        Integer doctorId = doctor.getId();
//
//                        if (!doctorMap.containsKey(doctorId)) {
//                            String specialty = doctor.getSpecialty() != null
//                                    ? doctor.getSpecialty().getName()
//                                    : "Chưa phân chuyên khoa";
//
//                            WorkDTO dto = WorkMapper.toDTO(shift, doctorId, doctor.getName(), specialty);
//
//                            // Lấy start/end từ enum Shifts
//                            LocalTime startTime = LocalTime.parse(shift.getShiftType().getStart());
//                            LocalTime endTime   = LocalTime.parse(shift.getShiftType().getEnd());
//
//                            String startStr = work.getWorkDate().atTime(startTime).toString(); // "2025-09-25T08:00"
//                            String endStr   = work.getWorkDate().atTime(endTime).toString();
//
//                            dto.setStart(startStr);
//                            dto.setEnd(endStr);
//
//                            doctorMap.put(doctorId, dto);
//                        }
//                    }
//                }
//
//                result.addAll(doctorMap.values());
//            }
//        }
//        return result;
//    }

    @Override
    public List<WorkDTO> getAllWorkShift(Integer specialtyId) {
        System.out.println(specialtyId);
        List<Work> works = workRepository.findAll();
        List<WorkDTO> result = new ArrayList<>();

        for (Work work : works) {
            for (WorkShift shift : work.getWorkShifts()) {
                Map<Integer, WorkDTO> doctorMap = new HashMap<>();

                for (WorkDetail detail : shift.getDetails()) {
                    for (DoctorWorkDetail dwd : detail.getDoctorWorkDetails()) {
                        Doctor doctor = dwd.getDoctor();
                        Integer doctorId = doctor.getId();

                        // Nếu có filter chuyên khoa, bỏ qua những bác sĩ không đúng
                        if (specialtyId != null) {
                            Integer docSpecialtyId = doctor.getSpecialty() != null
                                    ? doctor.getSpecialty().getId()
                                    : null;

                            if (!specialtyId.equals(docSpecialtyId)) {
                                continue; // skip bác sĩ này
                            }
                        }

                        if (!doctorMap.containsKey(doctorId)) {
                            String specialty = doctor.getSpecialty() != null
                                    ? doctor.getSpecialty().getName()
                                    : "Chưa phân chuyên khoa";

                            WorkDTO dto = WorkMapper.toDTO(shift, doctorId, doctor.getName(), specialty);

                            // Lấy start/end từ enum Shifts
                            LocalTime startTime = LocalTime.parse(shift.getShiftType().getStart());
                            LocalTime endTime   = LocalTime.parse(shift.getShiftType().getEnd());

                            String startStr = work.getWorkDate().atTime(startTime).toString();
                            String endStr   = work.getWorkDate().atTime(endTime).toString();

                            dto.setStart(startStr);
                            dto.setEnd(endStr);

                            doctorMap.put(doctorId, dto);
                        }
                    }
                }

                result.addAll(doctorMap.values());
            }
        }
        return result;
    }




    private void generateWorkDetails(WorkShift shift, int slotMinutes) {
        LocalTime start = shift.getStartTime();
        LocalTime end = shift.getEndTime();
        System.out.println("start:" + start);
        System.out.println("end:" + end);

        if (start == null || end == null) {
            throw new RuntimeException("Shift start or end time is null");
        }

        while (start.isBefore(end)) {
            LocalTime slotEnd = start.plusMinutes(slotMinutes);
            if (slotEnd.isAfter(end)) {
                slotEnd = end;
            }

            WorkDetail detail = new WorkDetail();
            detail.setShift(shift);
            detail.setStartTime(start);
            detail.setEndTime(slotEnd);
            detail.setStatus(ScheduleStatus.AVAILABLE);

            shift.getDetails().add(detail);
            workDetailRepository.save(detail);
            start = slotEnd;
        }
    }
}
