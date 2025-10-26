import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { DepartmentResponse } from '@/types/api/departmentType';
import EntityTool from '../ui/EntityTool';

interface Props {
    selectedItem: DepartmentResponse | null,
    onEdit: (item: DepartmentResponse) => void
    onAdd: () => void,
    onDelete: () => void,
    onReload: () => void,
}

const DepartmentTool = ({selectedItem, onAdd, onEdit, onDelete, onReload} : Props) => {
  return (
    // <View className="flex-row justify-between mb-3">
    //     <View className="flex-row space-x-2">
    //       <TouchableOpacity onPress={onReload} className="bg-blue-500 px-3 py-2 rounded-lg flex-row items-center">
    //         <FontAwesome name="refresh" size={16} color="white" />
    //         <Text className="text-white ml-1">Refresh</Text>
    //       </TouchableOpacity>

    //       <TouchableOpacity
    //         disabled={!selectedItem}
    //         onPress={() => {
    //           if (selectedItem) {
    //             onEdit(selectedItem);
    //           }
    //         }}
    //         className={`px-3 py-2 rounded-lg flex-row items-center ${
    //           selectedItem ? "bg-red-500" : "bg-gray-300"
    //         }`}
    //       >
    //         <FontAwesome name="edit" size={16} color="white" />
    //         <Text className="text-white ml-1">Cập nhật</Text>
    //       </TouchableOpacity>

    //       <TouchableOpacity
    //         disabled={!selectedItem}
    //         onPress={onDelete}
    //         className={`px-3 py-2 rounded-lg flex-row items-center ${
    //           selectedItem ? "bg-red-500" : "bg-gray-300"
    //         }`}
    //       >
    //         <FontAwesome name="trash" size={16} color="white" />
    //         <Text className="text-white ml-1">Xóa</Text>
    //       </TouchableOpacity>
    //     </View>

    //     <TouchableOpacity onPress={onAdd} className="bg-green-500 px-3 py-2 rounded-lg flex-row items-center">
    //       <FontAwesome name="plus" size={16} color="white" />
    //       <Text className="text-white ml-1">Thêm khoa</Text>
    //     </TouchableOpacity>
    //   </View>
    <EntityTool
      entityName="khoa"
      selectedItem={selectedItem}
      onAdd={onAdd}
      onEdit={onEdit}
      onDelete={onDelete}
      onReload={onReload}
    />
  )
}

export default DepartmentTool