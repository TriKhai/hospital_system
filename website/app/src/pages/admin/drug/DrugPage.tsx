// src/pages/admin/DepartmentPage.tsx
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faPlus,
  faRotateRight,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import type { Column } from "../../../types/tableType";
import DataTable from "../../../components/layout/admin/DataTable";
import { toast } from "react-toastify";
import SearchBar from "../../../components/layout/form/SearchBar";
import { filterAndSortData } from "../../../utils/filterAndSortData";
import {
  type DrugTypeResponse,
  type DrugResponse,
  type ManufacturerResponse,
  type SupplierResponse,
} from "../../../types/drugType";
import drugService from "../../../services/drugApi";
import drugTypeService from "../../../services/drugTypeApi";
import manufacturerService from "../../../services/manufacturer";
import supplierService from "../../../services/supplierApi";
import DrugAddForm from "../../../components/layout/form/DrugAddForm";
import DrugUpdateForm from "../../../components/layout/form/DrugUpdateForm";

const DrugPage: React.FC = () => {
  const [data, setData] = useState<DrugResponse[]>([]);
  const [row, setRow] = useState<DrugResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState("");
  const [searchKey, setSearchKey] = useState<keyof DrugResponse>("name");
  const [drugtypes, setDrugTypes] = useState<DrugTypeResponse[]>([]);
  const [manufacturers, setManufacturers] = useState<ManufacturerResponse[]>(
    []
  );
  const [suppliers, setSuppliers] = useState<SupplierResponse[]>([]);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [openUpdateForm, setOpenUpdateForm] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await drugService.getAll();
      setData(res);

      const dtRes = await drugTypeService.getAll();
      setDrugTypes(dtRes);

      const mRes = await manufacturerService.getAll();
      setManufacturers(mRes);

      const sRes = await supplierService.getAll();
      setSuppliers(sRes);
    } catch (error) {
      console.error("Error fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (formData: FormData) => {
    try {
      await drugService.create(formData);
      toast.success("Thêm mới thành công");
      fetchData();
    } catch (error) {
      toast.error("Thêm thất bại");
      console.error(error);
    }
  };

  const handleUpdate = async (formData: FormData) => {
    if (!row) return; // đảm bảo row tồn tại
    try {
      await drugService.update(row.id, formData);
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
      await drugService.delete(id);
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

  const handleRowClick = (row: DrugResponse) => {
    setRow(row);
  };

  const columns: Column<DrugResponse>[] = [
    { key: "name", label: "Tên thuốc" },
    { key: "effects", label: "Công dụng" },
    { key: "price", label: "Giá bán" },
    { key: "stock", label: "Số lượng kho" },
    { key: "usageInstructions", label: "Hướng dẫn dùng" },
    { key: "expiredAt", label: "Hạn sử dụng" },
    {
      key: "drugType",
      label: "Loại thuốc",
      render: (_, record) => record.drugType?.name ?? "-",
    },
    {
      key: "manufacturer",
      label: "Hãng sản xuất",
      render: (_, record) => record.manufacturer?.name ?? "-",
    },
    {
      key: "supplier",
      label: "Nhà cung cấp",
      render: (_, record) => record.supplier?.name ?? "-",
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
        new Date(record.createdAt).toLocaleDateString("vi-VN"),
    },
  ];

  const filterData: DrugResponse[] = filterAndSortData<DrugResponse>(
    data,
    query,
    searchKey
  );

  return (
    <div className="">
      <div className="flex justify-between items-center border-b-gray-300 border-b pb-3">
        <div>
          <h1 className="text-xl font-semibold">Quản lý thuốc</h1>
          <p className="text-lg text-gray-500">
            Bảng hiển thị các thuốc có trong hệ thống
          </p>
        </div>
        <div>
          <button
            onClick={() => setOpenAddForm(true)}
            className="bg-[#12B0C2] text-white px-4 py-2 rounded hover:bg-[#0E8DA1] flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} /> Thêm thuốc
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
                  toast.error("Chọn thuốc để cập nhật");
                  return;
                }
                setOpenUpdateForm(true);
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
                  setSearchKey(e.target.value as keyof DrugResponse)
                }
              >
                <option value="name">Tên thuốc</option>
                <option value="effects">Công dụng</option>
                <option value="usageInstructions">Hướng dẫn sử dụng</option>
                <option value="manufacturer">Hãng sản xuất</option>
                <option value="supplier">Nhà cung cấp</option>
                <option value="drugType">Loại thuốc</option>
              </select>

              <SearchBar
                value={query}
                onChange={setQuery}
                placeholder="Tìm kiếm thuốc..."
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

      {openAddForm && (
        <DrugAddForm
          isOpen={openAddForm}
          onClose={() => setOpenAddForm(false)}
          onSubmit={handleAdd}
          manufacturers={manufacturers}
          suppliers={suppliers}
          drugTypes={drugtypes}
        />
      )}

      {openUpdateForm && row && (
        <DrugUpdateForm
          isOpen={openUpdateForm}
          data={row} // row kiểu DrugResponse
          onClose={() => setOpenUpdateForm(false)}
          onSubmit={handleUpdate} // chỉ nhận FormData
          manufacturers={manufacturers}
          suppliers={suppliers}
          drugTypes={drugtypes}
        />
      )}
    </div>
  );
};

export default DrugPage;
