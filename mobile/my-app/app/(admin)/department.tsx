import { useEffect, useState } from "react";
import { View } from "react-native";
import Breadcrumb from "@/components/ui/Breadcrumb";
import TabsSwitcher from "@/components/ui/TabsSwitcher";
import DepartmentPage from "@/components/Department/DepartmentPage";
import SpecialtyPage from "@/components/Specialty/SpecialtyPage";
import departmentService from "@/services/departmentApi";
import specialtyService from "@/services/specialtyApi";

export default function DepartmentScreen() {
  const [tab, setTab] = useState<"department" | "specialty">("department");
  const tabLabel = tab === "department" ? "Khoa" : "Chuyên Khoa";

  const [countDepartment, setCountDepartment] = useState<number>(0);
  const [countSpecialty, setCountSpecialty] = useState<number>(0);

  const fetchCount = async () => {
    const resultD = await departmentService.getCount();
    setCountDepartment(resultD);

    const resultS = await specialtyService.getCount();
    setCountSpecialty(resultS);
  };

  // const reloadData = async () => {
  //   await fetchCount();
  // };

  useEffect(() => {
    fetchCount();
  }, []);

  return (
    <View className="flex-1 bg-gray-50 p-2">
      <Breadcrumb paths={["Quản lý chuyên khoa"]} current={tabLabel} />

      <TabsSwitcher
        tabs={[
          { key: "department", label: "Khoa", count: countDepartment },
          { key: "specialty", label: "Chuyên Khoa", count: countSpecialty },
        ]}
        activeKey={tab}
        onChange={(key) => setTab(key as "department" | "specialty")}
      />

      {tab === "department" ? <DepartmentPage /> : <SpecialtyPage />}
    </View>
  );
}
