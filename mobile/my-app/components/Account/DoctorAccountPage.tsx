import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Text } from "react-native";
import GenericTable from "../ui/GenericTable";
import { DoctorType } from "@/types/api/doctorType";
import { fetchDoctorAccounts } from "@/store/slices/doctorAccountSlice";

export default function DoctorAccountPage() {
  const [selected, setSelected] = useState<DoctorType | null>(null);

  const dispatch = useAppDispatch();
  const { loading, data: doctorAccounts } = useAppSelector(
    (state) => state.doctorAccount
  );

  // Fetch chuyên khoa + khoa (nếu chưa có)
  useEffect(() => {
    dispatch(fetchDoctorAccounts());
  }, [dispatch]);

  // Reload lại data
  const handleReload = async () => {
    await dispatch(fetchDoctorAccounts());
  };

  const handleSelect = (item: DoctorType) => {
    setSelected(item);
  };

  return (
    <View className="flex-1 bg-gray-50">
      <GenericTable
        data={doctorAccounts}
        selectedItem={selected}
        onSelected={handleSelect}
        columns={[
          { key: "name", label: "Họ và tên", width: 180 },

          {
            key: "gender",
            label: "Giới tính",
            width: 100,
            render: (item: DoctorType) => (
              <Text className="text-gray-800">
                {item.gender ? "Nam" : "Nữ"}
              </Text>
            ),
          },

          {
            key: "birthDay",
            label: "Ngày sinh",
            width: 140,
            render: (item: DoctorType) => (
              <Text className="text-gray-800">
                {new Date(item.birthDay).toLocaleDateString("vi-VN")}
              </Text>
            ),
          },

          { key: "email", label: "Email", width: 200 },
          { key: "phone", label: "Số điện thoại", width: 140 },
          { key: "address", label: "Địa chỉ", width: 240 },

          {
            key: "specialty",
            label: "Chuyên khoa",
            width: 160,
            render: (item: DoctorType) => (
              <Text className="text-gray-800">
                {item.specialty?.name || "—"}
              </Text>
            ),
          },

          {
            key: "degree",
            label: "Học vị",
            width: 140,
            render: (item: DoctorType) => (
              <Text className="text-gray-800">{item.degree || "—"}</Text>
            ),
          },

          {
            key: "yearsOfExperience",
            label: "Kinh nghiệm (năm)",
            width: 160,
            render: (item: DoctorType) => (
              <Text className="text-gray-800">
                {item.yearsOfExperience ?? "—"}
              </Text>
            ),
          },

          {
            key: "createdAt",
            label: "Ngày tạo",
            width: 140,
            render: (item: DoctorType) => (
              <Text className="text-gray-600">
                {new Date(item.createdAt).toLocaleDateString("vi-VN")}
              </Text>
            ),
          },

          {
            key: "updatedAt",
            label: "Cập nhật",
            width: 140,
            render: (item: DoctorType) => (
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
