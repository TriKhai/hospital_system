import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useAppSelector } from "@/store/hooks";
import { navigateBackByRole } from "@/utils/navigationHelper";

export default function Unauthorized() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <View className="flex-1 bg-gray-50 justify-center items-center px-6">
      <Text className="text-6xl font-bold text-cyan-600 mb-2">403</Text>

      <Text className="text-xl font-semibold text-gray-800 mb-2">
        Truy Cập Bị Từ Chối
      </Text>

      <Text className="text-center text-gray-500 mb-6">
        Bạn không có quyền truy cập vào trang này. Vui lòng quay lại trang chính
        hoặc đăng nhập bằng tài khoản khác.
      </Text>

      <TouchableOpacity
        onPress={() => navigateBackByRole(user?.role)}
        className="bg-cyan-500 px-5 py-2.5 rounded-md"
      >
        <Text className="text-white font-medium">Quay lại ứng dụng</Text>
      </TouchableOpacity>
    </View>
  );
}
