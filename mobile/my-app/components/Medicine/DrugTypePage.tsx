import React, { useEffect, useState } from "react";
import { View, Alert } from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { FieldConfig } from "@/types/ui/modalType";
import { DynamicModalForm } from "@/components/ui/DynamicModalForm";
import { Text } from "react-native";
import GenericTable from "../ui/GenericTable";
import EntityTool from "../ui/EntityTool";
import { DrugTypeRequest, DrugTypeResponse } from "@/types/api/medicineType";
import {
  createDrugType,
  deleteDrugType,
  fetchDrugTypes,
  updateDrugType,
} from "@/store/slices/drugTypeSlice";

interface Props {
  onFetchCount: () => void;
}

export default function DrugTypePage({ onFetchCount }: Props) {
  const [selected, setSelected] = useState<DrugTypeResponse | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState<DrugTypeRequest | null>(null);

  const dispatch = useAppDispatch();
  const { loading, data: drugTypes } = useAppSelector(
    (state) => state.drugType
  );

  useEffect(() => {
    dispatch(fetchDrugTypes());
  }, [dispatch]);

  const fields: FieldConfig<DrugTypeRequest>[] = [
    {
      key: "name",
      label: "Tên loại thuốc",
      type: "text",
      placeholder: "Nhập tên loại thuốc",
    },
    {
      key: "unit",
      label: "Đơn vị",
      type: "text",
      placeholder: "Nhập đơn vị loại thuốc",
    },
  ];

  // Reload lại data
  const handleReload = async () => {
    await dispatch(fetchDrugTypes());
  };

  const handleDelete = () => {
    if (!selected) return;
    Alert.alert("Xác nhận", "Bạn có chắc muốn xóa loại thuốc này không?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          await dispatch(deleteDrugType(selected.id));
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
      unit: selected.unit,
    });
    setModalVisible(true);
  };

  const handleAdd = () => {
    setSelected(null);
    setFormData({ name: "", unit: "" });
    setModalVisible(true);
  };

  const handleSelect = (item: DrugTypeResponse) => {
    setSelected(item);
  };

  const handleSubmit = async (values: DrugTypeRequest) => {
    try {
      if (selected) {
        await dispatch(updateDrugType({ id: selected.id, data: values }));
        Alert.alert("Cập nhật thành công!");
      } else {
        await dispatch(createDrugType(values));
        Alert.alert("Thêm loại thuốc thành công!");
      }
      await onFetchCount();
      setModalVisible(false);
      setSelected(null);
    } catch (error) {
      console.error("Lỗi khi lưu loại thuốc:", error);
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
        data={drugTypes}
        selectedItem={selected}
        onSelected={handleSelect}
        columns={[
          { key: "name", label: "Tên loại thuốc", width: 220 },
          { key: "unit", label: "Đơn vị", width: 100 },

          {
            key: "createdAt",
            label: "Ngày tạo",
            width: 80,
            render: (item: DrugTypeResponse) => (
              <Text className="text-gray-600">
                {new Date(item.createdAt).toLocaleDateString("vi-VN")}
              </Text>
            ),
          },
        ]}
      />

      <DynamicModalForm
        visible={modalVisible}
        title={selected ? "Cập nhật loại thuôc" : "Thêm loại thuôc"}
        fields={fields}
        data={formData}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
      />
    </View>
  );
}
