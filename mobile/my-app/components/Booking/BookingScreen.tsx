import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import DoctorFilterBar from "./DoctorFilterBar";
import { Text } from "react-native";
import DoctorCard from "./DoctorCard";
import { SafeAreaView } from "react-native-safe-area-context";
import doctorService from "@/services/doctorApi";
import { DoctorWorkResponse } from "@/types/api/doctorType";

export default function BookingScreen() {
  const [doctors, setDoctors] = useState<DoctorWorkResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDoctors = async () => {
    setLoading(true);
    const data = await doctorService.getDoctorWorks(); 
    setLoading(false);
    setDoctors(data)
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#f2f8ff]">
      <ScrollView className="p-4">
        {/* <DoctorFilterBar onFilter={() => {}} /> */}
        {loading ? (
          <Text className="text-center mt-10 text-gray-500">
            Đang tải danh sách bác sĩ...
          </Text>
        ) : (
          doctors.map((d) => (
            <DoctorCard
              key={d.id}
              doctor={d}
              onViewSchedule={(id, date) =>
                console.log("Xem lịch:", id, date)
              }
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
