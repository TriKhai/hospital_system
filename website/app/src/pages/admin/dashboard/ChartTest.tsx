import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ChartProps {
  data: {
    day: string;
    male: number;
    female: number;
  }[];
}

export default function ChartTest({ data }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="day" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />

        <Line
          type="monotone"
          dataKey="male"
          stroke="#2563eb"
          strokeWidth={2}
          dot={false}
          name="Bệnh nhân nam"
        />

        <Line
          type="monotone"
          dataKey="female"
          stroke="#f97316"
          strokeWidth={2}
          dot={false}
          name="Bệnh nhân nữ"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
