# HỆ THỐNG KHÁM BỆNH

## Member List

1. Lý Trí Khải - B2207530 - khaib2207530@student.ctu.edu.vn

## Technologies Used:

- Java 
- MySQL
- React TS

## Additional JAVA Modules Required

-

## Task: Hệ thống khám bệnh

1. Thuốc (Mã thuốc, Mã loại, Mã hãng SX, Mã nhà cung cấp, Tên Thuốc, Công dụng, Đơn giá, Số lượng tồn kho, Hạn sử dụng)
2. Hãng SX (Mã hãng SX, Tên hãng, Quốc gia)
3. Loại thuốc (Mã loại, Tên loại, Đơn vị tính)
4. Nhà cung cấp (Mã nhà cung cấp, Tên nhà cung cấp, Số điện thoại)
5. Khách hàng (Mã khách hàng, Tên khách hàng, Số điện thoại, Địa chỉ)
6. Hóa đơn (Mã hóa đơn, Mã khách hàng, Ngày lập, Tổng tiền)
7. Chi tiết hóa đơn (Mã chi tiết HĐ, Mã hóa đơn, Mã thuốc, Số lượng bán, Giá bán)

\*Gợi ý tính năng:

- Function: Hàm trả về số lượng thuốc còn lại trong kho của một loại thuốc. 
- Trigger: Tự động thông báo khi thuốc sắp hết hạn (trước 30 ngày)
- Stored Procedure: Danh sách thuốc thuộc một loại thuốc xác định (Ví dụ: Truyền vào tham số loại thuốc là “kháng sinh”, hiển thị danh sách các thuốc có công dụng tương tự)
- Thống kê: Báo cáo doanh thu theo tuần, theo ngày, theo tháng.

\*Nâng cao:
- Phát hiện hóa đơn bất thường

### TÍNH NĂNG HỆ THỐNG

1. Trang Admin
   - CRUD các bảngtức
   - Thống kê hệ thống
   - Lịch làm việc
   - Lịch hẹn
   - Quản lý tin tức
     
3. Trang Doctor
   - Xem lịch làm việc
   - Điều chỉnh việc làm việc
   - Thông báo với admin là buổi bận (*)
     
5. Trang Patient
   - Trang chủ, aboutabout
   - Đặt lịch làm việc
   - Profile,....
