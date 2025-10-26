import React, { useEffect, useState } from "react";
import { View, Alert } from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { FieldConfig } from "@/types/ui/modalType";
import { DynamicModalForm } from "@/components/ui/DynamicModalForm";
import { Text } from "react-native";
import GenericTable from "../ui/GenericTable";
import EntityTool from "../ui/EntityTool";
import {
  ManufacturerRequest,
  ManufacturerResponse,
} from "@/types/api/medicineType";
import {
  createManufacturer,
  deleteManufacturer,
  fetchManufacturers,
  updateManufacturer,
} from "@/store/slices/manufacturerSlice";

interface Props {
  onFetchCount: () => void;
}

export default function ManufacturerPage({ onFetchCount }: Props) {
  const [selected, setSelected] = useState<ManufacturerResponse | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState<ManufacturerRequest | null>(null);

  const dispatch = useAppDispatch();
  const { loading, data } = useAppSelector((state) => state.manufacturer);

  useEffect(() => {
    dispatch(fetchManufacturers());
  }, [dispatch]);

  const fields: FieldConfig<ManufacturerRequest>[] = [
    {
      key: "name",
      label: "Tên hãng sản xuất",
      type: "text",
      placeholder: "Nhập hãng sản xuất",
    },
    {
      key: "country",
      label: "Thành phố",
      type: "text",
      placeholder: "Nhập địa chỉ hãng sản xuất",
    },
  ];

  // Reload lại data
  const handleReload = async () => {
    await dispatch(fetchManufacturers());
  };

  const handleDelete = () => {
    if (!selected) return;
    Alert.alert("Xác nhận", "Bạn có chắc muốn xóa hãng sản xuất này không?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          await dispatch(deleteManufacturer(selected.id));
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
      country: selected.country,
    });
    setModalVisible(true);
  };

  const handleAdd = () => {
    setSelected(null);
    setFormData({ name: "", country: "" });
    setModalVisible(true);
  };

  const handleSelect = (item: ManufacturerResponse) => {
    setSelected(item);
  };

  const handleSubmit = async (values: ManufacturerRequest) => {
    try {
      if (selected) {
        await dispatch(updateManufacturer({ id: selected.id, data: values }));
        Alert.alert("Cập nhật thành công!");
      } else {
        await dispatch(createManufacturer(values));
        Alert.alert("Thêm mới thành công!");
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
        data={data}
        selectedItem={selected}
        onSelected={handleSelect}
        columns={[
          { key: "name", label: "Tên nhà cung cấp", width: 220 },
          { key: "country", label: "Địa chỉ (Thành phố)", width: 220 },
          {
            key: "createdAt",
            label: "Ngày tạo",
            width: 80,
            render: (item: ManufacturerResponse) => (
              <Text className="text-gray-600">
                {new Date(item.createdAt).toLocaleDateString("vi-VN")}
              </Text>
            ),
          },
        ]}
      />

      <DynamicModalForm
        visible={modalVisible}
        title={selected ? "Cập nhật hãng thuốc" : "Thêm hãng thuốc"}
        fields={fields}
        data={formData}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
      />
    </View>
  );
}
