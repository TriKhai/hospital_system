import { useEffect, useState } from "react";
import { useCount } from "../../../hooks/useCount";
import { useSearchParams } from "react-router-dom";
import type { Tab } from "../../../components/layout/admin/Tabs";
import Tabs from "../../../components/layout/admin/Tabs";
import categoryService from "../../../services/categoryApi";
import TagPage from "./TagPage";
import CategoryPage from "./CategoryPage";
import BlogManagementPage from "./BlogManagementPage";
import tagService from "../../../services/tagApi";


const STORAGE_KEY = "crm_blog_active_tab";

export default function CRMBlogPage() {
  const tagCount = useCount(tagService.getCount);
  const categoryCount = useCount(categoryService.getCount)

  const crmTabs: Tab[] = [
    { label: "Bài viết", count: tagCount, component: <BlogManagementPage /> },
    { label: "Nhãn", count: tagCount, component: <TagPage /> },
    { label: "Chuyên mục", count: categoryCount, component: <CategoryPage /> },
  ];

  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>(() => {
    const urlTab = searchParams.get("tab");
    if (urlTab) return urlTab;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;

    return "Bài viết";
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
