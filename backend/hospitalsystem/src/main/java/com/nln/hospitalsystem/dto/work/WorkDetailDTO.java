package com.nln.hospitalsystem.dto.work;

import java.time.LocalDate;
import java.time.LocalTime;

public class WorkDetailDTO {
    private Long id;               // id bảng DoctorWorkDetail
    private LocalTime startTime;   // giờ bắt đầu slot
    private LocalTime endTime;     // giờ kết thúc slot
    private String status;         // trạng thái của slot
    private String note;           // ghi chú
    private String shiftName;      // tên ca
    private LocalDate workDate;    // ngày thuộc Work
}