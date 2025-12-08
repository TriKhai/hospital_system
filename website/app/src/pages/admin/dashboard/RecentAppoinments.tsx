import { useEffect, useState } from "react";
import dashboardService from "../../../services/dashboardApi";
import type { AppointmentResponse } from "../../../types/appointmentType";
import dayjs from "dayjs";

export default function RecentAppointments() {
  const [appointments, setAppointments] = useState<AppointmentResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardService
      .getLatestAppointments(7) // lấy 7 lịch mới nhất
      .then((data) => setAppointments(data))
      .finally(() => setLoading(false));
  }, []);

  function mapStatus(status: string) {
    if (
      status === "REJECTED" ||
      status === "CANCELLED_BY_PATIENT" ||
      status === "CANCELLED_BY_DOCTOR" ||
      status === "CANCELLED_BY_ADMIN"
    ) {
      return { label: "Cancelled", class: "bg-red-100 text-red-700" };
    }

    if (
      status === "PENDING" ||
      status === "PENDING_VERIFICATION" 
    ) {
      return { label: "Upcoming", class: "bg-yellow-100 text-yellow-700" };
    }

    if (status === "CONFIRMED") {
      return { label: "Completed", class: "bg-green-100 text-green-700" };
    }

    if (status === "NO_SHOW") {
      return { label: "No show", class: "bg-gray-200 text-gray-600" };
    }

    return { label: status, class: "" }; // fallback
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="font-semibold mb-3">Recent Appointments</p>

      <div className="border rounded-lg overflow-hidden">
        {/* header */}
        <div className="grid grid-cols-3 md:grid-cols-4 bg-gray-50 text-xs md:text-sm font-medium text-gray-500 px-3 py-2">
          <span>Patient</span>
          <span>Doctor</span>
          <span className="hidden md:block">Status</span>
          <span className="text-right">Time</span>
        </div>

        <div className="max-h-64 overflow-y-auto">
          {loading && (
            <p className="text-center py-4 text-gray-500">Loading...</p>
          )}

          {!loading && appointments.length === 0 && (
            <p className="text-center py-4 text-gray-500">
              No recent appointments
            </p>
          )}

          {!loading &&
            appointments.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-3 md:grid-cols-4 items-center px-3 py-2 text-sm border-t"
              >
                <span>{item.patient.name}</span>

                <span className="text-gray-600">{item.doctor.name}</span>

                <span className="hidden md:block">
                  <span
                    className={
                      "inline-flex items-center px-2 py-0.5 rounded text-xs " +
                      mapStatus(item.status).class
                    }
                  >
                    {mapStatus(item.status).label}
                  </span>
                </span>

                <span className="text-right text-gray-500 text-xs md:text-sm">
                  {dayjs(item.slot.workDate).format("DD/MM/YYYY")}{" "}
                  {item.slot.startTime}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
