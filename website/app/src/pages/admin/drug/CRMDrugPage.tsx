import { useEffect, useState } from "react";
import { useCount } from "../../../hooks/useCount";
import { useSearchParams } from "react-router-dom";
import type { Tab } from "../../../components/layout/admin/Tabs";
import Tabs from "../../../components/layout/admin/Tabs";
import accountService from "../../../services/accountApi";
import DrugTypePage from "./DrugTypePage";
import drugTypeService from "../../../services/drugTypeApi";
import DrugPage from "./DrugPage";

const STORAGE_KEY = "crm_drug_active_tab";

export default function CRMDrugPage() {
  const accCount = useCount(accountService.getCount);
  const drugTypeCount = useCount(drugTypeService.getCount);

  const crmTabs: Tab[] = [
    { label: "Thuốc", count: accCount, component: <DrugPage /> },
    { label: "Loại thuốc", count: drugTypeCount, component: <DrugTypePage/> },
    { label: "Nhà cung cấp", count: accCount, component: <div>Hello</div> },
    { label: "Hãng sản xuất", count: accCount, component: <div>Hello</div> },
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
