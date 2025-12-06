import axios from "axios";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Modal,
  Pressable,
  useWindowDimensions,
} from "react-native";
import {
  RichEditor,
  RichToolbar,
  actions,
} from "react-native-pell-rich-editor";
import * as ImagePicker from "expo-image-picker";
import RenderHTML from "react-native-render-html";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddBlogScreen() {
  const richText = useRef<RichEditor>(null);
  const { width } = useWindowDimensions();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [contentHTML, setContentHTML] = useState("");
  const [relatedLink, setRelatedLink] = useState("");
  const [categoryId, setCategoryId] = useState(1); // ví dụ: chọn chuyên mục mặc định
  const [tagIds, setTagIds] = useState<number[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);

  const pickThumbnail = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
    });
    if (!result.canceled) {
      const asset = result.assets[0];
      setThumbnail(`data:image/jpeg;base64,${asset.base64}`);
    }
  };

  const insertImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ["images"],
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      richText.current?.insertImage(uri);
    }
  };

  // --- Xem trước ---
  const handlePreview = () => {
  if (!contentHTML || !title.trim()) {
    Alert.alert("Thiếu thông tin", "Vui lòng nhập tiêu đề và nội dung!");
    return;
  }
  setPreviewVisible(true);
};

const handleSubmit = async () => {
  const payload = {
    title,
    description,
    thumbnail,
    categoryId,
    authorId: 1,
    content: contentHTML, 
    relatedLink,
    tagIds,
  };

  try {
    // const res = await axios.post("http://<server>/api/blogs", payload);
    console.log(payload)
    Alert.alert("Thành công", "Bài viết đã đăng!");
  } catch (e) {
    console.error(e);
    Alert.alert("Lỗi", "Không thể đăng bài!");
  }
};

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 15 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <RichToolbar
          editor={richText}
          actions={[
            actions.setBold,
            actions.setItalic,
            actions.insertImage,
            actions.insertLink,
            actions.setUnderline,
            actions.undo,
            actions.redo,
          ]}
          onPressAddImage={insertImage}
        />

        {/* --- Form các trường --- */}
        <Text className="text-lg font-bold mb-2">Tiêu đề bài viết</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Nhập tiêu đề..."
          className="border border-gray-300 rounded-lg p-3 mb-4"
        />

        <Text className="text-lg font-bold mb-2">Mô tả ngắn</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Nhập mô tả..."
          className="border border-gray-300 rounded-lg p-3 mb-4"
        />

        <Text className="text-lg font-bold mb-2">Ảnh thumbnail</Text>
        <TouchableOpacity
          onPress={pickThumbnail}
          className="border border-dashed border-gray-400 rounded-lg h-48 justify-center items-center mb-4"
        >
          {thumbnail ? (
            <Image
              source={{ uri: thumbnail }}
              style={{ width: "100%", height: "100%", borderRadius: 8 }}
              resizeMode="cover"
            />
          ) : (
            <Text className="text-gray-500">+ Chọn ảnh</Text>
          )}
        </TouchableOpacity>

        {/* <Text className="text-lg font-bold mb-2">Link liên quan</Text>
        <TextInput
          value={relatedLink}
          onChangeText={setRelatedLink}
          placeholder="Nhập link liên quan (nếu có)..."
          className="border border-gray-300 rounded-lg p-3 mb-4"
        /> */}

        <Text className="text-lg font-bold mb-2">Nội dung bài viết</Text>
        <RichEditor
          ref={richText}
          onChange={(html) => setContentHTML(html)} 
          placeholder="Nhập nội dung blog tại đây..."
          editorStyle={{
            backgroundColor: "#fff",
            color: "#000",
            placeholderColor: "#999",
          }}
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 10,
            minHeight: 200,
            marginBottom: 10,
          }}
        />

        <TouchableOpacity
          onPress={handlePreview}
          className="bg-blue-500 rounded-xl py-3 mt-6"
        >
          <Text className="text-center text-white font-semibold text-lg">
            Xem trước & Đăng
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* --- Modal xem trước --- */}
      <Modal visible={previewVisible} animationType="slide">
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          <View className="mt-10 flex-row justify-between items-center p-4 border-b border-gray-200">
            <Pressable onPress={() => setPreviewVisible(false)}>
              <Text className="text-blue-500 text-lg">Đóng</Text>
            </Pressable>
            <Pressable onPress={handleSubmit}>
              <Text className="text-blue-500 font-semibold text-lg">Đăng</Text>
            </Pressable>
          </View>

          <ScrollView style={{ padding: 16 }}>
            {thumbnail && (
              <Image
                source={{ uri: thumbnail }}
                style={{
                  width: "100%",
                  height: 200,
                  borderRadius: 10,
                  marginBottom: 12,
                }}
              />
            )}

            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                marginBottom: 12,
                color: "#000",
              }}
            >
              {title}
            </Text>

            <RenderHTML
              contentWidth={width - 32}
              source={{ html: contentHTML }}
              tagsStyles={{
                body: { fontSize: 18, lineHeight: 28, color: "#222" },
                p: { marginBottom: 14 },
                h3: { fontSize: 20, fontWeight: "600", marginVertical: 8 },
                img: { borderRadius: 10, marginVertical: 10 },
              }}
            />
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </View>
  );
}
