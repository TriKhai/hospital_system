package com.nln.hospitalsystem.dto.doctor;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DoctorWorkDetailDTO {
    private Long id;               // id bảng DoctorWorkDetail
    private LocalTime startTime;   // giờ bắt đầu slot
    private LocalTime endTime;     // giờ kết thúc slot
    private String status;         // trạng thái của slot
    private String note;           // ghi chú
    private String shiftName;      // tên ca
    private LocalDate workDate;    // ngày thuộc Work
}
