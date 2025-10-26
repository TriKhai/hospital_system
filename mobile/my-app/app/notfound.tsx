import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function NotFound() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-gray-50 justify-center items-center px-6">
      {/* Số 404 */}
      <Text className="text-6xl font-bold text-cyan-600 mb-2">404</Text>

      {/* Tiêu đề */}
      <Text className="text-xl font-semibold text-gray-800 mb-2">
        Trang Không Tìm Thấy
      </Text>

      {/* Mô tả */}
      <Text className="text-center text-gray-500 mb-6">
        Đường dẫn bạn truy cập không tồn tại trong hệ thống bệnh viện.
      </Text>

      {/* Nút quay lại */}
      <TouchableOpacity
        onPress={() => router.replace("/(public)")}
        className="bg-cyan-500 px-5 py-2.5 rounded-md"
      >
        <Text className="text-white font-medium">Quay lại Trang Chủ</Text>
      </TouchableOpacity>
    </View>
  );
}
