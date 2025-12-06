import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { logout } from "@/store/slices/authSlice";
import { router } from "expo-router";

const AboutScreen = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    Alert.alert("Xác nhận", "Bạn có chắc muốn đăng xuất không?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Đăng xuất",
        style: "destructive",
        onPress: () => {
          dispatch(logout()); // Gọi Redux action logout
          router.replace("/(public)"); // Chuyển hướng về trang login
        },
      },
    ]);
  };
  
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <TouchableOpacity
        onPress={handleLogout}
        className="bg-red-500 rounded-xl py-3 px-6"
      >
        <Text className="text-white font-semibold text-lg">Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AboutScreen;