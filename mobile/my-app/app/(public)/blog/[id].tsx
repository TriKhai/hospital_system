import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Blog } from "@/types/api/blogType";
import blogService from "@/services/blogApi";

export default function BlogDetail() {
  const { width } = useWindowDimensions();
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const data = await blogService.getBlogById(Number(id));
        setBlog(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading)
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-500">Đang tải bài viết...</Text>
      </SafeAreaView>
    );

  if (!blog)
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-base text-gray-500">Bài viết không tìm thấy</Text>
      </SafeAreaView>
    );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b border-gray-200 bg-white">
        <TouchableOpacity onPress={() => router.back()} className="pr-2">
          <Ionicons name="chevron-back" size={24} color="#0ea5e9" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-800">Bài viết</Text>
      </View>

      {/* Nội dung */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: blog.thumbnail }}
          className="w-full"
          style={{ width: width, height: width * 0.6 }}
          resizeMode="cover"
        />

        <View className="px-4 py-4 pb-20">
          <Text className="text-[22px] font-bold text-gray-900 leading-7 mb-2">
            {blog.title}
          </Text>
          <Text className="text-sm text-gray-500 mb-4">
            BS. {blog.author.fullName} -{" "}
            {new Date(blog.publishedAt).toLocaleDateString("vi-VN")}
          </Text>

          <RenderHtml
            contentWidth={width - 32}
            source={{ html: blog.content }}
            tagsStyles={{
              p: { marginBottom: 14, lineHeight: 24, color: "#222" },
              h3: { fontSize: 18, fontWeight: "600", marginVertical: 8 },
              img: { marginVertical: 10, borderRadius: 10 },
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
