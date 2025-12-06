import React, { useEffect, useState } from 'react'
import type { Blog } from '../../../types/blogType';
import blogService from '../../../services/blogApi';
import BlogTable from '../../../components/layout/blog/BlogTable';

type BlogPageProps = {
  status?: "ALL" | "PUBLISHED" | "PENDING";
};


export default function BlogPage({ status = "ALL" }: BlogPageProps) {
  const [blogs, setBlogs] = useState<Blog[]>([]);


  useEffect(() => {
    blogService.getBlogByDoctor().then(setBlogs);
  }, [status]);

  return (
    <div>
      <BlogTable blogs={blogs} />
    </div>
  );
}
