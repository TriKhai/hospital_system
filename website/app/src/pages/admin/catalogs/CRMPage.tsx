import { useEffect, useState } from "react";
import { useCount } from "../../../hooks/useCount";
import departmentService from "../../../services/departmentApi";
import specialtyService from "../../../services/specialtyApi";
import DepartmentPage from "./DepartmentPage";
import SpecialtyPage from "./SpecialtyPage";
import { useSearchParams } from "react-router-dom";
import type { Tab } from "../../../components/layout/admin/Tabs";
import Tabs from "../../../components/layout/admin/Tabs";


const STORAGE_KEY = "crm_active_tab";

export default function CRMPage() {
  const departmentCount = useCount(departmentService.getCount);
  const specialtyCount = useCount(specialtyService.getCount)

  const crmTabs: Tab[] = [
    { label: "Khoa", count: departmentCount, component: <DepartmentPage /> },
    { label: "Chuyên Khoa", count: specialtyCount, component: <SpecialtyPage /> },
  ];

  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>(() => {
    const urlTab = searchParams.get("tab");
    if (urlTab) return urlTab;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;

    return "Khoa";
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
