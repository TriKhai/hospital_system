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
import type { SupplierRequest, SupplierResponse } from "../../../types/drugType";
import supplierService from "../../../services/supplierApi";

const SupplierPage: React.FC = () => {
  const [data, setData] = useState<SupplierResponse[]>([]);
  const [row, setRow] = useState<SupplierResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [query, setQuery] = useState("");
  const [searchKey, setSearchKey] = useState<keyof SupplierResponse>("name");

  const fields: FieldConfig<SupplierRequest>[] = [
    { label: "Tên nhà cung cấp", name: "name", required: true },
    { label: "Địa chỉ", name: "address", required: true },
    { label: "Số điện thoại", name: "phone", required: true },
    { label: "Email", name: "email", required: true, type: "email" },
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await supplierService.getAll();
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

  const handleAdd = async (data: SupplierRequest) => {
    try {
      await supplierService.create(data);
      toast.success("Thêm mới thành công.");
      fetchData();
    } catch (error) {
      toast.error("Đã xảy ra lỗi, không thể thêm mới.");
      console.error("Lỗi: ", error);
    }
  };

  const handleUpdate = async (id: number, data: SupplierRequest) => {
    try {
      console.log(data);
      await supplierService.update(id, data);
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
      await supplierService.delete(id);
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

  const handleRowClick = (row: SupplierResponse) => {
    setRow(row);
  };

  const columns: Column<SupplierResponse>[] = [
    { key: "name", label: "Tên nhà cung cấp" },
    { key: "address", label: "Địa chỉ" },
    { key: "phone", label: "Số điện thoại" },
    { key: "email", label: "Email" },
    {
      key: "createdAt",
      label: "Ngày tạo",
      render: (_, record) =>
        new Date(record.createdAt).toLocaleDateString("vi-VN"),
    },
  ];

  const filterData: SupplierResponse[] = filterAndSortData<SupplierResponse>(
    data,
    query,
    searchKey
  );

  return (
    <div className="">
      <div className="flex justify-between items-center border-b-gray-300 border-b pb-3">
        <div>
          <h1 className="text-xl font-semibold">Quản lý nhà cung cấp</h1>
          <p className="text-lg text-gray-500">
            Bảng hiển thị các nhà cung cấp có trong hệ thống
          </p>
        </div>
        <div>
          <button
            onClick={() => setOpenModal(true)}
            className="bg-[#12B0C2] text-white px-4 py-2 rounded hover:bg-[#0E8DA1] flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} /> Thêm nhà cung cấp
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
              {/* Chọn khóa tìm */}
              <select
                // id="searchKey"
                // value={searchKey}
                className="border border-gray-400 p-2 rounded-lg"
                onChange={(e) =>
                  setSearchKey(e.target.value as keyof SupplierResponse)
                }
              >
                <option value="name">Tên nhà cung cấp</option>
                <option value="address">Địa chỉ</option>
                <option value="phone">Số điện thoại</option>
                <option value="email">Email</option>
              </select>

              <SearchBar
                value={query}
                onChange={setQuery}
                placeholder="Tìm kiếm nhà cung cấp..."
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

      <AddForm<SupplierRequest>
        title="Thêm hãng sản xuất"
        fields={fields}
        isOpen={openModal}
        onSubmit={handleAdd}
        onClose={() => setOpenModal(false)}
      />

      {row && (
        <UpdateForm
          title="Cập nhật loại thuốc"
          data={row}
          isOpen={openEdit}
          onSubmit={async (values) => {
            await handleUpdate(values.id, values);
          }}
          onClose={() => setOpenEdit(false)}
          fieldConfig={{
            id: { readOnly: true },
            email: {type: "email"},
            createdAt: { readOnly: true },
          }}
        />
      )}
    </div>
  );
};

export default SupplierPage;
