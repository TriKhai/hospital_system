import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Blog } from "../../../types/blogType";
import blogService from "../../../services/blogApi";
import BlogDetail from "./BlogDetail";

export default function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    if (id) blogService.getBlogById(Number(id)).then(setBlog);
  }, [id]);

  if (!blog) return <div className="text-center py-10">Đang tải bài viết...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        to="/tin-tuc"
        className="inline-block mb-4 text-blue-600 hover:underline text-sm"
      >
        Quay lại trang tin tức
      </Link>

      <BlogDetail blog={blog} />
    </div>
  );
}
