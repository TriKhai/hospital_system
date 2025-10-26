import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAppointments } from "@/store/slices/appointmentSlice";
import Breadcrumb from "@/components/ui/Breadcrumb";
import TabsSwitcher from "@/components/ui/TabsSwitcher";
import AppointmentTable from "@/components/Appointment/AppointmentTable";

export default function AppointmentScreen() {
  const tabs = [
    { key: "ALL", label: "Tất cả" },
    { key: "PENDING", label: "Chờ duyệt" },
    { key: "PENDING_VERIFICATION", label: "Chờ xác nhận" },
    { key: "CONFIRMED", label: "Đã xác nhận" },
    { key: "REJECTED", label: "Đã từ chối" },
  ];

  const [tab, setTab] = useState<"ALL" | "PENDING" | "PENDING_VERIFICATION" | "CONFIRMED" | "REJECTED">("ALL");

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.appointment);

  useEffect(() => {
    dispatch(fetchAppointments(tab));
  }, [dispatch, tab]);

  return (
    <View className="flex-1 bg-gray-50 p-2">
      <Breadcrumb paths={["Quản lý lịch hẹn"]} current={tabs.find(t => t.key === tab)?.label || ""} />

      <TabsSwitcher
        tabs={tabs.map(t => ({ key: t.key, label: t.label }))}
        activeKey={tab}
        onChange={(key) => setTab(key as any)}
      />

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      ) : (
        <AppointmentTable />
      )}
    </View>
  );
}