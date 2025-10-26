import { useAppSelector } from "@/store/hooks";
import { DepartmentResponse } from "@/types/api/departmentType";
import { FlatList, Text, TouchableOpacity } from "react-native";
import { ScrollView, View } from "react-native";
import GenericTable from "../ui/GenericTable";

interface Props {
  onSelected: (item: DepartmentResponse) => void;
  selectedItem: DepartmentResponse | null;
}

export default function DepartmentTable({ onSelected, selectedItem }: Props) {
  const { data: departments, loading } = useAppSelector(
    (state) => state.department
  );

  // console.log(departments)

  return (
    // <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    //   <View>
    //     <View className="flex-row bg-blue-100 py-2 px-2 rounded-t-lg border-b border-gray-300">
    //       <Text className="w-40 font-semibold text-gray-700">Tên khoa</Text>
    //       <Text className="w-72 font-semibold text-gray-700">Mô tả</Text>
    //       <Text className="w-28 font-semibold text-gray-700">Ngày tạo</Text>
    //     </View>

    //     <FlatList
    //       data={departments}
    //       keyExtractor={(item) => item.id.toString()}
    //       renderItem={({ item }) => (
    //         <TouchableOpacity
    //           onPress={() => onSelected(item)}
    //           className={`flex-row py-2 px-2 border-b border-gray-200 ${
    //             selectedItem?.id === item.id
    //               ? "bg-blue-50 border-blue-400"
    //               : "bg-white"
    //           }`}
    //         >
    //           <Text className="w-40 text-gray-800">{item.name}</Text>
    //           <Text className="w-72 text-gray-600">{item.description}</Text>
    //           <Text className="w-28 text-gray-600">{item.createdAt}</Text>
    //         </TouchableOpacity>
    //       )}
    //     />
    //   </View>
    // </ScrollView>
    <GenericTable
      data={departments}
      selectedItem={selectedItem}
      onSelected={onSelected}
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
    />
  );
}
