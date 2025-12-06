import { useEffect, useState } from "react";
import type { Blog } from "../../../types/blogType";
import blogService from "../../../services/blogApi";
import BlogTable from "./BlogTable";
import { Input, Select, type SelectChangeEvent } from "@mui/material";
import BlogPreviewModal from "./BlogPreviewModal";
import BlogForm from "./BlogForm";

export default function BlogManagementPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);

  const fetchBlogs = async () => {
    const data = await blogService.getBlogs();
    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filtered = blogs.filter((b) => {
    return (
      b.title.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter ? b.status === statusFilter : true)
    );
  });

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Quản lý Blog</h2>
        <button onClick={() => setOpenForm(true)}>+ Thêm Blog</button>
      </div>

      <div className="flex gap-3 mb-4">
        <Input
          placeholder="Tìm kiếm tiêu đề..."
          value={search}
          onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => setSearch(e.target.value)}
          className="w-1/3"
        />
        <Select
          value={statusFilter}
          onChange={(e:SelectChangeEvent) => setStatusFilter(e.target.value)}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="DRAFT">Nháp</option>
          <option value="PENDING">Chờ duyệt</option>
          <option value="APPROVED">Đã duyệt</option>
          <option value="REJECTED">Từ chối</option>
        </Select>
      </div>

      <BlogTable
        blogs={filtered}
        onPreview={(b) => {
          setSelectedBlog(b);
          setOpenPreview(true);
        }}
        onEdit={(b) => {
          setSelectedBlog(b);
          setOpenForm(true);
        }}
        onDelete={async (id) => {
          console.log(id)
          // await blogService.remove(id);
          fetchBlogs();
        }}
      />

      <BlogForm
        open={openForm}
        blog={selectedBlog}
        onClose={() => {
          setOpenForm(false);
          setSelectedBlog(null);
        }}
        onSuccess={fetchBlogs}
      />
     

      <BlogPreviewModal
        open={openPreview}
        blog={selectedBlog}
        onClose={() => setOpenPreview(false)}
      /> 
    </div>
  );
}
