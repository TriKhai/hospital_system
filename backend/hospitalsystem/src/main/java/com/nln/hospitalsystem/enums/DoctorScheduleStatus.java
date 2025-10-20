package com.nln.hospitalsystem.enums;

public enum DoctorScheduleStatus {
    PENDING,
    CONFIRMED,   // đã xác nhận lịch
    CANCELLED,   // bác sĩ hủy ca làm
    UNAVAILABLE, // bác sĩ bận, không thể nhận hẹn
    AVAILABLE,   // còn trống, có thể đặt hẹn
    FULLY_BOOKED // đã kín lịch (không còn slot nào)
}
