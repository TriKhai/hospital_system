package com.nln.hospitalsystem.service.Impl;

import com.nln.hospitalsystem.entity.Appointment;
import com.nln.hospitalsystem.entity.DoctorWorkDetail;
import com.nln.hospitalsystem.entity.Patient;
import com.nln.hospitalsystem.entity.WorkDetail;
import com.nln.hospitalsystem.enums.AppointmentStatus;
import com.nln.hospitalsystem.enums.RecordStatus;
import com.nln.hospitalsystem.enums.ScheduleStatus;
import com.nln.hospitalsystem.payload.request.appointment.AppointmentRequest;
import com.nln.hospitalsystem.repository.AppointmentRepository;
import com.nln.hospitalsystem.repository.DoctorWorkDetailRepository;
import com.nln.hospitalsystem.repository.PatientRepository;
import com.nln.hospitalsystem.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private DoctorWorkDetailRepository doctorWorkDetailRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Override
    public void createAppointment(AppointmentRequest request) {
            DoctorWorkDetail dwd = doctorWorkDetailRepository
                    .findByIdDoctorIdAndIdWorkDetailId(request.getDoctorId(), request.getWorkDetailId())
                    .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy slot"));

            if (dwd.getWorkDetail().getStatus() != ScheduleStatus.AVAILABLE) {
                throw new IllegalStateException("Slot đã được đặt hoặc không khả dụng");
            }

            Patient patient = patientRepository.findById(request.getPatientId())
                    .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy bệnh nhân"));

            Appointment appointment = Appointment.builder()
                    .doctorWorkDetail(dwd)
                    .patient(patient)
                    .note(request.getNote())
                    .status(AppointmentStatus.PENDING)
                    .delStatus(RecordStatus.ACTIVE)
                    .build();

            dwd.getWorkDetail().setStatus(ScheduleStatus.BOOKED);
            appointmentRepository.save(appointment);
        }
}
