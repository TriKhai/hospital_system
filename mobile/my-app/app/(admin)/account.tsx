import { useEffect, useState } from "react";
import { View } from "react-native";
import Breadcrumb from "@/components/ui/Breadcrumb";
import TabsSwitcher from "@/components/ui/TabsSwitcher";
import AccountPage from "@/components/Account/AccountPage";
import PatientAccountPage from "@/components/Account/PatientAccountPage";
import DoctorAccountPage from "@/components/Account/DoctorAccountPage";
import accountService from "@/services/accountApi";
import patientService from "@/services/patientApi";
import doctorService from "@/services/doctorApi";

export default function AccountScreen() {
  const tabs = [
    { key: "account", label: "Tài khoản" },
    { key: "doctor", label: "Bác sĩ" },
    { key: "patient", label: "Bệnh nhân" },
  ];

  const [tab, setTab] = useState(tabs[0].key);
  const tabLabel = tabs.find((t) => t.key === tab)?.label ?? "";

  const [countAccount, setCountAccount] = useState<number>(0);
  const [countPatientAccount, setCountPatientAccount] = useState<number>(0);
  const [countDoctorAccount, setCountDoctorAccount] = useState<number>(0);

  const fetchCount = async () => {
    const ra = await accountService.getCount();
    setCountAccount(ra);

    const rpa = await patientService.getCount();
    setCountPatientAccount(rpa);

    const rda = await doctorService.getCount();
    setCountDoctorAccount(rda);
  };

  useEffect(() => {
    fetchCount();
  }, []);

  return (
    <View className="flex-1 bg-gray-50 p-2">
      <Breadcrumb paths={["Quản lý tài khoản"]} current={tabLabel} />

      <TabsSwitcher
        tabs={[
          { key: "account", label: "Tài Khoản", count: countAccount },
          { key: "doctor", label: "Bác sĩ", count: countDoctorAccount },
          { key: "patient", label: "Bệnh nhân", count: countPatientAccount },
        ]}
        activeKey={tab}
        onChange={(key) => setTab(key as "account" | "doctor" | "patient")}
      />

      {tab === "patient" && <PatientAccountPage />}
      {tab === "doctor" && <DoctorAccountPage />}
      {tab === "account" && <AccountPage />}
    </View>
  );
}
