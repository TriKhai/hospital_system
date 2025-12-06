import { TabItem } from "@/types/ui/TabType";
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import { Alert } from "react-native";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { router } from "expo-router";

const tabs: TabItem[] = [
  { name: "index", title: "Thống kê", icon: "home" },
  { name: "account", title: "Tài khoản", icon: "person" },
  { name: "department", title: "Quản lý khoa", icon: "business" },
  { name: "medicines", title: "Thuốc", icon: "medkit" },
  { name: "blog", title: "Tin tức", icon: "newspaper" },
  { name: "appointments", title: "Lịch hẹn", icon: "calendar" },
  { name: "schedule", title: "Lịch làm việc", icon: "time" },
];

export default function AdminLayout() {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    Alert.alert("Xác nhận", "Bạn có chắc muốn đăng xuất không?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Đăng xuất",
        style: "destructive",
        onPress: () => {
          dispatch(logout());
          router.replace("/(public)");
        },
      },
    ]);
  };

  return (
    <Drawer
      drawerContent={(props) => (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />

          <DrawerItem
            label="Đăng xuất"
            icon={({ color, size }) => (
              <Ionicons name="log-out-outline" color={color} size={size} />
            )}
            onPress={handleLogout}
            labelStyle={{ color: "red", fontWeight: "600" }}
          />
        </DrawerContentScrollView>
      )}
      screenOptions={{
        headerStyle: { backgroundColor: "#0E8DA1" },
        headerTintColor: "#fff",
        drawerActiveTintColor: "#0E8DA1",
        drawerLabelStyle: { fontSize: 15 },
      }}
    >
      {/* ✅ Khai báo tab trong đây, không trong drawerContent */}
      {tabs.map((tab) => (
        <Drawer.Screen
          key={tab.name}
          name={tab.name}
          options={{
            drawerLabel: tab.title,
            title: tab.title,
            drawerIcon: ({ color, size }) => (
              <Ionicons
                name={`${tab.icon}-outline` as any}
                size={size}
                color={color}
              />
            ),
          }}
        />
      ))}
    </Drawer>
  );
}
