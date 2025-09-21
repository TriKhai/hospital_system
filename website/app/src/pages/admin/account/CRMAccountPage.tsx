import { useEffect, useState } from "react";
import { useCount } from "../../../hooks/useCount";
import departmentService from "../../../services/departmentApi";
import specialtyService from "../../../services/specialtyApi";
import { useSearchParams } from "react-router-dom";
import type { Tab } from "../../../components/layout/admin/Tabs";
import Tabs from "../../../components/layout/admin/Tabs";
import DepartmentPage from "../catalogs/DepartmentPage";
import SpecialtyPage from "../catalogs/SpecialtyPage";


const STORAGE_KEY = "crm_account_active_tab";

export default function CRMPage() {
  const departmentCount = useCount(departmentService.getCount);
  const specialtyCount = useCount(specialtyService.getCount)

  const crmTabs: Tab[] = [
    { label: "Tài khoản", count: departmentCount, component: <DepartmentPage /> },
    { label: "Bác sĩ", count: specialtyCount, component: <SpecialtyPage /> },
    { label: "Bệnh nhân", count: specialtyCount, component: <SpecialtyPage /> },
  ];

  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>(() => {
    const urlTab = searchParams.get("tab");
    if (urlTab) return urlTab;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;

    return "Tài Khoản";
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
