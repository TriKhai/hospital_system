// src/pages/admin/DoctorPage.tsx
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { dataDocTor } from '../../data/doctor';
import type { DoctorType } from '../../types/doctorType';
import type { Column } from '../../types/tableType';
import DataTable from '../../components/layout/admin/DataTable';

const DoctorPage: React.FC = () => {
  const [doctors, setDoctors] = useState<DoctorType[]>(dataDocTor);
  const [loading, setLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   const fetchDoctors = async () => {
  //     try {
  //       const res = await doctorService.getAll();
  //       setDoctors(res);
  //     } catch (error) {
  //       console.error('Lấy danh sách bác sĩ lỗi', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchDoctors();
  // }, []);



  const columns: Column<DoctorType>[] = [
    {
      key: "name",
      label: "Họ tên"
    },
    {
      key: "email",
      label: "Email"
    },
    {
      key: "phone",
      label: "Họ tên"
    },
    {
      key: "address",
      label: "Họ tên"
    },
    {
      key: "birthDay",
      label: "Họ tên"
    },
    {
      key: "gender",
      label: "Họ tên"
    }
  ]

  const handleEdit = (doctor: DoctorType) => {
    console.log('Edit', doctor);
    // navigate(`/admin/doctor/edit/${doctor.id}`);
  };

  const handleDelete = (doctor: DoctorType) => {
    if (window.confirm(`Bạn có chắc muốn xóa bác sĩ ${doctor.name}?`)) {
      console.log('Delete', doctor);
      // gọi API xóa, sau đó reload
    }
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2">
          <FontAwesomeIcon icon={faPlus} /> Thêm bác sĩ
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <span>Đang tải danh sách bác sĩ...</span>
        </div>
      ) : (
        <DataTable
          data={doctors}
          columns={columns}
          rowKey="id"
          title="Danh sách bác sĩ"
        />
      )}
    </div>
  );
};

export default DoctorPage;
