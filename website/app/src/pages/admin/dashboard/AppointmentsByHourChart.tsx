// src/components/AppointmentsByHourChart.jsx
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
  { hour: "08:00", total: 8 },
  { hour: "09:00", total: 14 },
  { hour: "10:00", total: 16 },
  { hour: "11:00", total: 12 },
  { hour: "14:00", total: 10 },
  { hour: "15:00", total: 13 },
  { hour: "16:00", total: 9 },
];

export default function AppointmentsByHourChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="hour" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" fill="#2563eb" name="Số lịch hẹn" />
      </BarChart>
    </ResponsiveContainer>
  );
}
