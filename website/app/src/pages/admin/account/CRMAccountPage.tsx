import { useEffect, useState } from "react";
import { useCount } from "../../../hooks/useCount";
import { useSearchParams } from "react-router-dom";
import type { Tab } from "../../../components/layout/admin/Tabs";
import Tabs from "../../../components/layout/admin/Tabs";
import accountService from "../../../services/accountApi";
import AccountPage from "./AccountPage";
import doctorService from "../../../services/doctorApi";
import DoctorPage from "./DoctorPage";
import patientService from "../../../services/patientApi";
import PatientPage from "./PatientPage";


const STORAGE_KEY = "crm_account_active_tab";

export default function CRMAccountPage() {
  const accCount = useCount(accountService.getCount);
  const docCount = useCount(doctorService.getCount);
  const patCount = useCount(patientService.getCount)

  const crmTabs: Tab[] = [
    { label: "Tài khoản", count: accCount, component: <AccountPage /> },
    { label: "Bác sĩ", count: docCount, component: <DoctorPage /> },
    { label: "Bệnh nhân", count: patCount, component: <PatientPage /> },
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
