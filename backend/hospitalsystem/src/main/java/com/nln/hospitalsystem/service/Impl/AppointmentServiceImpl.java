package com.nln.hospitalsystem.service.Impl;

import com.nln.hospitalsystem.entity.Appointment;
import com.nln.hospitalsystem.entity.Patient;
import com.nln.hospitalsystem.entity.Slot;
import com.nln.hospitalsystem.enums.AppointmentStatus;
import com.nln.hospitalsystem.enums.RecordStatus;
import com.nln.hospitalsystem.enums.SlotStatus;
import com.nln.hospitalsystem.payload.request.appointment.AppointmentRequest;
import com.nln.hospitalsystem.repository.AppointmentRepository;
import com.nln.hospitalsystem.repository.PatientRepository;
import com.nln.hospitalsystem.repository.SlotRepository;
import com.nln.hospitalsystem.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private SlotRepository slotRepository;

    @Override
    public void createAppointment(AppointmentRequest request) {
        Patient patient = patientRepository.findByAccount_Username(request.getUsernamePatient())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy bệnh nhân với username = " + request.getUsernamePatient()));

        Slot slot = slotRepository.findById(request.getSlotId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy slot với id = " + request.getSlotId()));

        if (slot.getStatus() !=  SlotStatus.AVAILABLE) {
            throw new RuntimeException("Slot is not available");
        }

        Appointment appointment = Appointment.builder()
                .patient(patient)
                .slot(slot)
                .status(AppointmentStatus.PENDING)
                .note(request.getNote())
                .delStatus(RecordStatus.ACTIVE)
                .build();

        appointmentRepository.save(appointment);
    }

//    @Override
//    public void createAppointment(AppointmentRequest request) {
//            DoctorWorkDetail dwd = doctorWorkDetailRepository
//                    .findByIdDoctorIdAndIdWorkDetailId(request.getDoctorId(), request.getWorkDetailId())
//                    .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy slot"));
//
//            if (dwd.getWorkDetail().getStatus() != ScheduleStatus.AVAILABLE) {
//                throw new IllegalStateException("Slot đã được đặt hoặc không khả dụng");
//            }
//
//            Patient patient = patientRepository.findById(request.getPatientId())
//                    .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy bệnh nhân"));
//
//            Appointment appointment = Appointment.builder()
//                    .doctorWorkDetail(dwd)
//                    .patient(patient)
//                    .note(request.getNote())
//                    .status(AppointmentStatus.PENDING)
//                    .delStatus(RecordStatus.ACTIVE)
//                    .build();
//
//            dwd.getWorkDetail().setStatus(ScheduleStatus.BOOKED);
//            appointmentRepository.save(appointment);
//        }
}
