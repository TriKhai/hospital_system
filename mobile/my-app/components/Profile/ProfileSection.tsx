import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import EditProfile from "./EditProfile";
import { PatientResponse } from "@/types/api/patientType";

interface Props {
  title: string;
  onEdit?: () => void;
  data: { label: string; value: string }[];
  onOpenEdit: () => void
}

export default function ProfileSection({ title, onEdit, data, onOpenEdit }: Props) {

  return (
    <View className="bg-white mx-4 my-4 rounded-2xl border border-gray-200 p-5">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-lg font-bold text-gray-800">{title}</Text>
        {onEdit && (
          <TouchableOpacity
            className="flex-row bg-light-300 px-3 py-1.5 rounded-lg items-center"
            onPress={onOpenEdit}
          >
            <MaterialIcons name="edit" size={18} color="#fff" />
            <Text className="text-white ml-1 font-semibold">Chỉnh sửa</Text>
          </TouchableOpacity>
        )}
      </View>

      {data.map((item, i) => (
        <View
          key={i}
          className="flex-row justify-between border-b border-gray-100 py-2"
        >
          <Text className="text-gray-500">{item.label}</Text>
          <Text className="text-gray-800 font-medium">{item.value}</Text>
        </View>
      ))}

      
    </View>
  );
}
