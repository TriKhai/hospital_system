import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { DynamicModalFormProps, FieldConfig } from "@/types/ui/modalType";

export function DynamicModalForm<T extends Record<string, any>>({
  visible,
  title,
  fields,
  data,
  onClose,
  onSubmit,
}: DynamicModalFormProps<T>) {
  const [formValues, setFormValues] = useState<T>(data || ({} as T));
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setFormValues(data || ({} as T));
  }, [data]);

  const handleChange = (key: keyof T, value: any) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };


  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/30 justify-center items-center">
        <View className="bg-white rounded-2xl p-4 w-11/12">
          <Text className="text-lg font-semibold mb-3 text-gray-800">
            {title}
          </Text>

          {fields.map((field) => {
            const value = formValues[field.key];

            if (field.type === "textarea") {
              return (
                <TextInput
                  key={String(field.key)}
                  value={String(value ?? "")}
                  onChangeText={(text) => handleChange(field.key, text)}
                  placeholder={field.placeholder}
                  multiline
                  className="border border-gray-300 rounded-lg px-3 py-2 mb-3"
                />
              );
            }

            if (field.type === "date") {
              return (
                <TouchableOpacity
                  key={String(field.key)}
                  onPress={() => handleChange(field.key, new Date())}
                  className="border border-gray-300 rounded-lg px-3 py-2 mb-3"
                >
                  <Text>
                    {value ? new Date(value).toLocaleDateString() : "Chọn ngày"}
                  </Text>
                </TouchableOpacity>
              );
            }

            if (field.type === "number") {
              return (
                <TextInput
                  key={String(field.key)}
                  value={value?.toString() ?? ""}
                  onChangeText={(text) => handleChange(field.key, Number(text))}
                  keyboardType="numeric"
                  placeholder={field.placeholder}
                  className="border border-gray-300 rounded-lg px-3 py-2 mb-3"
                />
              );
            }

            if (field.type === "select") {
              

              return (
                <View key={String(field.key)} className="mb-3 relative z-50">
                  {/* Label */}
                  <Text className="mb-1 text-gray-700 font-semibold">
                    {field.label}
                  </Text>

                  {/* Dropdown header */}
                  <TouchableOpacity
                    onPress={() => setIsOpen(!isOpen)}
                    className="border border-gray-300 rounded-lg px-3 py-2 bg-white flex-row justify-between items-center"
                  >
                    <Text className={value ? "text-gray-900" : "text-gray-400"}>
                      {value
                        ? field.options?.find((opt) => opt.value === value)
                            ?.label
                        : "Chọn khoa trực thuộc"}
                    </Text>
                    <Text className="text-gray-500">{isOpen ? "▲" : "▼"}</Text>
                  </TouchableOpacity>

                  {/* Dropdown list */}
                  {isOpen && (
                    <View className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-50">
                      <ScrollView style={{ maxHeight: 200 }}>
                        {field.options?.map((opt) => (
                          <TouchableOpacity
                            key={opt.value}
                            onPress={() => {
                              handleChange(field.key, opt.value);
                              setIsOpen(false);
                            }}
                            className={`px-3 py-2 ${
                              value === opt.value ? "bg-blue-100" : ""
                            }`}
                          >
                            <Text
                              className={
                                value === opt.value
                                  ? "text-blue-600 font-semibold"
                                  : "text-gray-800"
                              }
                            >
                              {opt.label}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  )}
                </View>
              );
            }

            if (field.type === "file") {
              return (
                <TouchableOpacity
                  key={String(field.key)}
                  className="border border-gray-300 rounded-lg px-3 py-2 mb-3"
                  onPress={() => console.log("Chọn file")}
                >
                  <Text>{value ? "Đã chọn file" : "Chọn file"}</Text>
                </TouchableOpacity>
              );
            }

            // Mặc định: text
            return (
              <TextInput
                key={String(field.key)}
                value={String(value ?? "")}
                onChangeText={(text) => handleChange(field.key, text)}
                placeholder={field.placeholder}
                className="border border-gray-300 rounded-lg px-3 py-2 mb-3"
              />
            );
          })}

          <View className="flex-row justify-end space-x-3">
            <TouchableOpacity
              onPress={onClose}
              className="px-4 py-2 bg-gray-400 rounded-lg"
            >
              <Text className="text-white">Hủy</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onSubmit(formValues)}
              className="px-4 py-2 bg-blue-500 rounded-lg"
            >
              <Text className="text-white">Lưu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
