import React, { useEffect, useState } from "react";
import { View, Alert } from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { FieldConfig } from "@/types/ui/modalType";
import { DynamicModalForm } from "@/components/ui/DynamicModalForm";
import GenericTable from "../ui/GenericTable";
import EntityTool from "../ui/EntityTool";
import { CategoryReponse, CategoryRequest } from "@/types/api/categoryType";
import { createCategory, deleteCategory, fetchCategories, updateCategory } from "@/store/slices/categorySlice";

export default function CategoryPage() {
  const [selected, setSelected] = useState<CategoryReponse | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState<CategoryRequest | null>(null);

  const dispatch = useAppDispatch();
  const { loading, data } = useAppSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Cấu hình các field form
  const fields: FieldConfig<CategoryRequest>[] = [
    {
      key: "name",
      label: "Tên chuyên khoa",
      type: "text",
      placeholder: "Nhập tên chuyên khoa",
    },
    {
      key: "description",
      label: "Mô tả",
      type: "textarea",
      placeholder: "Nhập mô tả",
    }
  ];

  // Reload lại data
  const handleReload = async () => {
    await dispatch(fetchCategories());
  };

  const handleDelete = () => {
    if (!selected) return;
    Alert.alert("Xác nhận", "Bạn có chắc muốn xóa chuyên khoa này không?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          await dispatch(deleteCategory(selected.id));
          Alert.alert("Xóa thành công!");
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

  const handleSelect = (item: CategoryReponse) => {
    setSelected(item);
  };

  const handleSubmit = async (values: CategoryRequest) => {
    try {
      if (selected) {
        await dispatch(updateCategory({ id: selected.id, data: values }));
        Alert.alert("Cập nhật thành công!");
      } else {
        await dispatch(createCategory(values));
        Alert.alert("Thêm mới thành công!");
      }
      setModalVisible(false);
      setSelected(null);
    } catch (error) {
      console.error("Lỗi khi lưu chuyên khoa:", error);
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
          { key: "name", label: "Tên loại", width: 160 },
          { key: "description", label: "Mô tả", width: 240 },
        ]}
      />

      <DynamicModalForm
        visible={modalVisible}
        title={selected ? "Cập nhật loại bài viết" : "Thêm loại bài viết"}
        fields={fields}
        data={formData}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
      />
    </View>
  );
}
