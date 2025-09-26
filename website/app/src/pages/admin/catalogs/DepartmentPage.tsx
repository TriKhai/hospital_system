// src/pages/admin/DepartmentPage.tsx
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faPlus,
  faRotateRight,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import type { FieldConfig } from "../../../components/layout/form/AddForm";
import type { Column } from "../../../types/tableType";
import DataTable from "../../../components/layout/admin/DataTable";
import AddForm from "../../../components/layout/form/AddForm";
import { toast } from "react-toastify";
import UpdateForm from "../../../components/layout/form/UpdateForm";
import SearchBar from "../../../components/layout/form/SearchBar";
import { filterAndSortData } from "../../../utils/filterAndSortData";
import type { DepartmentRequest, DepartmentResponse } from "../../../types/departmentType";
import departmentService from "../../../services/departmentApi";

const DepartmentPage: React.FC = () => {
  const [data, setData] = useState<DepartmentResponse[]>([]);
  const [row, setRow] = useState<DepartmentResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [query, setQuery] = useState("");
  const [searchKey, setSearchKey] = useState<keyof DepartmentResponse>("name");

  const fields: FieldConfig<DepartmentRequest>[] = [
    { label: "Tên nhà cung cấp", name: "name", required: true },
    { label: "Địa chỉ", name: "description", required: true },
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await departmentService.getAll();
      setData(res);
    } catch (error) {
      console.error("Error fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (data: DepartmentRequest) => {
    try {
      await departmentService.create(data);
      toast.success("Thêm mới thành công.");
      fetchData();
    } catch (error) {
      toast.error("Đã xảy ra lỗi, không thể thêm mới.");
      console.error("Lỗi: ", error);
    }
  };

  const handleUpdate = async (id: number, data: DepartmentRequest) => {
    try {
      console.log(data);
      await departmentService.update(id, data);
      toast.success("Cập nhật thành công.");
      fetchData();
    } catch (error) {
      toast.error("Đã xảy ra lỗi, không thể cập nhật.");
      console.error("Lỗi:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa không?")) return;
    try {
      await departmentService.delete(id);
      toast.success("Xóa thành công.");
      fetchData();
    } catch (error) {
      toast.error("Đã xảy ra lỗi, không thể xóa.");
      console.error("Lỗi:", error);
    }
  };

  const handleReset = () => {
    fetchData();
    setRow(null);
    setQuery("");
  };

  const handleRowClick = (row: DepartmentResponse) => {
    setRow(row);
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

  const filterData: DepartmentResponse[] = filterAndSortData<DepartmentResponse>(
    data,
    query,
    searchKey
  );

  return (
    <div className="">
      <div className="flex justify-between items-center border-b-gray-300 border-b pb-3">
        <div>
          <h1 className="text-xl font-semibold">Quản lý khoa</h1>
          <p className="text-lg text-gray-500">
            Bảng hiển thị các khoa có trong hệ thống
          </p>
        </div>
        <div>
          <button
            onClick={() => setOpenModal(true)}
            className="bg-[#12B0C2] text-white px-4 py-2 rounded hover:bg-[#0E8DA1] flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} /> Thêm khoa
          </button>
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

          <div>
            <button
              onClick={() => {
                if (!row) {
                  toast.error("Vui lòng chọn dữ liệu muốn chỉnh sữa.");
                  return;
                }
                setOpenEdit(true);
              }}
              className="bg-[#12B0C2] text-white px-4 py-2 rounded hover:bg-[#0E8DA1] flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faEdit} /> Cập nhật
            </button>
          </div>

          <div>
            <button
              onClick={() => {
                if (!row) {
                  toast.error("Vui lòng chọn dữ liệu muốn xoá.");
                  return;
                }
                handleDelete(row.id);
              }}
              className="bg-[#d84955] text-white px-4 py-2 rounded hover:bg-red-400 flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faTrash} /> Xoá
            </button>
          </div>
        </div>

        <div>
          <div className="p-4">
            <div className="grid grid-cols-[120px_1fr] items-center gap-2">
              <select
                className="border border-gray-400 p-2 rounded-lg"
                onChange={(e) =>
                  setSearchKey(e.target.value as keyof DepartmentResponse)
                }
              >
                <option value="name">Tên Khoa</option>
                <option value="description">Mô tả</option>
              </select>

              <SearchBar
                value={query}
                onChange={setQuery}
                placeholder="Tìm kiếm khoa..."
              />
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <span>Đang tải dữ liệu...</span>
        </div>
      ) : filterData.length === 0 ? (
          <div className="text-center text-gray-500">
            Không tìm thấy dữ liệu nào với từ khoá "{query}"
          </div>
        ) : (
        <DataTable
          data={filterData}
          columns={columns}
          rowKey="id"
          selectedRowId={row?.id}
          onRowClick={handleRowClick}
        />
      )}

      <AddForm<DepartmentRequest>
        title="Thêm Khoa"
        fields={fields}
        isOpen={openModal}
        onSubmit={handleAdd}
        onClose={() => setOpenModal(false)}
      />

      {row && (
        <UpdateForm
          title="Cập nhật khoa"
          data={row}
          isOpen={openEdit}
          onSubmit={async (values) => {
            await handleUpdate(values.id, values);
          }}
          onClose={() => setOpenEdit(false)}
          fieldConfig={{
            id: { readOnly: true },
            createdAt: { readOnly: true },
          }}
        />
      )}
    </div>
  );
};

export default DepartmentPage;
