// src/pages/admin/DepartmentPage.tsx
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import type {
  DepartmentRequest,
  DepartmentResponse,
} from "../../../types/departmentType";
import type { FieldConfig } from "../../../components/layout/form/AddForm";
import departmentService from "../../../services/departmentApi";
import type { Column } from "../../../types/tableType";
import DataTable from "../../../components/layout/admin/DataTable";
import AddForm from "../../../components/layout/form/AddForm";

const DepartmentPage: React.FC = () => {
  const [departments, setDepartments] = useState<DepartmentResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const fields: FieldConfig<DepartmentRequest>[] = [
    { label: "Tên khoa", name: "name", required: true },
    { label: "Mô tả", name: "description", type: "textarea" },
  ];

  // 🔹 Load danh sách Department
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);
        const res = await departmentService.getAll();
        setDepartments(res);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách khoa:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  const handleAddDepartment = async (data: DepartmentRequest) => {
    await departmentService.create(data);
    console.log("Khoa mới:", data);
  };

  const columns: Column<DepartmentResponse>[] = [
    { key: "name", label: "Tên khoa" },
    { key: "description", label: "Mô tả" },
    {
      key: "createdAt",
      label: "Ngày tạo",
      render: (_, record) =>
        new Date(record.createdAt).toLocaleDateString("vi-VN"),
    },
  ];

  return (
    <div className="">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-xl font-semibold">Quản lý khoa</h1>
          <p className="text-lg text-gray-500">
            Bảng hiển thị các khoa có trong hệ thống
          </p>
        </div>
        <div>
          <button
            onClick={() => setOpenModal(true)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} /> Thêm khoa
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <span>Đang tải danh sách khoa...</span>
        </div>
      ) : (
        <DataTable data={departments} columns={columns} rowKey="id" />
      )}

      <AddForm<DepartmentRequest>
        title="Thêm khoa"
        fields={fields}
        isOpen={openModal}
        onSubmit={handleAddDepartment}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
};

export default DepartmentPage;
