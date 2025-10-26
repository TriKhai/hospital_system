import { SlotType } from "@/types/api/doctorType";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

interface Props {
  slots: SlotType[];
}

export default function AvailableSlots({ slots }: Props) {
  if (!slots || slots.length === 0) {
    return (
      <Text className="text-gray-500 italic mt-2">
        Ngày này không có lịch làm việc.
      </Text>
    );
  }

  return (
    <View className="mt-3">
      <Text className="text-gray-700 font-semibold mb-2">Lịch khám khả dụng</Text>
      <FlatList
        data={slots}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{ justifyContent: "flex-start", gap: 8 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            className={`border rounded-xl px-3 py-2 mb-2 ${
              item.status === "AVAILABLE"
                ? "border-green-500 bg-green-50"
                : "border-gray-300 bg-gray-100"
            }`}
            disabled={item.status !== "AVAILABLE"}
          >
            <Text
              className={`text-sm font-medium ${
                item.status === "AVAILABLE" ? "text-green-700" : "text-gray-400"
              }`}
            >
              {item.startTime} - {item.endTime}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
