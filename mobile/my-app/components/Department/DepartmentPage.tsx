import React, { useEffect, useState } from "react";
import { View, Alert, Text } from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  createDepartment,
  deleteDepartment,
  fetchDepartments,
  updateDepartment,
} from "@/store/slices/departmentSlice";
import {
  DepartmentRequest,
  DepartmentResponse,
} from "@/types/api/departmentType";
import { FieldConfig } from "@/types/ui/modalType";
import { DynamicModalForm } from "@/components/ui/DynamicModalForm";
import DepartmentTool from "./DepartmentTool";
import DepartmentTable from "./DepartmentTable";
import GenericTable from "../ui/GenericTable";

const fields: FieldConfig<DepartmentRequest>[] = [
  {
    key: "name",
    label: "Tên khoa",
    type: "text",
    placeholder: "Nhập tên khoa",
  },
  {
    key: "description",
    label: "Mô tả",
    type: "textarea",
    placeholder: "Mô tả khoa",
  },
];

const DepartmentPage = () => {
  const [selected, setSelected] = useState<DepartmentResponse | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState<DepartmentRequest | null>(null);

  const dispatch = useAppDispatch();
  const { data: specialties, loading } = useAppSelector(
    (state) => state.specialty
  );

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  const reloadData = async () => {
    try {
      await dispatch(fetchDepartments()).unwrap();
      // Alert.alert("Xoá thành công !");
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleDelete = () => {
    if (!selected) return;
    Alert.alert("Xác nhận", "Bạn có chắc muốn xóa khoa này không?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          await dispatch(deleteDepartment(selected.id));
          Alert.alert("Xoá thành công !");
          setSelected(null);
        },
      },
    ]);
  };

  const handleEdit = () => {
    if (!selected) return;
    setFormData({
      name: selected.name,
      description: selected.description,
    });
    setModalVisible(true);
  };

  const handleAdd = () => {
    setSelected(null);
    setFormData({ name: "", description: "" });
    setModalVisible(true);
  };

  const handleSelect = (item: DepartmentResponse) => {
    setSelected(item);
  };

  const handleSubmit = async (values: DepartmentRequest) => {
    try {
      if (selected) {
        // Cập nhật
        await dispatch(updateDepartment({ id: selected.id, data: values }));
        Alert.alert("Cập nhật thành công !");
      } else {
        // Thêm mới
        await dispatch(createDepartment(values));
        Alert.alert("Thêm thành công !");
      }
      setModalVisible(false);
      setSelected(null);
    } catch (error) {
      console.error("Lỗi khi lưu khoa:", error);
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <DepartmentTool
        selectedItem={selected}
        onAdd={handleAdd}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onReload={reloadData}
      />
      {/* <GenericTable
        data={specialties}
        selectedItem={selected}
        onSelected={handleSelect}
        columns={[
          { key: "name", label: "Tên khoa", width: 160 },
          { key: "description", label: "Mô tả", width: 280 },
          {
            key: "createdAt",
            label: "Ngày tạo",
            width: 120,
            render: (item) => (
              <Text className="text-gray-600">
                {new Date(item.createdAt).toLocaleDateString("vi-VN")}
              </Text>
            ),
          },
        ]}
      /> */}
      <DepartmentTable onSelected={handleSelect} selectedItem={selected} />
      <DynamicModalForm
        visible={modalVisible}
        title={selected ? "Cập nhật khoa" : "Thêm khoa"}
        fields={fields}
        data={formData}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
      />
    </View>
  );
};

export default DepartmentPage;
