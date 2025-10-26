import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Text } from "react-native";
import GenericTable from "../ui/GenericTable";
import { fetchPatientAccounts } from "@/store/slices/patientAccountSlice";
import { PatientResponse } from "@/types/api/patientType";

export default function PatientAccountPage() {
  const [selected, setSelected] = useState<PatientResponse | null>(null);

  const dispatch = useAppDispatch();
  const { loading, data: patientAccounts } = useAppSelector((state) => state.patientAccount);

  // Fetch chuyên khoa + khoa (nếu chưa có)
  useEffect(() => {
    dispatch(fetchPatientAccounts());
  }, [dispatch]);

  // Reload lại data
  const handleReload = async () => {
    await dispatch(fetchPatientAccounts());
  };

  const handleSelect = (item: PatientResponse) => {
    setSelected(item);
  };

  return (
    <View className="flex-1 bg-gray-50">
      <GenericTable
        data={patientAccounts}
        selectedItem={selected}
        onSelected={handleSelect}
        columns={[
          { key: "name", label: "Họ và tên", width: 180 },
          {
            key: "gender",
            label: "Giới tính",
            width: 100,
            render: (item: PatientResponse) => (
              <Text className="text-gray-800">
                {item.gender ? "Nam" : "Nữ"}
              </Text>
            ),
          },
          {
            key: "birthDate",
            label: "Ngày sinh",
            width: 140,
            render: (item: PatientResponse) => (
              <Text className="text-gray-800">
                {new Date(item.birthDate).toLocaleDateString("vi-VN")}
              </Text>
            ),
          },
          { key: "email", label: "Email", width: 200 },
          { key: "phone", label: "Số điện thoại", width: 140 },
          { key: "address", label: "Địa chỉ", width: 260 },
          {
            key: "createdAt",
            label: "Ngày tạo",
            width: 140,
            render: (item: PatientResponse) => (
              <Text className="text-gray-600">
                {new Date(item.createdAt).toLocaleDateString("vi-VN")}
              </Text>
            ),
          },
          {
            key: "updatedAt",
            label: "Cập nhật",
            width: 140,
            render: (item: PatientResponse) => (
              <Text className="text-gray-600">
                {new Date(item.updatedAt).toLocaleDateString("vi-VN")}
              </Text>
            ),
          },
        ]}
      />
    </View>
  );
}
