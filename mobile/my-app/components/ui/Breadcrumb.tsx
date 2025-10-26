import React from "react";
import { View, Text } from "react-native";

interface BreadcrumbProps {
  paths: string[];
  current: string;
}

export default function Breadcrumb({ paths, current }: BreadcrumbProps) {
  return (
    <View className="flex-row items-center mb-4 space-x-2">
      {paths.map((p, index) => (
        <Text key={index} className="text-gray-500">
          / {p}{" "}
        </Text>
      ))}
      <Text className="text-gray-900 font-semibold"> {" > "} {current}</Text>
    </View>
  );
}
