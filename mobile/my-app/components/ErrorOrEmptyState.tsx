import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface Props {
  message?: string; // nội dung lỗi hoặc thông báo
  onRetry?: () => void; // callback khi nhấn "Thử lại"
  showRetry?: boolean; // có nút retry hay không
}

const ErrorOrEmptyState = ({
  message = "Không có dữ liệu để hiển thị.",
  onRetry,
  showRetry = false,
}: Props) => {
  return (
    <View className="flex-1 justify-center items-center p-6 bg-gray-50">
      <Text className="text-gray-700 text-center text-base mb-4">{message}</Text>

      {showRetry && onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          className="bg-red-500 px-5 py-2 rounded-lg"
        >
          <Text className="text-white font-semibold">Thử lại</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ErrorOrEmptyState;
