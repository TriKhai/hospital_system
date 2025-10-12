import { useEffect, useState } from "react";
import type { AppointmentResponse } from "../../../types/appointmentType";
import appointmentService from "../../../services/appointmentApi";
import type { Column } from "../../../types/tableType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import DataTable from "../../../components/layout/admin/DataTable";
import { toast } from "react-toastify";

type Props = {
  statusRender?: string; // ví dụ "PENDING", "CONFIRMED", ...
};

const AppointmentPage: React.FC<Props> = ({ statusRender }) => {
  const [data, setData] = useState<AppointmentResponse[]>([]);
  const [row, setRow] = useState<AppointmentResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState("");

  const cancelledStatuses = [
    "REJECTED",
    "CANCELLED_BY_PATIENT",
    "CANCELLED_BY_DOCTOR",
    "CANCELLED_BY_ADMIN",
  ];
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await appointmentService.getAll();
      // Nếu có status, filter dữ liệu

      const filtered =
        statusRender === "REJECTED"
          ? res.filter((d) => cancelledStatuses.includes(d.status))
          : statusRender
          ? res.filter((d) => d.status === statusRender)
          : res;

      // Đảo ngược kết quả
      setData(filtered.reverse());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [statusRender]); // khi status thay đổi, fetch lại dữ liệu

  const handleChangeStatus = async (id: number, status: string) => {
    if (status === "CONFIRMED") {
      window.confirm("Bạn chắc rằng đã gọi điện xác nhận với bệnh nhân.");
    }
    try {
      await appointmentService.updateStatus(id, status);
      toast.success("Cập nhật trạng thái thành công!");
      await fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Cập nhật thất bại!");
    }
  };

  const handleReset = async () => {
    await fetchData();
    setRow(null);
    setQuery("");
  };

  const handleRowClick = (row: AppointmentResponse) => {
    setRow(row);
  };

  const columns: Column<AppointmentResponse>[] = [
    {
      key: "patient",
      label: "Bệnh nhân",
      render: (_, record) => record.patient.name,
    },
    {
      key: "doctor",
      label: "Bác sĩ",
      render: (_, record) => record.doctor.name,
    },
    {
      key: "slot",
      label: "Thời gian",
      render: (_, record) =>
        `${record.slot.startTime} - ${record.slot.endTime}`,
    },
    { key: "note", label: "Ghi chú" },
    { key: "status", label: "Trạng thái" },
    {
      key: "createdAt",
      label: "Ngày tạo",
      render: (_, record) =>
        new Date(record.createdAt).toLocaleDateString("vi-VN"),
    },
    {
      key: "updatedAt",
      label: "Ngày Cập nhật",
      render: (_, record) =>
        new Date(record.updatedAt).toLocaleDateString("vi-VN"),
    },
    {
      key: "actions",
      label: "Hành động",
      render: (_, record) => (
        <div className="flex gap-2">
          {record.status === "PENDING" && (
            <>
              <button
                onClick={() =>
                  handleChangeStatus(record.id, "PENDING_VERIFICATION")
                }
                className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition"
              >
                Duyệt
              </button>
              <button
                onClick={() => handleChangeStatus(record.id, "REJECTED")}
                className="px-2 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition"
              >
                Từ chối
              </button>
            </>
          )}

          {record.status === "PENDING_VERIFICATION" && (
            <button
              onClick={() => handleChangeStatus(record.id, "CONFIRMED")}
              className="px-2 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition"
            >
              Xác nhận
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="">
      <div className="flex justify-between items-center border-b-gray-300 border-b pb-3">
        <div>
          <h1 className="text-xl font-semibold">Quản lý lịch hẹn</h1>
          <p className="text-lg text-gray-500">
            Bảng hiển thị các lịch hẹn có trong hệ thống
          </p>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="pt-3 pb-2 flex gap-2">
          <div>
            <button
              onClick={handleReset}
              className="bg-[#12B0C2] text-white px-4 py-2 rounded hover:bg-[#0E8DA1] flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faRotateRight} /> Refresh
            </button>
          </div>
        </div>

        <div></div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <span>Đang tải dữ liệu...</span>
        </div>
      ) : data.length === 0 ? (
        <div className="text-center text-gray-500">
          Không tìm thấy dữ liệu nào với từ khoá "{query}"
        </div>
      ) : (
        <DataTable
          data={data}
          columns={columns}
          rowKey="id"
          selectedRowId={row?.id}
          onRowClick={handleRowClick}
        />
      )}
    </div>
  );
};

export default AppointmentPage;
