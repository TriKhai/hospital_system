import React, { useRef, useState } from "react";
import {
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import {
  RichEditor,
  RichToolbar,
  actions,
} from "react-native-pell-rich-editor";
import * as ImagePicker from "expo-image-picker";

export default function AddBlogScreen() {
  const richText = useRef<RichEditor>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = () => {
    Alert.alert(
      "Xem thử bài viết",
      `Title: ${title}\nContent length: ${content.length}`
    );
    console.log("HTML content:", content);
    // axios.post("/api/blogs", { title, content, ... })
  };

  const handleAddImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"], 
      quality: 0.8,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      // ⚠️ Nếu backend yêu cầu upload file thật:
      // Gửi ảnh lên server để lấy URL rồi chèn URL vào editor
      richText.current?.insertImage(uri);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: 16,
        backgroundColor: "#f9f9f9",
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 10 }}>
        🩺 Thêm bài viết mới
      </Text>

      <TextInput
        placeholder="Nhập tiêu đề bài viết..."
        value={title}
        onChangeText={setTitle}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          backgroundColor: "#fff",
          padding: 10,
          marginBottom: 12,
        }}
      />

      <RichEditor
        ref={richText}
        placeholder="Nhập nội dung bài viết..."
        onChange={setContent}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          backgroundColor: "#fff",
          minHeight: 250,
          marginBottom: 10,
        }}
      />

      <RichToolbar
        editor={richText}
        actions={[
          actions.insertImage,
          actions.setBold,
          actions.setItalic,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.insertLink,
        ]}
        iconTint="#333"
        style={{
          backgroundColor: "#eee",
          borderRadius: 8,
          marginBottom: 16,
        }}
        onPressAddImage={handleAddImage}
      />

      <TouchableOpacity
        onPress={handleSave}
        style={{
          backgroundColor: "#007bff",
          padding: 14,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>
          Đăng bài
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
