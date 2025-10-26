import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface Props<T> {
  entityName: string; // ví dụ: "khoa", "bác sĩ", "chuyên khoa"
  selectedItem: T | null;
  onAdd: () => void;
  onEdit: (item: T) => void;
  onDelete: () => void;
  onReload: () => void;
}

export default function EntityTool<T>({
  entityName,
  selectedItem,
  onAdd,
  onEdit,
  onDelete,
  onReload,
}: Props<T>) {
  return (
    <View className="flex-row justify-between mb-3">
      {/* Nhóm trái */}
      <View className="flex-row space-x-2 gap-2">
        {/* Làm mới */}
        <TouchableOpacity
          onPress={onReload}
          className="bg-light-200 px-3 py-2 rounded-lg flex-row items-center"
        >
          <FontAwesome name="refresh" size={16} color="white" />
          <Text className="text-white ml-1">Làm mới</Text>
        </TouchableOpacity>

        {/* Chỉnh sửa */}
        <TouchableOpacity
          disabled={!selectedItem}
          onPress={() => selectedItem && onEdit(selectedItem)}
          className={`px-3 py-2 rounded-lg flex-row items-center ${
            selectedItem ? "bg-light-200" : "bg-gray-300"
          }`}
        >
          <FontAwesome name="edit" size={16} color="white" />
          <Text className="text-white ml-1">Cập nhật</Text>
        </TouchableOpacity>

        {/* Xóa */}
        <TouchableOpacity
          disabled={!selectedItem}
          onPress={onDelete}
          className={`px-3 py-2 rounded-lg flex-row items-center ${
            selectedItem ? "bg-light-200" : "bg-gray-300"
          }`}
        >
          <FontAwesome name="trash" size={16} color="white" />
          <Text className="text-white ml-1">Xóa</Text>
        </TouchableOpacity>
      </View>

      {/* Thêm mới */}
      <TouchableOpacity
        onPress={onAdd}
        className="bg-light-200 px-3 py-2 rounded-lg flex-row items-center"
      >
        <FontAwesome name="plus" size={16} color="white" />
        <Text className="text-white ml-1">Thêm {entityName}</Text>
      </TouchableOpacity>
    </View>
  );
}
