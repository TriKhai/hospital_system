import React, { useState } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Calendar } from "react-native-big-calendar";

type MyEvent = {
  title: string;
  start: Date;
  end: Date;
  color?: string;
};

export default function DoctorScheduleScreen() {
  const [mode, setMode] = useState<"month" | "week" | "day">("month");
  const [selectedDate, setSelectedDate] = useState(new Date());

  // ⚠️ Phải là new Date(), không phải string
  const events: MyEvent[] = [
    {
      title: "Khám bệnh - Khoa Tim mạch",
      start: new Date(2025, 9, 26, 8, 0), // tháng 9 là tháng 10 (0-index)
      end: new Date(2025, 9, 26, 9, 0),
      color: "#3b82f6",
    },
    {
      title: "Họp chuyên môn",
      start: new Date(2025, 9, 27, 14, 0),
      end: new Date(2025, 9, 27, 15, 30),
      color: "#22c55e",
    },
  ];

  const handlePressEvent = (event: MyEvent) => {
    console.log("Chọn sự kiện:", event.title);
  };

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-xl font-semibold mb-3">
        Quản lý lịch làm việc bác sĩ
      </Text>

      <View className="flex-row mb-3">
        {["month", "week", "day"].map((m) => (
          <TouchableOpacity
            key={m}
            onPress={() => setMode(m as "month" | "week" | "day")}
            className={`px-4 py-2 mr-2 rounded-xl ${
              mode === m ? "bg-blue-500" : "bg-gray-200"
            }`}
          >
            <Text
              className={`${
                mode === m ? "text-white font-semibold" : "text-gray-700"
              }`}
            >
              {m === "month" ? "Tháng" : m === "week" ? "Tuần" : "Ngày"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Calendar
        events={events}
        height={Dimensions.get("window").height - 200}
        mode={mode}
        date={selectedDate}
        swipeEnabled
        onPressEvent={handlePressEvent}
        eventCellStyle={(event) => ({
          backgroundColor: event.color || "#3b82f6",
          borderRadius: 6,
        })}
        headerContainerStyle={{
          backgroundColor: "#f9fafb",
        }}
        locale="vi"
        weekStartsOn={1}
      />
    </View>
  );
}
