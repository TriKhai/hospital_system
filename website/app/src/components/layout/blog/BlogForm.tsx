import { useState, useEffect } from "react";
import { Dialog, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import type { Blog, BlogFormRequest } from "../../../types/blogType";
import blogService from "../../../services/blogApi";
import categoryService from "../../../services/categoryApi";
import tagService from "../../../services/tagApi";
import BlogEditor from "./BlogEditor";
import { toast } from "react-toastify";

type Props = {
  open: boolean;
  blog: Blog | null;
  onClose: () => void;
  onSuccess: () => void;
};

export default function BlogForm({ open, blog, onClose, onSuccess }: Props) {
  const [form, setForm] = useState<Partial<BlogFormRequest>>({});
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [tags, setTags] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    setForm(blog ?? {});

    Promise.all([categoryService.getAll(), tagService.getAll()]).then(([c, t]) => {
      setCategories(c);
      setTags(t);
    });
  }, [blog]);

  const handleSubmit = async () => {
    console.log("FORM DATA:", form);

    if (!form.title || !form.content || !form.categoryId) {
      alert("Vui lòng nhập đầy đủ tiêu đề, nội dung và danh mục!");
      return;
    }

    await blogService.createBlogByDoctor(form as BlogFormRequest);
    toast.success("Đã thêm bài viết thành công")
    await blogService.getBlogByDoctor()
    onSuccess();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <div className="p-6 w-full flex flex-col gap-5">
        <h2 className="text-lg font-semibold">
          {blog ? "Cập nhật Blog" : "Thêm Blog mới"}
        </h2>

        {/* Tiêu đề */}
        <input
          placeholder="Tiêu đề"
          value={form.title || ""}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 rounded w-full"
        />

        {/* Mô tả */}
        <textarea
          placeholder="Mô tả ngắn"
          value={form.description || ""}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 rounded"
        />

        {/* Danh mục */}
        <FormControl fullWidth>
          <InputLabel>Danh mục</InputLabel>
          <Select
            value={form.categoryId || ""}
            label="Danh mục"
            onChange={(e) => setForm({ ...form, categoryId: Number(e.target.value) })}
          >
            {categories.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Tag */}
        <FormControl fullWidth>
          <InputLabel>Tags</InputLabel>
          <Select
            multiple
            value={form.tagIds || []}
            onChange={(e) =>
              setForm({
                ...form,
                tagIds: typeof e.target.value === "string"
                  ? e.target.value.split(",").map(Number)
                  : e.target.value,
              })
            }
          >
            {tags.map((t) => (
              <MenuItem key={t.id} value={t.id}>
                {t.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Nội dung */}
        <BlogEditor
          value={form.content || ""}
          onChange={(val) => setForm({ ...form, content: val })}
        />

        {/* Ảnh thumbnail (tạm thời input text) */}
        <input
          placeholder="URL Thumbnail"
          value={form.thumbnail || ""}
          onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
          className="border p-2 rounded w-full"
        />

        {/* Nút lưu */}
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded self-end"
        >
          Lưu
        </button>
      </div>
    </Dialog>
  );
}
