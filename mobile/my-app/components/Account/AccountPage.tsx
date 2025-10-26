import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Text } from "react-native";
import GenericTable from "../ui/GenericTable";
import { AccountResponse } from "@/types/api/accountType";
import { fetchAccounts } from "@/store/slices/accountSlice";

export default function AccountPage() {
  const [selected, setSelected] = useState<AccountResponse | null>(null);

  const dispatch = useAppDispatch();
  const { loading, data: accounts } = useAppSelector((state) => state.account);

  // Fetch chuyên khoa + khoa (nếu chưa có)
  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  // Reload lại data
  const handleReload = async () => {
    await dispatch(fetchAccounts());
  };

  const handleSelect = (item: AccountResponse) => {
    setSelected(item);
  };

  return (
    <View className="flex-1 bg-gray-50">
      <GenericTable
        data={accounts}
        selectedItem={selected}
        onSelected={handleSelect}
        columns={[
          { key: "username", label: "Tên tài khoản", width: 160 },

          {
            key: "password",
            label: "Mật khẩu",
            width: 300,
            render: (item: AccountResponse) => (
              <Text className="text-gray-800">{item.password}</Text>
            ),
          },

          {
            key: "role",
            label: "Vai trò",
            width: 120,
            render: (item: AccountResponse) => (
              <Text className="text-gray-800">
                {item.role === "ADMIN"
                  ? "Quản trị viên"
                  : item.role === "DOCTOR"
                    ? "Bác sĩ"
                    : item.role === "PATIENT"
                      ? "Bệnh nhân"
                      : item.role}
              </Text>
            ),
          },

          {
            key: "createdAt",
            label: "Ngày tạo",
            width: 140,
            render: (item: AccountResponse) => (
              <Text className="text-gray-600">
                {new Date(item.createdAt).toLocaleDateString("vi-VN")}
              </Text>
            ),
          },

          {
            key: "updatedAt",
            label: "Cập nhật",
            width: 140,
            render: (item: AccountResponse) => (
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
