import React, { useEffect, useState } from "react";
import { View, Alert } from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { FieldConfig } from "@/types/ui/modalType";
import { DynamicModalForm } from "@/components/ui/DynamicModalForm";
import { Text } from "react-native";
import GenericTable from "../ui/GenericTable";
import EntityTool from "../ui/EntityTool";
import { SupplierRequest, SupplierResponse } from "@/types/api/medicineType";
import {
  createSupplier,
  deleteSupplier,
  fetchSuppliers,
  updateSupplier,
} from "@/store/slices/supplierSlice";

interface Props {
  onFetchCount: () => void
}

export default function SupplierPage({onFetchCount}:Props) {
  const [selected, setSelected] = useState<SupplierResponse | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState<SupplierRequest | null>(null);

  const dispatch = useAppDispatch();
  const { loading, data: suppliers } = useAppSelector(
    (state) => state.supplier
  );

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);

  const fields: FieldConfig<SupplierRequest>[] = [
    {
      key: "name",
      label: "Tên nhà cung cấp",
      type: "text",
      placeholder: "Nhập tên nhà cung cấp",
    },
    {
      key: "address",
      label: "Địa chỉ",
      type: "text",
      placeholder: "Nhập địa chỉ nhà cung cấp",
    },
    {
      key: "phone",
      label: "Số điện thoại",
      type: "text",
      placeholder: "Nhập số điện thoại",
    },
    {
      key: "email",
      label: "Email",
      type: "text",
      placeholder: "Nhập địa chỉ email",
    },
  ];

  // Reload lại data
  const handleReload = async () => {
    await dispatch(fetchSuppliers());
  };

  const handleDelete = () => {
    if (!selected) return;
    Alert.alert("Xác nhận", "Bạn có chắc muốn xóa nhà cung cấp này không?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          await dispatch(deleteSupplier(selected.id));
          Alert.alert("Xóa thành công!");
          await onFetchCount();
          setSelected(null);
        },
      },
    ]);
  };

  const handleEdit = () => {
    if (!selected) return;
    setFormData({
      name: selected.name,
      address: selected.address,
      phone: selected.phone,
      email: selected.email,
    });
    setModalVisible(true);
  };

  const handleAdd = () => {
    setSelected(null);
    setFormData({ name: "", address: "", phone: "", email: "" });
    setModalVisible(true);
  };

  const handleSelect = (item: SupplierResponse) => {
    setSelected(item);
  };

  const handleSubmit = async (values: SupplierRequest) => {
    try {
      if (selected) {
        await dispatch(updateSupplier({ id: selected.id, data: values }));
        Alert.alert("Cập nhật thành công!");
      } else {
        await dispatch(createSupplier(values));
        Alert.alert("Thêm nhà cung cấp thành công!");
      }
      await onFetchCount();
      setModalVisible(false);
      setSelected(null);
    } catch (error) {
      console.error("Lỗi khi lưu:", error);
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <EntityTool
        entityName="khoa"
        selectedItem={selected}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onReload={handleReload}
      />
      <GenericTable
        data={suppliers}
        selectedItem={selected}
        onSelected={handleSelect}
        columns={[
          { key: "name", label: "Tên nhà cung cấp", width: 220 },
          { key: "address", label: "Địa chỉ", width: 220 },
          { key: "phone", label: "Số điện thoại", width: 100 },
          { key: "email", label: "Email", width: 220 },

          {
            key: "createdAt",
            label: "Ngày tạo",
            width: 80,
            render: (item: SupplierResponse) => (
              <Text className="text-gray-600">
                {new Date(item.createdAt).toLocaleDateString("vi-VN")}
              </Text>
            ),
          },
        ]}
      />

      <DynamicModalForm
        visible={modalVisible}
        title={selected ? "Cập nhật nhà cung cấp" : "Thêm nhà cung cấp"}
        fields={fields}
        data={formData}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
      />
    </View>
  );
}
