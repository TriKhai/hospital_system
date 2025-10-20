import { View, Text } from 'react-native'
import React from 'react'
import { TabItem } from '@/types/ui/TabType';
import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

const tabs: TabItem[] = [
  { name: "index", title: "Trang chủ", icon: "home" },
  { name: "about", title: "Dịch vụ", icon: "search" },
  { name: "blog", title: "Tin tức", icon: "bookmark" },
  { name: "booking", title: "Đặt lịch", icon: "search" },
  { name: "profile", title: "Profile", icon: "user" },
];

const PublicLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#007AFF", // màu khi chọn tab
        tabBarInactiveTintColor: "#999",   // màu tab chưa chọn
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name={tab.icon} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  )
}

export default PublicLayout;