import React from "react";
import { View, TouchableOpacity, Text, ScrollView } from "react-native";

interface Tab {
  key: string;
  label: string;
  count?: number;
}

interface TabsSwitcherProps {
  tabs: Tab[];
  activeKey: string;
  onChange: (key: string) => void;
}

export default function TabsSwitcher({
  tabs,
  activeKey,
  onChange,
}: TabsSwitcherProps) {
  return (
    <View className="flex-row border-b border-gray-200 mb-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            onPress={() => onChange(tab.key)}
            className={`mr-6 pb-2 ${
              activeKey === tab.key ? "border-b-2 border-blue-600" : ""
            }`}
          >
            <Text
              className={`${
                activeKey === tab.key
                  ? "text-blue-600 font-semibold"
                  : "text-gray-500"
              }`}
            >
              {tab.label}{" "}
              {tab.count !== undefined && (
                <Text className="text-gray-400">{"("}{tab.count}{")"}</Text>
              )}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
