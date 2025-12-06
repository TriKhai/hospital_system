import React from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale/vi";
import type { Blog } from "../../../types/blogType";
import DOMPurify from "dompurify";

export default function BlogDetail({ blog }: { blog: Blog }) {
  return (
    <div className="max-h-[80vh] overflow-y-auto p-4">
      <article className="bg-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          {blog.title}
        </h1>

        <div className="text-gray-500 text-sm mb-4">
          {blog.author?.fullName} •{" "}
          {format(new Date(blog.publishedAt), "dd/MM/yyyy", { locale: vi })}
        </div>

        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="w-full rounded-xl mb-6"
        />

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(blog.content),
          }}
        />
      </article>
    </div>
  );
}
