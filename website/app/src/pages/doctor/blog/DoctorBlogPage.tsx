import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Tab } from "../../../components/layout/admin/Tabs";
import Tabs from "../../../components/layout/admin/Tabs";
import BlogPage from "./BlogPage";
import { Button } from "@mui/material";
import BlogForm from "../../../components/layout/blog/BlogForm";

const STORAGE_KEY = "crm_blog_active_tab";

export default function DoctorBlogPage() {
  // const tagCount = useCount(tagService.getCount);

  const [openForm, setOpenForm] = useState(false); 

  const crmTabs: Tab[] = [
    { label: "Tất cả bài viết", count: 111, component: <BlogPage status="ALL" /> },
    { label: "Đã được công bố", count: 111, component: <BlogPage status="PUBLISHED" /> },
    { label: "Đang chờ duyệt", count: 111, component: <BlogPage status="PENDING" /> },
  ];

  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>(() => {
    const urlTab = searchParams.get("tab");
    if (urlTab) return urlTab;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;

    return "Tất cả bài viết";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, activeTab);
    setSearchParams({ tab: activeTab });
  }, [activeTab, setSearchParams]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Quản lý Blog của bác sĩ</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenForm(true)}
        >
          + Thêm Blog
        </Button>
      </div>

      <Tabs
        tabs={crmTabs}
        defaultActive={activeTab}
        onChange={(label) => setActiveTab(label)}
      />

      <BlogForm
        open={openForm}
        blog={null}
        onClose={() => setOpenForm(false)}
        onSuccess={() => {
          setOpenForm(false);
          // TODO: refresh danh sách blog sau khi thêm
        }}
      />
    </div>
  );
}
