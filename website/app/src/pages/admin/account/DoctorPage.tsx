import { useEffect, useState } from "react";
import type { Column } from "../../../types/tableType";
import DataTable from "../../../components/layout/admin/DataTable";
import type { DoctorType } from "../../../types/doctorType";
import doctorService from "../../../services/doctorApi";

const DoctorPage: React.FC = () => {
  const [data, setData] = useState<DoctorType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);
        const res = await doctorService.getAll();
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

  const columns: Column<DoctorType>[] = [
    { key: "name", label: "Họ và tên" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Số điện thoại" },
    { key: "address", label: "Địa chỉ" },
    {
      key: "birthDay",
      label: "Ngày sinh",
      render: (_, record) =>
        new Date(record.birthDay).toLocaleDateString("vi-VN"),
    },
    {
      key: "gender",
      label: "Giới tính",
      render: (_, record) => (record.gender ? "Nam" : "Nữ"),
    },
    { key: "degree", label: "Bằng cấp" },
    { key: "position", label: "Chức vụ" },
    { key: "yearsOfExperience", label: "Kinh nghiệm (năm)" },
    {
      key: "consultationFee",
      label: "Phí khám",
      render: (_, record) =>
        record.consultationFee
          ? record.consultationFee.toLocaleString("vi-VN") + " đ"
          : "—",
    },
    {
      key: "createdAt",
      label: "Ngày tạo",
      render: (_, record) =>
        new Date(record.createdAt).toLocaleDateString("vi-VN"),
    },
    {
      key: "updatedAt",
      label: "Ngày cập nhật",
      render: (_, record) =>
        new Date(record.updatedAt).toLocaleDateString("vi-VN"),
    },
  ];

  return (
    <div className="">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-xl font-semibold">Quản lý thông tin bác sĩ</h1>
          <p className="text-lg text-gray-500">
            Bảng hiển thị các bác sĩ có trong hệ thống
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

export default DoctorPage;
