import React, { useEffect, useState } from "react";
import blogService from "../../../services/blogApi";
import type { Blog } from "../../../types/blogType";
import BlogCard from "./BlogCard";

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   blogService
  //     .getBlogs()
  //     .then((data) => setBlogs(data))
  //     .finally(() => setLoading(false));
  // }, []);

  useEffect(() => {
    blogService
      .getBlogs()
      .then((data) => {
        const sorted = [...data].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );
        setBlogs(sorted);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <div className="text-center py-10">Đang tải tin tức...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        Tin tức mới nhất
      </h1>

      <div className="grid gap-6 max-h-[75vh] overflow-y-auto pr-2">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}
