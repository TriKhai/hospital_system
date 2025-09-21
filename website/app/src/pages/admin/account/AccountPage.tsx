import { useEffect, useState } from "react";
import type { Column } from "../../../types/tableType";
import DataTable from "../../../components/layout/admin/DataTable";
import type { AccountResponse } from "../../../types/accountType";
import accountService from "../../../services/accountApi";

const AccountPage: React.FC = () => {
  const [data, setData] = useState<AccountResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);
        const res = await accountService.getAll();
        setData(res);
      } catch (error) {
        console.error("Fetch data error: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  const columns: Column<AccountResponse>[] = [
    { key: "username", label: "Tên tài khoản" },
    { key: "password", label: "Mật khẩu" },
    { key: "role", label: "Quyền" },
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

  return (
    <div className="">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-xl font-semibold">Quản lý tài khoản</h1>
          <p className="text-lg text-gray-500">
            Bảng hiển thị các tài khoản người dùng có trong hệ thống
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

export default AccountPage;
