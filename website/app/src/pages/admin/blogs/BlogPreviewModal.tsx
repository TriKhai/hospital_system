import { Dialog } from "@mui/material";
import type { Blog } from "../../../types/blogType";

type Props = {
  open: boolean;
  blog: Blog | null;
  onClose: () => void;
};

export default function BlogPreviewModal({ open, blog, onClose }: Props) {
  if (!blog) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <div className="p-6 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
        <p className="text-sm text-gray-500 mb-4">
          BS.{blog.author?.fullName} - {blog.category?.name}
        </p>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </Dialog>
  );
}
