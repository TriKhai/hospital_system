// src/components/DepartmentLoadChart.jsx
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { dept: "Nội", current: 45, capacity: 60 },
  { dept: "Ngoại", current: 32, capacity: 50 },
  { dept: "Nhi", current: 28, capacity: 40 },
  { dept: "Sản", current: 52, capacity: 60 },
  { dept: "Cấp cứu", current: 18, capacity: 20 },
];

export default function DepartmentLoadChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="dept" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="current" fill="#2563eb" name="Đang điều trị" />
        <Bar dataKey="capacity" fill="#9ca3af" name="Sức chứa" />
      </BarChart>
    </ResponsiveContainer>
  );
}
