import React from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { vi } from "date-fns/locale/vi";
import type { Blog } from "../../../types/blogType";

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/tin-tuc/${blog.id}`)}
      className="flex flex-col sm:flex-row bg-white rounded-xl shadow hover:shadow-lg transition p-3 cursor-pointer"
    >
      {/* Ảnh đại diện */}
      <img
        src={blog.thumbnail}
        alt={blog.title}
        className="w-full sm:w-64 h-48 object-cover rounded-lg"
      />

      {/* Nội dung */}
      <div className="flex flex-col justify-between p-3 sm:p-4 flex-1">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600">
            {blog.title}
          </h2>
          <p
            className="text-gray-600 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          />
        </div>
        <div className="text-sm text-gray-500 mt-3 flex justify-between">
          <span>{blog.author?.fullName}</span>
          <span>
            {format(new Date(blog.publishedAt), "dd/MM/yyyy", { locale: vi })}
          </span>
        </div>
      </div>
    </div>
  );
}
