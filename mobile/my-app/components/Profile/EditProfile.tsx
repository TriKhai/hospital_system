import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
import React, { useState } from "react";
import { Modal } from "react-native";
import { PatientResponse, PatientUpdateRequest } from "@/types/api/patientType";
import { FontAwesome } from "@expo/vector-icons";

interface Props {
  isOpen: boolean;
  onEdit: (data: PatientUpdateRequest) => void;
  onCancel: () => void;
  patient: PatientResponse;
}

export default function EditProfile({
  isOpen,
  onCancel,
  onEdit,
  patient,
}: Props) {
  const [formData, setFormData] = useState<PatientUpdateRequest>(patient);

  const handleChange = (name: keyof PatientUpdateRequest, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onEdit(formData);
    // onEdit();
  };

  return (
    <Modal visible={isOpen} animationType="fade" transparent={true}>
      <View className="flex-1 bg-black/50 items-center justify-center">
        <View className="bg-white rounded-2xl p-5 w-[90%] max-h-[85%]">
          {/* Nút đóng */}
          {/* <TouchableOpacity
            onPress={onCancel}
            className="absolute top-3 right-3"
          >
            <FontAwesome name="times" size={20} color="#555" />
          </TouchableOpacity> */}

          <Text className="text-lg font-semibold text-center mb-4">
            Chỉnh sửa thông tin bệnh nhân
          </Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            className="space-y-3"
          >
            {/* Họ tên */}
            <View>
              <Text className="text-sm text-gray-700 font-medium mb-1">
                Họ tên
              </Text>
              <TextInput
                value={formData.name}
                onChangeText={(v) => handleChange("name", v)}
                placeholder="Nhập họ tên..."
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </View>

            {/* Ngày sinh */}
            <View>
              <Text className="text-sm text-gray-700 font-medium mb-1">
                Ngày sinh
              </Text>
              <TextInput
                value={formData.birthDate}
                onChangeText={(v) => handleChange("birthDate", v)}
                placeholder="YYYY-MM-DD"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </View>

            {/* Giới tính */}
            <View>
              <Text className="text-sm text-gray-700 font-medium mb-1">
                Giới tính
              </Text>
              <View className="flex-row gap-2">
                <TouchableOpacity
                  className={`flex-1 border rounded-md py-2 items-center ${
                    formData.gender
                      ? "border-blue-600 bg-blue-100"
                      : "border-gray-300"
                  }`}
                  onPress={() => handleChange("gender", true)}
                >
                  <Text
                    className={`text-sm ${
                      formData.gender ? "text-blue-600 font-semibold" : "text-gray-700"
                    }`}
                  >
                    Nam
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className={`flex-1 border rounded-md py-2 items-center ${
                    !formData.gender
                      ? "border-blue-600 bg-blue-100"
                      : "border-gray-300"
                  }`}
                  onPress={() => handleChange("gender", false)}
                >
                  <Text
                    className={`text-sm ${
                      !formData.gender ? "text-blue-600 font-semibold" : "text-gray-700"
                    }`}
                  >
                    Nữ
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Địa chỉ */}
            <View>
              <Text className="text-sm text-gray-700 font-medium mb-1">
                Địa chỉ
              </Text>
              <TextInput
                value={formData.address}
                onChangeText={(v) => handleChange("address", v)}
                placeholder="Nhập địa chỉ..."
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </View>

            {/* Email */}
            <View>
              <Text className="text-sm text-gray-700 font-medium mb-1">
                Email
              </Text>
              <TextInput
                value={formData.email}
                onChangeText={(v) => handleChange("email", v)}
                placeholder="Nhập email..."
                keyboardType="email-address"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </View>

            {/* Số điện thoại */}
            <View>
              <Text className="text-sm text-gray-700 font-medium mb-1">
                Số điện thoại
              </Text>
              <TextInput
                value={formData.phone}
                onChangeText={(v) => handleChange("phone", v)}
                placeholder="Nhập số điện thoại..."
                keyboardType="phone-pad"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </View>

            {/* Hàng nút */}
            <View className="flex-row justify-end gap-2 mt-4">
              <TouchableOpacity
                onPress={onCancel}
                className="px-4 py-2 rounded-md border border-gray-300 bg-gray-100"
              >
                <Text className="text-gray-700 text-sm font-medium">Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSubmit}
                className="px-4 py-2 rounded-md bg-blue-600"
              >
                <Text className="text-white text-sm font-semibold">
                  Lưu thay đổi
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}