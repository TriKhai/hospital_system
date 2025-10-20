import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useState } from "react";

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f3f4f6",
      }}
    >
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 30 }}>Đăng ký</Text>

      <TextInput
        placeholder="Tên đăng nhập"
        value={username}
        onChangeText={setUsername}
        style={{
          width: "100%",
          backgroundColor: "white",
          padding: 12,
          borderRadius: 8,
          marginBottom: 12,
        }}
      />

      <TextInput
        placeholder="Mật khẩu"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          width: "100%",
          backgroundColor: "white",
          padding: 12,
          borderRadius: 8,
          marginBottom: 12,
        }}
      />

      <TextInput
        placeholder="Xác nhận mật khẩu"
        secureTextEntry
        value={confirm}
        onChangeText={setConfirm}
        style={{
          width: "100%",
          backgroundColor: "white",
          padding: 12,
          borderRadius: 8,
          marginBottom: 20,
        }}
      />

      <TouchableOpacity
        onPress={() => router.replace("/(public)")}
        style={{
          backgroundColor: "#2563eb",
          paddingVertical: 12,
          paddingHorizontal: 60,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", fontWeight: "600", fontSize: 16 }}>Tạo tài khoản</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
        <Text style={{ marginTop: 16, color: "#2563eb" }}>Đã có tài khoản? Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
}
