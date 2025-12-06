// đặt ở trên cùng file
const recentAppointments = [
  {
    id: 1,
    patient: "John Doe",
    doctor: "Dr. Smith",
    time: "12/09/2025 10:00",
    status: "Completed",
  },
  {
    id: 2,
    patient: "Jane Doe",
    doctor: "Dr. Brown",
    time: "12/09/2025 11:00",
    status: "Upcoming",
  },
  {
    id: 3,
    patient: "Jane Doe",
    doctor: "Dr. Brown",
    time: "12/09/2025 11:30",
    status: "Upcoming",
  },
  {
    id: 3,
    patient: "Jane Doe",
    doctor: "Dr. Brown",
    time: "12/09/2025 11:30",
    status: "Upcoming",
  },
  {
    id: 3,
    patient: "Jane Doe",
    doctor: "Dr. Brown",
    time: "12/09/2025 11:30",
    status: "Upcoming",
  },
  {
    id: 3,
    patient: "Jane Doe",
    doctor: "Dr. Brown",
    time: "12/09/2025 11:30",
    status: "Upcoming",
  },
  {
    id: 4,
    patient: "Jane Doe",
    doctor: "Dr. Brown",
    time: "12/09/2025 12:00",
    status: "Cancelled",
  },
  // ...
];

export default function RecentAppointments() {
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
          {recentAppointments.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-3 md:grid-cols-4 items-center px-3 py-2 text-sm border-t"
            >
              <span>{item.patient}</span>
              <span className="text-gray-600">{item.doctor}</span>

              <span className="hidden md:block">
                <span
                  className={
                    "inline-flex items-center px-2 py-0.5 rounded text-xs " +
                    (item.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : item.status === "Cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700")
                  }
                >
                  {item.status}
                </span>
              </span>

              <span className="text-right text-gray-500 text-xs md:text-sm">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
