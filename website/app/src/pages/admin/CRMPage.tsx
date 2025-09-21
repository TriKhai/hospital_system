import { useEffect, useState } from "react";
import Tabs, { type Tab } from "../../components/layout/admin/Tabs";
import { useCount } from "../../hooks/useCount";
import departmentService from "../../services/departmentApi";
import DepartmentPage from "./catalogs/DepartmentPage";
import { useSearchParams } from "react-router-dom";

const STORAGE_KEY = "crm_active_tab";

function AccountsTable() {
  return <div className="p-4 border rounded">🏦 Bảng Accounts</div>;
}

function ContactsTable() {
  return <div className="p-4 border rounded">👥 Bảng Contacts</div>;
}

function LeadsTable() {
  return <div className="p-4 border rounded">🚀 Bảng Leads</div>;
}

export default function CRMPage() {
  const departmentCount = useCount(departmentService.getCount);

  const crmTabs: Tab[] = [
    { label: "Khoa", count: departmentCount, component: <DepartmentPage /> },
    { label: "Chuyên Khoa", count: 40, component: <AccountsTable /> },
    { label: "Contacts", count: 0, component: <ContactsTable /> },
    { label: "Leads", count: 21, component: <LeadsTable /> },
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
