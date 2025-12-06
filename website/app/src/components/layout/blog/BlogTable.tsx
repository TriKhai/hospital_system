import type { Blog } from "../../../types/blogType";

type Props = {
  blogs: Blog[];
//   onPreview: (blog: Blog) => void;
//   onEdit: (blog: Blog) => void;
//   onDelete: (id: number) => void;
};

export default function BlogTable({ blogs }: Props) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100 text-gray-700 text-left">
          <th className="p-2">Tiêu đề</th>
          <th className="p-2">Tác giả</th>
          <th className="p-2">Chuyên mục</th>
          <th className="p-2">Trạng thái</th>
          <th className="p-2">Ngày đăng</th>
          <th className="p-2 text-right">Hành động</th>
        </tr>
      </thead>
      <tbody>
        {blogs.map((b) => (
          <tr key={b.id} className="border-t hover:bg-gray-50">
            <td className="p-2">{b.title}</td>
            <td className="p-2">BS.{b.author?.fullName}</td>
            <td className="p-2">{b.category?.name}</td>
            <td className="p-2">{b.status}</td>
            <td className="p-2">
              {new Date(b.publishedAt).toLocaleDateString("vi-VN")}
            </td>
            <td className="p-2 text-right flex gap-2 justify-end">
              <button
                // onClick={() => onPreview(b)}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Xem
              </button>
              <button
                // onClick={() => onEdit(b)}
                className="px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Sửa
              </button>
              <button
                // onClick={() => onDelete(b.id)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Xóa
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
