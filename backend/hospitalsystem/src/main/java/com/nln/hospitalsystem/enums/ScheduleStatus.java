package com.nln.hospitalsystem.enums;

public enum ScheduleStatus {
    ACTIVE,     // Ca bình thường, có thể đặt
    INACTIVE,   // Ca tạm khoá, không cho đặt
    CANCELLED,  // Ca bị hủy
    COMPLETED   // Ca đã qua (đã diễn ra)
}
