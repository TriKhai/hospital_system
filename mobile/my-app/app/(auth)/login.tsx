import { View, Text, TextInput, TouchableOpacity, Alert, Button } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import authService from "@/services/authApi";
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/authSlice";
import { LoginResponse } from "@/types/api/authType";
import { FontAwesome } from "@expo/vector-icons";


export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      console.log("Login with:", username, password);
      const res:LoginResponse = await authService.login({ username, password });

      if (res?.token) {
        // Lưu vào Redux
        dispatch(
          login(res)
        );

        Alert.alert("Thành công", `Xin chào ${res.username}`);

        // Chuyển hướng sau đăng nhập
        // Nếu dùng expo-router:
        router.replace("/(public)");
      } else {
        Alert.alert("Lỗi", "Đăng nhập thất bại, vui lòng thử lại.");
      }
    } catch (error) {
      console.log("Login failed:", error);
      Alert.alert("Lỗi", "Sai tài khoản hoặc mật khẩu");
    }
  };

  const handleGoHome = () => {
    router.push("/(public)"); // hoặc router.replace()
  };

  return (
    <View className="flex-1 bg-white justify-center px-8">
      <TouchableOpacity
        onPress={handleGoHome}
        className="absolute top-12 right-6 bg-gray-100 rounded-full p-3"
      >
        <FontAwesome name="close" size={22} color="#444" />
      </TouchableOpacity>


      <Text className="text-center text-2xl font-bold text-gray-900 mb-10">
        Đăng nhập
      </Text>

      <View className="w-full space-y-6">
        {/* Username */}
        <View className="mb-4">
          <Text className="text-gray-700 mb-2 font-semibold">
            Tên đăng nhập
          </Text>
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-3 text-base"
            placeholder="Nhập tên đăng nhập"
            placeholderTextColor="#aaa"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        {/* Password */}
        <View className="mb-4">
          <Text className="text-gray-700 mb-2 font-semibold">Mật khẩu</Text>
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-3 text-base"
            placeholder="Nhập mật khẩu"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Button */}
        <TouchableOpacity
          onPress={handleLogin}
          className="bg-violet-600 py-4 rounded-xl mt-2"
        >
          <Text className="text-white text-center font-semibold text-base">
            Đăng nhập
          </Text>
        </TouchableOpacity>

        {/* Register link */}
        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-600">Bạn chưa có tài khoản? </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
            <Text className="text-violet-600 font-semibold">Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <Button title="Về trang chủ" onPress={handleGoHome} /> */}
    </View>
  );
}
