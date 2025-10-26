import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
// import { blogs } from "@/data/blogs";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { fetchBlogs } from "@/store/slices/blogSlice";

export default function BlogList() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: blogs, loading } = useAppSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  if (loading)
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#2563EB" />
        <Text className="mt-3 text-gray-600">Đang tải bài viết...</Text>
      </View>
    );

  return (
    <FlatList
      data={blogs}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ paddingVertical: 12, backgroundColor: "#fff" }}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => router.push(`/blog/${item.id}`)}
          className="flex-row mb-5 mx-4 bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm"
          activeOpacity={0.7}
        >
          {/* Ảnh bên trái */}
          <Image
            source={{ uri: item.thumbnail }}
            className="w-28 h-28 rounded-l-xl"
            resizeMode="cover"
          />

          {/* Nội dung bên phải */}
          <View className="flex-1 p-3">
            <Text
              className="text-base font-semibold text-blue-700 mb-1"
              numberOfLines={2}
            >
              {item.title}
            </Text>

            <Text className="text-xs text-gray-500 mb-2" numberOfLines={1}>
              Ngày đăng:{" "}
              {new Date(item.publishedAt).toLocaleDateString("vi-VN")}
            </Text>

            <Text className="text-xs text-gray-500">
              Danh mục:{" "}
              <Text className="text-gray-700">{item.category.name}</Text>
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
