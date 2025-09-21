import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import type {
  FieldConfig,
  Option,
} from "../../../components/layout/form/AddForm";
import type {
  SpecialtyRequest,
  SpecialtyResponse,
} from "../../../types/specialtyType";
import specialtyService from "../../../services/specialtyApi";
import type { Column } from "../../../types/tableType";
import DataTable from "../../../components/layout/admin/DataTable";
import AddForm from "../../../components/layout/form/AddForm";
import type { DepartmentResponse } from "../../../types/departmentType";
import departmentService from "../../../services/departmentApi";

const SpecialtyPage: React.FC = () => {
  const [data, setData] = useState<SpecialtyResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [departmentOptions, setDepartmentOptions] = useState<Option[]>([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);
        const res = await specialtyService.getAll();
        setData(res);

        const resDepartment = await departmentService.getAll();
        setDepartmentOptions(
          resDepartment.map((d: DepartmentResponse) => ({
            label: d.name,
            value: d.id,
          }))
        );
      } catch (error) {
        console.error("Fetch data error: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  const handelAdd = async (data: SpecialtyRequest) => {
    await specialtyService.create(data);
  };

  const columns: Column<SpecialtyResponse>[] = [
    { key: "name", label: "Tên chuyên khoa" },
    { key: "description", label: "Mô tả" },
    {
      key: "department",
      label: "Khoa",
      render: (_, record) => record.department?.name ?? "-",
    },
    {
      key: "createdAt",
      label: "Ngày tạo",
      render: (_, record) =>
        new Date(record.createdAt).toLocaleDateString("vi-VN"),
    },
    
  ];

  const fields: FieldConfig<SpecialtyRequest>[] = [
    { label: "Tên chuyên khoa", name: "name", required: true },
    { label: "Mô tả", name: "description", type: "textarea", required: true },
    {
      label: "Khoa",
      name: "departmentId",
      type: "select",
      options: departmentOptions,
    },
  ];

  return (
    <div className="">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-xl font-semibold">Quản lý chuyên khoa</h1>
          <p className="text-lg text-gray-500">
            Bảng hiển thị các chuyên khoa có trong hệ thống
          </p>
        </div>
        <div>
          <button
            onClick={() => setOpenModal(true)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} /> Thêm chuyên khoa
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <span>Đang tải danh sách khoa...</span>
        </div>
      ) : (
        <DataTable data={data} columns={columns} rowKey="id" />
      )}

      <AddForm<SpecialtyRequest>
        title="Thêm chuyên khoa"
        fields={fields}
        isOpen={openModal}
        onSubmit={handelAdd}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
};

export default SpecialtyPage;
