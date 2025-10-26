import { View, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

interface FilterParams {
  specialty: string;
  search: string;
}

interface DoctorFilterBarProps {
  onFilter: (params: FilterParams) => void;
}

export default function DoctorFilterBar({ onFilter }: DoctorFilterBarProps) {

  const [specialty, setSpecialty] = useState("Tất cả");
  const [search, setSearch] = useState("");

  return (
    <View className="flex-row items-center p-3 bg-white rounded-xl shadow">
      <Picker
        selectedValue={specialty}
        style={{ flex: 1 }}
        onValueChange={(v) => {
          setSpecialty(v);
          onFilter({ specialty: v, search });
        }}
      >
        <Picker.Item label="Tất cả" value="Tất cả" />
        <Picker.Item label="Tim mạch" value="Tim mạch" />
        <Picker.Item label="Nhi khoa" value="Nhi khoa" />
      </Picker>
      <TextInput
        placeholder="Tìm tên bác sĩ..."
        className="flex-1 ml-2 border border-gray-300 rounded-lg px-2 py-1"
        value={search}
        onChangeText={(t) => {
          setSearch(t);
          onFilter({ specialty, search: t });
        }}
      />
    </View>
  );
}
