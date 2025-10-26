import { Stack } from "expo-router";

export default function BlogLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Danh sách blog (index.tsx) */}
      <Stack.Screen name="index" />

      {/* Chi tiết blog ([id].tsx) */}
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false,
          // 👇 Ẩn tab bar khi mở chi tiết blog
          presentation: "card",
        }}
      />
    </Stack>
  );
}
