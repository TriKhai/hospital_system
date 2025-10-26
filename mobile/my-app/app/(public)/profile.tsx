import {
  View,
  Text,
  Alert,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { Redirect, router } from "expo-router";
import { logout } from "@/store/slices/authSlice";
import { fetchPatientProfile } from "@/store/slices/patientSlice";
import ProfileSection from "@/components/Profile/ProfileSection";
import ErrorOrEmptyState from "@/components/ErrorOrEmptyState";
import patientService from "@/services/patientApi";
import { PatientUpdateRequest } from "@/types/api/patientType";
import EditProfile from "@/components/Profile/EditProfile";

const ProfileScreen = () => {
  const [imageSrc, setImageSrc] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const {
    data: patient,
    loading,
    error,
  } = useSelector((state: RootState) => state.patient);

  // Nếu chưa đăng nhập → chuyển về login
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/(auth)/login");
      return;
    }

    if (user?.role !== "PATIENT") {
      router.replace("/unauthorized");
    }
  }, [isAuthenticated, user]);

  // Khi có đăng nhập → fetch profile
  useEffect(() => {
    if (isAuthenticated && !patient) {
      dispatch(fetchPatientProfile());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    const loadImage = async () => {
      const url = await patientService.loadImage(patient?.imageUrl);
      setImageSrc(url);
    };
    loadImage();
  }, [patient?.imageUrl]);

  if (loading) return <ActivityIndicator size="large" color="#007bff" />;

  if (error) {
    return (
      <ErrorOrEmptyState
        message={`Lỗi: ${error}`}
        showRetry
        onRetry={() => dispatch(fetchPatientProfile())}
      />
    );
  }

  if (!patient) return null;

  const handleUpdateProfile = async (data: PatientUpdateRequest) => {
    try {
      await patientService.updateProfile(data);

      // Cập nhật lại dữ liệu trong Redux
      await dispatch(fetchPatientProfile());

      // Đóng modal
      setModalIsVisible(false);

      // Hiển thị thông báo thành công
      Alert.alert("Thành công", "Cập nhật thông tin cá nhân thành công.", [
        { text: "OK" },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert("Lỗi", "Cập nhật thất bại, vui lòng thử lại sau.", [
        { text: "Đóng", style: "cancel" },
      ]);
    }
  };

  function openModalHandler() {
    setModalIsVisible(true);
  }

  function closeModalHandler() {
    setModalIsVisible(false);
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
    <ScrollView className="flex-1 bg-gray-50 ">
      {/* Header */}
      <View className="items-center mt-16">
        <Text className="text-2xl font-bold text-gray-800">Trang cá nhân</Text>
      </View>

      {/* Profile Card */}
      <View className="bg-white mx-4 mt-4 rounded-2xl border border-gray-200 items-center p-6">
        <Image
          source={
            imageSrc
              ? { uri: imageSrc }
              : require("../../assets/profile/default-patient.png")
          }
          className="w-32 h-32 rounded-full mb-3 border border-gray-400"
          resizeMode="cover"
        />
        <Text className="text-lg font-semibold text-gray-800">
          {patient.name}
        </Text>
        <TouchableOpacity className="bg-light-300 rounded-lg px-4 py-1.5 mt-2">
          <Text className="text-white font-semibold">Cập nhật ảnh</Text>
        </TouchableOpacity>

        {/* Thông tin nhanh */}
        <View className="w-full mt-3 space-y-3">
          <View className="flex-row gap-2">
            <Text className="text-gray-500">Email</Text>
            <Text className="text-gray-800 font-medium">{patient.email}</Text>
          </View>
          <View className="flex-row gap-2">
            <Text className="text-gray-500 ">Số điện thoại</Text>
            <Text className="text-gray-800 font-medium">{patient.phone}</Text>
          </View>
          <View className="flex-row gap-2">
            <Text className="text-gray-500 ">Số lịch khám</Text>
            <Text className="text-gray-800 font-medium">11</Text>
          </View>
        </View>
      </View>

      {/* Hồ sơ */}

      <ProfileSection
        title="Hồ sơ của bạn"
        onEdit={() => console.log("Edit pressed")}
        onOpenEdit={openModalHandler}
        data={[
          { label: "Họ và tên", value: patient.name },
          {
            label: "Ngày sinh",
            value: new Date(patient.birthDate).toLocaleDateString("vi-VN"),
          },
          { label: "Giới tính", value: patient.gender ? "Nam" : "Nữ" },
          { label: "Email", value: patient.email },
          { label: "Số điện thoại", value: patient.phone },
          { label: "Địa chỉ", value: patient.address },
          {
            label: "Ngày đăng ký",
            value: new Date(patient.createdAt).toLocaleString("vi-VN"),
          },
          {
            label: "Ngày cập nhật",
            value: new Date(patient.updatedAt).toLocaleString("vi-VN"),
          },
        ]}
      />

      {/* Nút đăng xuất */}
      <TouchableOpacity
        onPress={handleLogout}
        className="mx-4 mb-8 bg-light-300 rounded-xl py-3 items-center"
      >
        <Text className="text-white font-semibold">Đăng xuất</Text>
      </TouchableOpacity>

      {modalIsVisible && (
        <EditProfile
          isOpen={modalIsVisible}
          patient={patient}
          onCancel={closeModalHandler}
          onEdit={handleUpdateProfile}
        />
      )}
    </ScrollView>
  );
};

export default ProfileScreen;
