import { useEffect, useState } from "react";
import { View } from "react-native";
import Breadcrumb from "@/components/ui/Breadcrumb";
import TabsSwitcher from "@/components/ui/TabsSwitcher";
import MedicinePage from "@/components/Medicine/MedicinePage";
import SupplierPage from "@/components/Medicine/SupplierPage";
import ManufacturerPage from "@/components/Medicine/ManufacturerPage";
import DrugTypePage from "@/components/Medicine/DrugTypePage";
import drugTypeService from "@/services/typeMedicineApi";
import supplierService from "@/services/supplierApi";
import manufacturerService from "@/services/manufacturerApi";

export default function MedicinesScreen() {
  const tabs = [
    { key: "drug", label: "Thuốc" },
    { key: "drug_type", label: "Loại thuốc" },
    { key: "supplier", label: "Nhà cung cấp" },
    { key: "manufacturer", label: "Hãng sản xuất" },
  ];

  const [tab, setTab] = useState(tabs[0].key);
  const tabLabel = tabs.find((t) => t.key === tab)?.label ?? "";

  const [countDrugType, setCountDrugType] = useState<number>(0);
  const [countSupplier, setCountSupplier] = useState<number>(0);
  const [countManufacturer, setCountManufacturer] = useState<number>(0);

  const fetchCount = async () => {
    const rdt = await drugTypeService.getCount();
    setCountDrugType(rdt);

    const rs = await supplierService.getCount();
    setCountSupplier(rs);

    const rm = await manufacturerService.getCount();
    setCountManufacturer(rm);
  };

  useEffect(() => {
    fetchCount();
  }, []);

  return (
    <View className="flex-1 bg-gray-50 p-2">
      <Breadcrumb paths={["Quản lý Thuốc"]} current={tabLabel} />

      <TabsSwitcher
        tabs={[
          { key: "drug", label: "Thuốc", count: 111 },
          { key: "drug_type", label: "Loại thuốc", count: countDrugType },
          { key: "supplier", label: "Nhà cung cấp", count: countSupplier },
          { key: "manufacturer", label: "Hãng sản xuất", count: countManufacturer },
        ]}
        activeKey={tab}
        onChange={(key) => setTab(key as "drug" | "drug_type" | "supplier" | "manufacturer")}
      />

      {tab === "drug" && <MedicinePage />}
      {tab === "drug_type" && <DrugTypePage onFetchCount={fetchCount}/>}
      {tab === "supplier" && <SupplierPage onFetchCount={fetchCount}/>}
      {tab === "manufacturer" && <ManufacturerPage onFetchCount={fetchCount}/>}
    </View>
  );
}
