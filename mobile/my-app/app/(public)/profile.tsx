import { View, Text, Alert, Button } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Redirect, router } from "expo-router";
import { logout } from '@/store/slices/authSlice';

const ProfileScreen = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  // Nếu chưa đăng nhập thì redirect về login
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }
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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Xin chào {user?.username}</Text>
      <Text>Vai trò: {user?.role}</Text>
      <Button title="Đăng xuất" color="red" onPress={handleLogout} />
    </View>
  );
}

export default ProfileScreen;