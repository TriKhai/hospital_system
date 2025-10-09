import { useEffect, useState } from "react";
import type { DoctorWorkResponse } from "../../types/doctorType";
import doctorService from "../../services/doctorApi";
import DoctorList from "./DoctorList";
import type { SpecialtyResponse } from "../../types/specialtyType";
import specialtyService from "../../services/specialtyApi";

export default function DoctorWork() {
  const [doctors, setDoctors] = useState<DoctorWorkResponse[]>([]);
  // const [loading, setLoading] = useState(false);
  const [specialties, setSpecialties] = useState<SpecialtyResponse[]>([]);

  useEffect(() => {
    doctorService.getDoctorWorks().then(setDoctors);
    specialtyService.getAll().then(setSpecialties);
  }, []);

  // const handleBook = async (doctorId: number, workDetailId: number) => {
  //   try {
  //     setLoading(true);
  //     const data: AppointmentRequest = {
  //       doctorId,
  //       workDetailId,
  //       patientId: 1, // TODO: Lấy từ user login hoặc form
  //       note: "Đặt lịch qua web"
  //     };
  //     await appointmentService.create(data);
  //     alert("Đặt lịch thành công!");
  //     // Sau khi đặt lịch, refresh danh sách để cập nhật trạng thái
  //     // doctorService.getDoctorWorks(specialtyId).then(setDoctors);
  //   } catch (err) {
  //     console.error(err);
  //     alert("Không thể đặt lịch. Vui lòng thử lại.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="h-[1000px] overflow-auto">

      <DoctorList doctors={doctors} specialties={specialties} />


      {/* {doctors.map((doc) => (
        <div
          key={doc.id}
          style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}
        >
          <h3>
            {doc.name} {doc.specialty.name && `- ${doc.specialty.name}`}
          </h3>
          <p>
            Email: {doc.email} | Phone: {doc.phone}
          </p>

          <table
            style={{ width: "100%", borderCollapse: "collapse", marginTop: 10 }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid #ccc" }}>Ngày</th>
                <th style={{ border: "1px solid #ccc" }}>Ca</th>
                <th style={{ border: "1px solid #ccc" }}>Bắt đầu</th>
                <th style={{ border: "1px solid #ccc" }}>Kết thúc</th>
                <th style={{ border: "1px solid #ccc" }}>Trạng thái</th>
                <th style={{ border: "1px solid #ccc" }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {doc.slots.map((slot) => (
                <tr key={slot.id}>
                  <td style={{ border: "1px solid #ccc" }}>
                    {format(slot.workDate, "dd/MM/yyyy")}
                  </td>
                  <td style={{ border: "1px solid #ccc" }}>{dayjs(slot.workDate).format("DD/MM/YYYY")}</td>
                  <td style={{ border: "1px solid #ccc" }}>{slot.startTime}</td>
                  <td style={{ border: "1px solid #ccc" }}>{slot.endTime}</td>
                  <td
                    style={{
                      border: "1px solid #ccc",
                      color: slot.status === "AVAILABLE" ? "green" : "red",
                    }}
                  >
                    {slot.status}
                  </td>
                  <td style={{ border: "1px solid #ccc", textAlign: "center" }}>
                    {slot.status === "AVAILABLE" && (
                      <button
                        onClick={() => handleBook(doc.id, slot.id)}
                        disabled={loading}
                        style={{
                          padding: "4px 8px",
                          background: "#4CAF50",
                          color: "#fff",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        {loading ? "Đang đặt..." : "Đặt lịch"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))} */}
    </div>
  );
}
