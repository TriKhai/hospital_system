import { useEffect, useState } from "react";
import { useCount } from "../../../hooks/useCount";
import { useSearchParams } from "react-router-dom";
import type { Tab } from "../../../components/layout/admin/Tabs";
import Tabs from "../../../components/layout/admin/Tabs";
import DrugTypePage from "./DrugTypePage";
import drugTypeService from "../../../services/drugTypeApi";
import DrugPage from "./DrugPage";
import manufacturerService from "../../../services/manufacturer";
import ManufacturerPage from "./ManufacturerPage";
import supplierService from "../../../services/supplierApi";
import SupplierPage from "./SupplierPage";
import drugService from "../../../services/drugApi";

const STORAGE_KEY = "crm_drug_active_tab";

export default function CRMDrugPage() {
  const drugCount = useCount(drugService.getCount);
  const drugTypeCount = useCount(drugTypeService.getCount);
  const manufacturerCount = useCount(manufacturerService.getCount);
  const supplierCount = useCount(supplierService.getCount);

  const crmTabs: Tab[] = [
    { label: "Thuốc", count: drugCount, component: <DrugPage /> },
    { label: "Loại thuốc", count: drugTypeCount, component: <DrugTypePage/> },
    { label: "Nhà cung cấp", count: supplierCount, component: <SupplierPage /> },
    { label: "Hãng sản xuất", count: manufacturerCount, component: <ManufacturerPage /> },
  ];

  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>(() => {
    const urlTab = searchParams.get("tab");
    if (urlTab) return urlTab;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;

    return "Thuốc";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, activeTab);
    setSearchParams({ tab: activeTab });
  }, [activeTab, setSearchParams]);

  return (
    <Tabs
      tabs={crmTabs}
      defaultActive={activeTab}
      onChange={(label) => setActiveTab(label)}
    />
  );
}
