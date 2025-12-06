import React, { useEffect, useState } from "react";
import { View, Alert } from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { FieldConfig } from "@/types/ui/modalType";
import { DynamicModalForm } from "@/components/ui/DynamicModalForm";
import { fetchDepartments } from "@/store/slices/departmentSlice";
import { Text } from "react-native";
import GenericTable from "../ui/GenericTable";
import EntityTool from "../ui/EntityTool";
import { TagResponse } from "@/types/api/tagType";
import { fetchTags } from "@/store/slices/tagSlice";

export default function TagPage() {
  const [selected, setSelected] = useState<TagResponse | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
//   const [formData, setFormData] = useState<SpecialtyRequest | null>(null);

  const dispatch = useAppDispatch();
  const { loading, data } = useAppSelector(
    (state) => state.tag
  );
  const departments = useAppSelector((state) => state.department.data);

  useEffect(() => {
    dispatch(fetchTags());
    if (departments.length === 0) dispatch(fetchDepartments());
  }, [dispatch]);

  // Cấu hình các field form
//   const fields: FieldConfig<SpecialtyRequest>[] = [
//     {
//       key: "name",
//       label: "Tên chuyên khoa",
//       type: "text",
//       placeholder: "Nhập tên chuyên khoa",
//     },
//     {
//       key: "description",
//       label: "Mô tả",
//       type: "textarea",
//       placeholder: "Nhập mô tả",
//     },
//     {
//       key: "departmentId",
//       label: "Khoa trực thuộc",
//       type: "select",
//       options: departments.map((d) => ({ label: d.name, value: d.id })),
//       placeholder: "Chọn khoa",
//     },
//   ];

  // Reload lại data
  const handleReload = async () => {
    await dispatch(fetchTags());
  };

  const handleDelete = () => {
    if (!selected) return;
    Alert.alert("Xác nhận", "Bạn có chắc muốn xóa chuyên khoa này không?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
        //   await dispatch(deleteSpecialty(selected.id));
          Alert.alert("Xóa thành công!");
          setSelected(null);
        },
      },
    ]);
  };

  const handleEdit = () => {
    if (!selected) return;
    // setFormData({
    //   name: selected.name,
    //   description: selected.description,
    //   departmentId: selected.department?.id || 0,
    // });
    setModalVisible(true);
  };

  const handleAdd = () => {
    setSelected(null);
    // setFormData({ name: "", description: "", departmentId: 0 });
    setModalVisible(true);
  };

  const handleSelect = (item: TagResponse) => {
    setSelected(item);
  };

//   const handleSubmit = async (values: SpecialtyRequest) => {
//     try {
//       if (selected) {
//         await dispatch(updateSpecialty({ id: selected.id, data: values }));
//         Alert.alert("Cập nhật thành công!");
//       } else {
//         await dispatch(createSpecialty(values));
//         Alert.alert("Thêm chuyên khoa thành công!");
//       }
//       setModalVisible(false);
//       setSelected(null);
//     } catch (error) {
//       console.error("Lỗi khi lưu chuyên khoa:", error);
//     }
//   };

  return (
    <View className="flex-1 bg-gray-50">
      {/* <DepartmentTool
        selectedItem={selected}
        onAdd={handleAdd}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onReload={handleReload}
      /> */}

      <EntityTool
        entityName="khoa"
        selectedItem={selected}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onReload={handleReload}
      />

      {/* <DepartmentTable onSelected={handleSelect} selectedItem={selected} /> */}
      <GenericTable
        data={data}
        selectedItem={selected}
        onSelected={handleSelect}
        columns={[
          { key: "name", label: "Tên nhãn", width: 400 },
        ]}
      />

      {/* <DynamicModalForm
        visible={modalVisible}
        title={selected ? "Cập nhật chuyên khoa" : "Thêm chuyên khoa"}
        fields={fields}
        data={formData}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
      /> */}
    </View>
  );
}
