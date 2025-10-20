import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  return (
    <ScrollView className="flex-1 bg-gray-50 px-4">
      {/* Header */}
      {/* <View className="flex-row justify-between items-center mt-10 mb-6">
        <View>
          <Text className="text-gray-600 text-base">Xin chào,</Text>
          <Text className="text-2xl font-bold text-gray-800">
            Nguyễn Văn A 👋
          </Text>
        </View>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
          className="w-12 h-12 rounded-full"
        />
      </View> */}

      {/* Search Bar */}
      <View className="mt-16 flex-row items-center bg-white rounded-2xl px-4 py-3 mb-6 border border-gray-200 ">
        <TextInput
          placeholder="Tìm bác sĩ, chuyên khoa..."
          className="flex-1 text-gray-700"
          placeholderTextColor="#9CA3AF"
        />
        <Image
          source={{
            uri: "https://img.icons8.com/ios-glyphs/30/search--v1.png",
          }}
          className="w-5 h-5 opacity-70"
        />
      </View>

      {/* Banner */}
      <View className="bg-blue-100 rounded-2xl p-6 mb-8 items-center">
        <Text className="text-blue-800 font-bold text-xl mb-2 text-center">
          BỆNH VIỆN THÀNH PHỐ CẦN THƠ
        </Text>
        <Text className="text-blue-700 text-sm leading-5 text-center mb-4">
          Chào mừng đến với hệ thống bệnh viện – nơi công nghệ và y tế gặp nhau.
          {"\n"}
          <Text className="font-medium">
            Sức khỏe của bạn – Sứ mệnh của chúng tôi.
          </Text>
        </Text>
        <TouchableOpacity className="bg-blue-600 rounded-xl px-5 py-2">
          <Text className="text-white font-semibold text-base">
            Đặt lịch ngay
          </Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách bác sĩ nổi bật */}
      <Text className="text-lg font-semibold text-gray-800 mb-3">
        Bác sĩ nổi bật
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {[1, 2, 3].map((i) => (
          <View
            key={i}
            className="bg-white rounded-2xl p-4 mr-4 w-40 border border-gray-200 "
          >
            <Image
              source={require("../../assets/profile/default-doctor.png")}
              className="w-full h-28 rounded-xl mb-3"
            />
            <Text className="font-semibold text-gray-800">BS. Anna Lee</Text>
            <Text className="text-gray-500 text-sm">Tim mạch</Text>
          </View>
        ))}
      </ScrollView>

      {/* Các chức năng nhanh */}
      <Text className="text-lg font-semibold text-gray-800 mb-3 mt-8">
        Dịch vụ nhanh
      </Text>
      <View className="flex-row justify-between mb-10">
        {[
          { name: "Đặt lịch", icon: "🗓️" },
          { name: "Kết quả", icon: "📄" },
          { name: "Bệnh án", icon: "📋" },
          { name: "Tư vấn", icon: "💬" },
        ].map((item) => (
          <TouchableOpacity
            key={item.name}
            className="bg-white w-[22%] py-4 rounded-2xl items-center border border-gray-200 "
          >
            <Text className="text-2xl mb-1">{item.icon}</Text>
            <Text className="text-gray-700 text-sm">{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
