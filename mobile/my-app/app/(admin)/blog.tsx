import { useEffect, useState } from "react";
import { View } from "react-native";
import Breadcrumb from "@/components/ui/Breadcrumb";
import TabsSwitcher from "@/components/ui/TabsSwitcher";
import MedicinePage from "@/components/Medicine/MedicinePage";
import drugTypeService from "@/services/typeMedicineApi";
import supplierService from "@/services/supplierApi";
import manufacturerService from "@/services/manufacturerApi";
import TagPage from "@/components/Tag/TagPage";
import CategoryPage from "@/components/Category/CategoryPage";
import AddBlogScreen from "@/components/Blog/AddBlog";

export default function BlogScreen() {
  const tabs = [
    { key: "blog", label: "Bài viết" },
    { key: "tag", label: "Thẻ" },
    { key: "category", label: "Phân loại" },
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
      <Breadcrumb paths={["Quản bài viết"]} current={tabLabel} />

      <TabsSwitcher
        tabs={[
          { key: "blog", label: "Bài viết", count: 111 },
          { key: "tag", label: "Thẻ", count: countDrugType },
          { key: "category", label: "Phân loại", count: countSupplier },
        ]}
        activeKey={tab}
        onChange={(key) => setTab(key as "blog" | "tag" | "category")}
      />

      {tab === "blog" && <AddBlogScreen />}
      {tab === "tag" && <TagPage />}
      {tab === "category" && <CategoryPage />}
    </View>
  );
}
