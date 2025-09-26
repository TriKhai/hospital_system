package com.nln.hospitalsystem.enums;

public enum AppointmentStatus {
    PENDING,             // Đặt mới: chờ admin duyệt
    PENDING_VERIFICATION, // Admin duyệt, chờ nhân viên gọi xác minh
    CONFIRMED,           // Đã xác minh và xác nhận
    REJECTED,            // Admin từ chối (lý do: trùng giờ, thiếu thông tin…)
    CANCELLED_BY_PATIENT,// Bệnh nhân tự hủy trước khi xác nhận
    CANCELLED_BY_ADMIN,  // Admin hủy sau khi xác nhận
    COMPLETED,           // Đã khám xong
    NO_SHOW              // Bệnh nhân không đến
}
