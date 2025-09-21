import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import type { FieldConfig } from "../../../components/layout/form/AddForm";

const SpecialtyPage: React.FC = () => {
  // const [specialties, setSpecialties] = useState<DepartmentResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  // const fields: FieldConfig<>[] = [
  //   {
  //     label: 
  //   }
  // ]

  return (
    <div className="">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-xl font-semibold">Quản lý chuyên khoa khoa</h1>
          <p className="text-lg text-gray-500">
            Bảng hiển thị các chuyên khoa có trong hệ thống
          </p>
        </div>
        <div>
          <button
            // onClick={() => setOpenModal(true)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} /> Thêm chuyên khoa
          </button>
        </div>
      </div>

      {/* {loading ? (
        <div className="flex justify-center items-center h-40">
          <span>Đang tải danh sách khoa...</span>
        </div>
      ) : (
        <DataTable data={departments} columns={columns} rowKey="id" />
      )} */}

      {/* <AddForm<DepartmentRequest>
        title="Thêm khoa"
        fields={fields}
        isOpen={openModal}
        onSubmit={handleAddDepartment}
        onClose={() => setOpenModal(false)}
      /> */}
    </div>
  );
};

export default SpecialtyPage;
