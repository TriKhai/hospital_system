import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import GenericTable from "../ui/GenericTable";
import {
  AppointmentResponse,
  AppointmentStatus,
} from "@/types/api/appointmentType";
import dayjs from "dayjs";
import { updateAppointmentStatus } from "@/store/slices/appointmentSlice";

export default function AppointmentTable() {
  const { data } = useAppSelector((state) => state.appointment);
  const [selected, setSelected] = useState<AppointmentResponse | null>(null);

  const dispatch = useAppDispatch();

const handleApprove = (id: number) => {
  dispatch(updateAppointmentStatus({ id, status: "PENDING_VERIFICATION" }));
};

const handleReject = (id: number) => {
  dispatch(updateAppointmentStatus({ id, status: "REJECTED" }));
};

const handleConfirm = (id: number) => {
  dispatch(updateAppointmentStatus({ id, status: "CONFIRMED" }));
};

  const getStatusLabel = (status: AppointmentStatus) => {
    switch (status) {
      case "PENDING":
        return "Chờ duyệt";
      case "PENDING_VERIFICATION":
        return "Chờ xác nhận";
      case "CONFIRMED":
        return "Đã xác nhận";
      case "CANCELLED_BY_PATIENT":
        return "BN hủy";
      case "CANCELLED_BY_DOCTOR":
        return "BS hủy";
      case "REJECTED":
        return "Từ chối";
      default:
        return status;
    }
  };

  const columns = [
    {
      key: "patient",
      label: "Bệnh nhân",
      width: 150,
      render: (item: AppointmentResponse) => (
        <Text className="text-gray-800">{item.patient?.name || "-"}</Text>
      ),
    },
    {
      key: "phone",
      label: "Điện thoại",
      width: 130,
      render: (item: AppointmentResponse) => (
        <Text className="text-gray-800">{item.patient?.phone || "-"}</Text>
      ),
    },
    {
      key: "doctor",
      label: "Bác sĩ",
      width: 150,
      render: (item: AppointmentResponse) => (
        <Text className="text-gray-800">{item.doctor?.name || "-"}</Text>
      ),
    },
    {
      key: "slot",
      label: "Thời gian",
      width: 180,
      render: (item: AppointmentResponse) => (
        <Text className="text-gray-800">
          {item.slot ? `${item.slot.startTime} - ${item.slot.endTime}` : "-"}
        </Text>
      ),
    },
    {
      key: "note",
      label: "Ghi chú",
      width: 250,
      render: (item: AppointmentResponse) => (
        <Text className="text-gray-700" numberOfLines={3}>
          {item.note || "-"}
        </Text>
      ),
    },
    {
      key: "status",
      label: "Trạng thái",
      width: 160,
      render: (item: AppointmentResponse) => (
        <Text className="font-medium text-gray-800">
          {getStatusLabel(item.status as AppointmentStatus)}
        </Text>
      ),
    },
    {
      key: "createdAt",
      label: "Ngày tạo",
      width: 120,
      render: (item: AppointmentResponse) => (
        <Text>{dayjs(item.createdAt).format("DD/MM/YYYY")}</Text>
      ),
    },
    {
      key: "updatedAt",
      label: "Ngày cập nhật",
      width: 130,
      render: (item: AppointmentResponse) => (
        <Text>{dayjs(item.updatedAt).format("DD/MM/YYYY")}</Text>
      ),
    },
    {
      key: "actions",
      label: "Hành động",
      width: 200,
      render: (item: AppointmentResponse) => (
        <View className="flex-row gap-2">
          {item.status === "PENDING" && (
            <>
              <TouchableOpacity
                onPress={() => handleApprove(item.id)}
                className="bg-blue-300 px-2 py-1 rounded"
              >
                <Text className="text-white text-lg">Duyệt</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleReject(item.id)}
                className="bg-red-300 px-2 py-1 rounded"
              >
                <Text className="text-white text-lg">Từ chối</Text>
              </TouchableOpacity>
            </>
          )}

          {item.status === "PENDING_VERIFICATION" && (
            <TouchableOpacity
              onPress={() => handleConfirm(item.id)}
              className="bg-green-300 px-2 py-1 rounded"
            >
              <Text className="text-white text-lg">Xác nhận</Text>
            </TouchableOpacity>
          )}
        </View>
      ),
    },
  ];

  return (
    <View className="flex-1">
      <GenericTable
        data={data}
        selectedItem={selected}
        onSelected={setSelected}
        columns={columns}
      />
    </View>
  );
}
