package com.nln.hospitalsystem.service.Impl;

import com.nln.hospitalsystem.dto.appointment.AppointmentDTO;
import com.nln.hospitalsystem.dto.appointment.AppointmentMapper;
import com.nln.hospitalsystem.dto.maIl.MailBody;
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

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private SlotRepository slotRepository;

    @Autowired
    private MailService mailService;

    @Override
    public void createAppointment(AppointmentRequest request) {
        Patient patient = patientRepository.findByAccount_Username(request.getUsernamePatient())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy bệnh nhân với username = " + request.getUsernamePatient()));

        Slot slot = slotRepository.findById(request.getSlotId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy slot với id = " + request.getSlotId()));

        if (slot.getStatus() !=  SlotStatus.AVAILABLE) {
            throw new RuntimeException("Slot is not available");
        }

        slot.setStatus(SlotStatus.BOOKED);
        slotRepository.save(slot);

        Appointment appointment = Appointment.builder()
                .patient(patient)
                .slot(slot)
                .status(AppointmentStatus.PENDING)
                .note(request.getNote())
                .delStatus(RecordStatus.ACTIVE)
                .build();

        appointmentRepository.save(appointment);

//        MailBody mailToPatient = buildPatientMailBody(patient, slot, request);
//        MailBody mailToDoctor = buildDoctorMailBody(patient, slot, request);
//        mailService.sendMail(mailToPatient);
//        mailService.sendMail(mailToDoctor);

        MailBody patientMail = buildPatientMailBody(patient, slot, request);
        if (isValidEmail(patientMail.to())) {
            mailService.sendMail(patientMail);
        } else {
            System.out.println("Email benh nhan khong ton tai");
        }

        MailBody doctorMail = buildDoctorMailBody(patient, slot, request);
        if (isValidEmail(doctorMail.to())) {
            mailService.sendMail(doctorMail);
        } else {
            System.out.println("Email bac si khong ton tai");
        }
    }

    @Override
    public List<AppointmentDTO> getAll() {
        List<Appointment> appointments = appointmentRepository.findAll();

        return appointments.stream()
                .map(AppointmentMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void updateStatus(Integer id, AppointmentStatus status) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        AppointmentStatus oldStatus = appointment.getStatus();

        if (!isValidTransition(oldStatus, status)) {
            throw new RuntimeException("Không thể chuyển từ " + oldStatus + " sang " + status);
        }

        appointment.setStatus(status);
        appointmentRepository.save(appointment);
    }

    @Override
    public void cancelByPatient(Integer id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        validateAppointmentTime(appointment);
        AppointmentStatus oldStatus = appointment.getStatus();
        if(!isValidTransition(oldStatus, AppointmentStatus.CANCELLED_BY_PATIENT)) {
            throw new RuntimeException("Không thể chuyển từ " + oldStatus + " sang CANCELLED_BY_PATIENT");
        }

        appointment.setStatus(AppointmentStatus.CANCELLED_BY_PATIENT);
        appointmentRepository.save(appointment);
    }

    @Override
    public void cancelByDoctor(Integer id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        validateAppointmentTime(appointment);

        System.out.print("Hello" + id);
        AppointmentStatus oldStatus = appointment.getStatus();
        if (!isValidTransition(oldStatus, AppointmentStatus.CANCELLED_BY_DOCTOR)) {
            throw new RuntimeException("Không thể chuyển từ " + oldStatus + " sang CANCELLED_BY_DOCTOR");
        }

        appointment.setStatus(AppointmentStatus.CANCELLED_BY_DOCTOR);
        appointmentRepository.save(appointment);
    }

    @Override
    public void confirmByDoctor(Integer id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy lịch hẹn"));

        validateAppointmentTime(appointment);
        AppointmentStatus oldStatus = appointment.getStatus();

        if (!isValidTransition(oldStatus, AppointmentStatus.PENDING_VERIFICATION)) {
            throw new RuntimeException("Không thể chuyển từ " + oldStatus + " sang CONFIRMED");
        }

        appointment.setStatus(AppointmentStatus.PENDING_VERIFICATION);
        appointmentRepository.save(appointment);
    }

    @Override
    public List<AppointmentDTO> getByUsernamePatient(String username) {
        List<Appointment> appointments = appointmentRepository.findByPatientAccountUsername(username);
        return appointments.stream()
                .map(AppointmentMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<AppointmentDTO> getByUsernameDoctor(String username) {
        List<Appointment> appointments = appointmentRepository.findBySlotDoctorScheduleDoctorAccountUsername(username);
        return appointments.stream()
                .map(AppointmentMapper::toDTO)
                .collect(Collectors.toList());
    }


    private void validateAppointmentTime(Appointment appointment) {
        LocalDate appointmentDate = appointment.getSlot().getDoctorSchedule().getSchedule().getWorkDate();
        LocalTime startTime = appointment.getSlot().getStartTime();

        LocalDateTime appointmentDateTime = LocalDateTime.of(appointmentDate, startTime);

        if (appointmentDateTime.isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Không thể thao tác trên lịch hẹn đã qua thời gian.");
        }
    }

    private boolean isValidTransition(AppointmentStatus current, AppointmentStatus target) {
        return switch (current) {
            case PENDING -> target == AppointmentStatus.PENDING_VERIFICATION
                    || target == AppointmentStatus.REJECTED
                    || target == AppointmentStatus.CANCELLED_BY_DOCTOR
                    || target == AppointmentStatus.CANCELLED_BY_PATIENT;
            case PENDING_VERIFICATION -> target == AppointmentStatus.CONFIRMED || target == AppointmentStatus.REJECTED;
            case CONFIRMED -> target == AppointmentStatus.COMPLETED
                    || target == AppointmentStatus.CANCELLED_BY_ADMIN
                    || target == AppointmentStatus.NO_SHOW;
            default -> false;
        };
    }

    private boolean isValidEmail(String email) {
        if (email == null || email.isBlank()) return false;

        // kiểm tra định dạng email hợp lệ
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        if (!email.matches(emailRegex)) return false;

        // có thể chặn domain giả định (nếu bạn biết domain nào là ảo)
        if (email.endsWith("@hospital.com")) return false; // ví dụ domain test
        return true;
    }


    private MailBody buildPatientMailBody(Patient patient, Slot slot, AppointmentRequest request) {
        String doctorName = slot.getDoctorSchedule().getDoctor().getName();
        String time = slot.getStartTime() + " - " + slot.getEndTime();
        String date = slot.getDoctorSchedule().getSchedule().getWorkDate().toString();

        String subject = "Xác nhận đặt lịch khám";
        String content = String.format(
                "Xin chào %s,\n\nBạn đã đặt lịch khám với bác sĩ %s vào ngày %s (%s).\nGhi chú: %s\n\nTrân trọng,\nBệnh viện ABC",
                patient.getName(), doctorName, date, time, request.getNote()
        );

        return MailBody.builder()
                .to(patient.getEmail())
                .subject(subject)
                .text(content)
                .build();
    }

    private MailBody buildDoctorMailBody(Patient patient, Slot slot, AppointmentRequest request) {
        String doctorName = slot.getDoctorSchedule().getDoctor().getName();
        String time = slot.getStartTime() + " - " + slot.getEndTime();
        String date = slot.getDoctorSchedule().getSchedule().getWorkDate().toString();

        String subject = "Thông báo lịch hẹn mới";
        String content = String.format(
                "Bác sĩ %s thân mến,\n\nBạn có lịch hẹn mới với bệnh nhân %s vào ngày %s (%s).\nGhi chú: %s\n\nTrân trọng,\nHệ thống Bệnh viện ABC",
                doctorName, patient.getName(), date, time, request.getNote()
        );

        String doctorEmail = slot.getDoctorSchedule()
                .getDoctor()
                .getEmail();

        return MailBody.builder()
                .to(doctorEmail)
                .subject(subject)
                .text(content)
                .build();
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
