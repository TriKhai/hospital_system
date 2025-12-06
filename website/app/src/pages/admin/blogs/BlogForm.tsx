import { useState, useEffect } from "react";
import { Dialog } from "@mui/material";
import type { Blog } from "../../../types/blogType";
import blogService from "../../../services/blogApi";
import BlogEditor from "./BlogEditor";

type Props = {
  open: boolean;
  blog: Blog | null;
  onClose: () => void;
  onSuccess: () => void;
};

export default function BlogForm({ open, blog, onClose, onSuccess }: Props) {
  const [form, setForm] = useState<Partial<Blog>>({});

  useEffect(() => {
    setForm(blog ?? {});
  }, [blog]);

  const handleSubmit = async () => {
    console.log(blog)
    console.log("FORM DATA:", form)

    // if (blog) await blogService.update(blog.id, form);
    // else await blogService.create(form);
    onSuccess();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <div className="p-6 w-full flex flex-col gap-5">
        <h2 className="text-lg font-semibold">
          {blog ? "Cập nhật Blog" : "Thêm Blog mới"}
        </h2>

        <input
          placeholder="Tiêu đề"
          value={form.title || ""}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 rounded w-full"
        />

        <textarea
          placeholder="Mô tả ngắn"
          value={form.description || ""}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 rounded"
        />

        <BlogEditor
          value={form.content || ""}
          onChange={(val) => setForm({ ...form, content: val })}
        />

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
