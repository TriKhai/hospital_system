// src/pages/admin/DepartmentPage.tsx
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import DataTable from "../../components/layout/admin/DataTable";
import type { Column } from "../../types/tableType";
import type {
    DepartmentRequest,
  DepartmentResponse,
} from "../../types/departmentType";
import departmentService from "../../services/departmentApi";
import { useForm } from "react-hook-form";

const CatalogsPage: React.FC = () => {
  const [departments, setDepartments] = useState<DepartmentResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { register, handleSubmit, reset } = useForm<DepartmentRequest>();

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

  const handleAdd = async (data: DepartmentRequest) => {
    try {
      const newDep = await departmentService.create(data);
      setDepartments((prev) => [...prev, newDep]);
      reset();
      setOpenModal(false);
    } catch (error) {
      console.error("Tạo khoa thất bại:", error);
    }
  };

  


//   const handleDelete = async (id: number) => {
//     if (!window.confirm("Bạn có chắc muốn xóa khoa này?")) return;

//     try {
//       await departmentService.delete(id);
//       setDepartments((prev) => prev.filter((d) => d.id !== id));
//     } catch (error) {
//       console.error("Xóa khoa thất bại:", error);
//     }
//   };

  const columns: Column<DepartmentResponse>[] = [
    { key: "id", label: "ID" },
    { key: "name", label: "Tên khoa" },
    { key: "description", label: "Mô tả" },
  ];

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-semibold">Quản lý khoa</h1>
        <button
          onClick={() => setOpenModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faPlus} /> Thêm khoa
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <span>Đang tải danh sách khoa...</span>
        </div>
      ) : (
        <DataTable
          data={departments}
          columns={columns}
          rowKey="id"
          title="Danh sách khoa"
        />
      )}
    </div>
  );
};

export default CatalogsPage;
