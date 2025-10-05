package com.nln.hospitalsystem.enums;

public enum ShiftStatus {
    SCHEDULED,  // ca đã được lên lịch
    AVAILABLE,  // còn trống, chưa có bác sĩ
    ASSIGNED,   // đã có bác sĩ nhận
    CANCELLED,   // ca bị huỷ
    UNAVAILABLE
}