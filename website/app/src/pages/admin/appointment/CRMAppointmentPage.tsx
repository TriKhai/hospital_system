import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Tab } from "../../../components/layout/admin/Tabs";
import Tabs from "../../../components/layout/admin/Tabs";
import AppointmentPage from "./AppointmentPage";

const STORAGE_KEY = "crm_appt_active_tab";

export default function CRMAppointmentPage() {

  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>(() => {
    const urlTab = searchParams.get("tab");
    if (urlTab) return urlTab;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;

    return "Tất cả";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, activeTab);
    setSearchParams({ tab: activeTab });
  }, [activeTab, setSearchParams]);

  const crmTabs: Tab[] = [
    {
      label: "Tất cả",
      count: 0,
      component: <AppointmentPage/>,
    }, 
    {
      label: "Chờ duyệt",
      count: 0,
      component: <AppointmentPage statusRender="PENDING" />,
    },
    {
      label: "Đã duyệt",
      count: 0,
      component: <AppointmentPage statusRender="PENDING_VERIFICATION" />,
    },
    {
      label: "Đã xác nhận",
      count: 0,
      component: <AppointmentPage statusRender="CONFIRMED" />,
    },
    {
      label: "Đã từ chối",
      count: 0,
      component: <AppointmentPage statusRender="REJECTED" />,
    },
  ];

  return (
    <Tabs
      tabs={crmTabs}
      defaultActive={activeTab}
      onChange={(label) => setActiveTab(label)}
    />
  );
}
