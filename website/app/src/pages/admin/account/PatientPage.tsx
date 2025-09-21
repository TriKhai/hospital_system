import { useEffect, useState } from "react";
import type { Column } from "../../../types/tableType";
import DataTable from "../../../components/layout/admin/DataTable";
import type { PatientResponse } from "../../../types/patientType";
import patientService from "../../../services/patientApi";

const PatientPage: React.FC = () => {
  const [data, setData] = useState<PatientResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);
        const res = await patientService.getAll();
        console.log(res);
        setData(res);
      } catch (error) {
        console.error("Fetch data error: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  const columns: Column<PatientResponse>[] = [
    { key: "name", label: "Họ và tên" },
    {
      key: "birthDate",
      label: "Ngày sinh",
      render: (_, record) =>
        record.birthDate
          ? new Date(record.birthDate).toLocaleDateString("vi-VN")
          : "—",
    },
    {
      key: "gender",
      label: "Giới tính",
      render: (_, record) => (record.gender ? "Nam" : "Nữ"),
    },
    { key: "address", label: "Địa chỉ" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Số điện thoại" },
    {
      key: "imageUrl",
      label: "Ảnh đại diện",
      render: (_, record) =>
        record.imageUrl ? (
          <img
            src={record.imageUrl}
            alt={record.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          "—"
        ),
    },
    {
      key: "createdAt",
      label: "Ngày tạo",
      render: (_, record) =>
        record.createdAt
          ? new Date(record.createdAt).toLocaleDateString("vi-VN")
          : "",
    },
    {
      key: "updatedAt",
      label: "Ngày cập nhật",
      render: (_, record) =>
        record.updatedAt
          ? new Date(record.updatedAt).toLocaleDateString("vi-VN")
          : "",
    },
  ];

  return (
    <div className="">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-xl font-semibold">Quản lý bệnh nhân</h1>
          <p className="text-lg text-gray-500">
            Bảng hiển thị các bệnh nhân có trong hệ thống
          </p>
        </div>
        {/* <div>
          <button
            onClick={() => setOpenModal(true)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} /> Thêm chuyên khoa
          </button>
        </div> */}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <span>Đang kết nối máy chủ...</span>
        </div>
      ) : (
        <DataTable data={data} columns={columns} rowKey="id" />
      )}
    </div>
  );
};

export default PatientPage;
