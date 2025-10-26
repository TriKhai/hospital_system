import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";

interface ColumnConfig<T> {
  key: keyof T | string;
  label: string;
  width?: number;
  render?: (item: T) => React.ReactNode; // cho phép custom hiển thị
}

interface GenericTableProps<T extends { id: number | string }> {
  data: T[];
  columns: ColumnConfig<T>[];
  selectedItem: T | null;
  onSelected: (item: T) => void;
}

export default function GenericTable<T extends { id: number | string }>({
  data,
  columns,
  selectedItem,
  onSelected,
}: GenericTableProps<T>) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View>
        {/* Header */}
        <View className="flex-row bg-blue-100 py-2 px-2 rounded-t-lg border-b border-gray-300">
          {columns.map((col) => (
            <Text
              key={String(col.key)}
              style={{ width: col.width || 150 }}
              className="font-semibold text-gray-700"
            >
              {col.label}
            </Text>
          ))}
        </View>

        {/* Rows */}
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onSelected(item)}
              className={`flex-row py-2 px-2 border-b border-gray-200 ${
                selectedItem?.id === item.id
                  ? "bg-blue-50 border-blue-400"
                  : "bg-white"
              }`}
            >
              {columns.map((col) => (
                <View key={String(col.key)} style={{ width: col.width || 150 }}>
                  {col.render ? (
                    col.render(item)
                  ) : (
                    <Text className="text-gray-700">
                      {String((item as any)[col.key])}
                    </Text>
                  )}
                </View>
              ))}
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
}
