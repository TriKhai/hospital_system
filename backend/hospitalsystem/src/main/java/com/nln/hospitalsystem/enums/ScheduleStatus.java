package com.nln.hospitalsystem.enums;

public enum ScheduleStatus {
    AVAILABLE,   // Slot trống, bệnh nhân có thể đặt
    BOOKED,      // Đã có bệnh nhân đặt
    CANCELLED,   // Bị hủy (do bệnh nhân hoặc bác sĩ)
    COMPLETED,   // Slot đã xong, bác sĩ đã khám
    ABSENT,       // Bác sĩ vắng mặt đột xuất
    MEETING      // Slot bị chiếm bởi cuộc họp/nội bộ
}