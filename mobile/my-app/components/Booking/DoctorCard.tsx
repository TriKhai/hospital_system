import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { DoctorWorkResponse, SlotType } from "@/types/api/doctorType";
import doctorService from "@/services/doctorApi";

interface DoctorCardProps {
  doctor: DoctorWorkResponse;
  onViewSchedule: (doctorId: number, date: Date) => void;
}

export default function DoctorCard({
  doctor,
  onViewSchedule,
}: DoctorCardProps) {
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [showPicker, setShowPicker] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    const loadImage = async () => {
      const url = await doctorService.loadImage(doctor.imageUrl);
      setImageSrc(url);
    };
    loadImage();
  }, [doctor.imageUrl]);

  const filteredSlots = doctor.slots.filter(
    (s) => dayjs(s.workDate).format("YYYY-MM-DD") === selectedDate
  );

  const morningSlots = filteredSlots.filter(
    (s) => parseInt(s.startTime.split(":")[0]) < 12
  );
  const afternoonSlots = filteredSlots.filter((s) => {
    const hour = parseInt(s.startTime.split(":")[0]);
    return hour >= 12 && hour < 18;
  });
  const eveningSlots = filteredSlots.filter(
    (s) => parseInt(s.startTime.split(":")[0]) >= 18
  );

  return (
    <ScrollView className="bg-white rounded-2xl p-4 border border-gray-50 mb-10">
      {/* Header bác sĩ */}
      <View className="flex-row items-center mb-4">
        <Image
          source={
            imageSrc
              ? { uri: imageSrc } // ảnh tải được từ API
              : require("../../assets/profile/default-doctor.png") // fallback
          }
          className="w-24 h-24 rounded-full mr-4"
        />
        <View className="flex-1">
          <Text className="text-lg font-bold">{doctor.name}</Text>
          <Text className="text-gray-500">{doctor.specialty?.name}</Text>
          <Text className="text-gray-600">
            {doctor.degree || "Chưa cập nhật"}
          </Text>
          <Text className="text-gray-600">
            {doctor.yearsOfExperience
              ? `${doctor.yearsOfExperience} năm kinh nghiệm`
              : "Chưa cập nhật"}
          </Text>
        </View>
      </View>

      {/* Thông tin thêm */}
      <View className="mb-4">
        <Text>{doctor.gender ? "Nam" : "Nữ"}</Text>
        <Text>
          {doctor.consultationFee
            ? `${doctor.consultationFee.toLocaleString()}₫`
            : "Miễn phí"}
        </Text>
        <Text>{doctor.phone}</Text>
        <Text>{doctor.email}</Text>
      </View>

      {/* Chọn ngày */}
      <View className="flex-row justify-between items-center mb-3">
        <View className="flex-1">
          <Text className="text-gray-700 mb-1 font-medium">Chọn ngày:</Text>

          <TouchableOpacity
            onPress={() => setShowPicker(true)}
            className="border border-gray-300 rounded-lg px-3 py-2 bg-white"
          >
            <Text>{dayjs(selectedDate).format("DD/MM/YYYY")}</Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={new Date(selectedDate)}
              mode="date"
              display="default" // hoặc "default" nếu bạn không muốn kiểu cuộn
              minimumDate={new Date()}
              onChange={(event, date) => {
                // Bắt buộc phải đóng picker sau khi chọn
                setShowPicker(false);
                if (date) setSelectedDate(dayjs(date).format("YYYY-MM-DD"));
              }}
            />
          )}
        </View>

        {/* <TouchableOpacity
          className="bg-emerald-500 px-4 py-2 rounded-lg ml-3"
          onPress={() => onViewSchedule(doctor.id, new Date(selectedDate))}
        >
          <Text className="text-white font-medium">Xem lịch</Text>
        </TouchableOpacity> */}
      </View>

      {/* Lịch khám khả dụng */}
      {filteredSlots.length > 0 ? (
        <View>
          {/* Buổi sáng */}
          {morningSlots.length > 0 && (
            <SlotSection title="Buổi sáng" slots={morningSlots} />
          )}
          {/* Buổi chiều */}
          {afternoonSlots.length > 0 && (
            <SlotSection title="Buổi chiều" slots={afternoonSlots} />
          )}
          {/* Buổi tối */}
          {eveningSlots.length > 0 && (
            <SlotSection title="Buổi tối" slots={eveningSlots} />
          )}
        </View>
      ) : (
        <Text className="text-gray-500 italic mt-2">
          Ngày {dayjs(selectedDate).locale("vi").format("DD/MM/YYYY")} không có
          lịch làm việc.
        </Text>
      )}
    </ScrollView>
  );
}

/** Component phụ hiển thị slot theo buổi **/
const SlotSection = ({
  title,
  slots,
}: {
  title: string;
  slots: SlotType[];
}) => (
  <View className="mb-3">
    <Text className="font-semibold mb-2">{title}</Text>
    <View className="flex-row flex-wrap gap-2">
      {slots.map((slot) => (
        <TouchableOpacity
          key={slot.id}
          disabled={slot.status !== "AVAILABLE"}
          className={`px-3 py-2 border rounded-lg ${
            slot.status === "AVAILABLE"
              ? "border-emerald-400 bg-emerald-50"
              : "border-gray-300 bg-gray-100"
          }`}
        >
          <Text
            className={`text-sm ${
              slot.status === "AVAILABLE" ? "text-emerald-700" : "text-gray-400"
            }`}
          >
            {slot.startTime} - {slot.endTime}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);
