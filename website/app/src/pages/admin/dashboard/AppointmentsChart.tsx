import { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

//
// ─── DỮ LIỆU CỨNG (FAKE DATA) ───────────────────────────────────────────────
//

const dataByHour = [
  { label: "08:00", active: 6, cancelled: 2 },
  { label: "09:00", active: 10, cancelled: 4 },
  { label: "10:00", active: 14, cancelled: 2 },
  { label: "11:00", active: 9, cancelled: 3 },
  { label: "14:00", active: 7, cancelled: 3 },
  { label: "15:00", active: 10, cancelled: 3 },
  { label: "16:00", active: 6, cancelled: 3 },
];

const dataByDayOfWeek = [
  { label: "T2", active: 26, cancelled: 4 },
  { label: "T3", active: 29, cancelled: 3 },
  { label: "T4", active: 32, cancelled: 5 },
  { label: "T5", active: 30, cancelled: 2 },
  { label: "T6", active: 35, cancelled: 5 },
  { label: "T7", active: 22, cancelled: 4 },
  { label: "CN", active: 12, cancelled: 2 },
];

const dataByWeek = [
  { label: "Tuần 1", active: 120, cancelled: 25 },
  { label: "Tuần 2", active: 140, cancelled: 30 },
  { label: "Tuần 3", active: 136, cancelled: 28 },
  { label: "Tuần 4", active: 148, cancelled: 32 },
];

const dataByDayInMonth = Array.from({ length: 30 }, (_, i) => ({
  label: `Ngày ${i + 1}`,
  active: Math.floor(Math.random() * 40) + 10,
  cancelled: Math.floor(Math.random() * 10) + 2,
}));

const dataByMonth = [
  { label: "T1", active: 310, cancelled: 60 },
  { label: "T2", active: 280, cancelled: 55 },
  { label: "T3", active: 350, cancelled: 70 },
  { label: "T4", active: 330, cancelled: 65 },
  { label: "T5", active: 360, cancelled: 75 },
  { label: "T6", active: 340, cancelled: 68 },
  { label: "T7", active: 320, cancelled: 60 },
  { label: "T8", active: 370, cancelled: 80 },
  { label: "T9", active: 360, cancelled: 75 },
  { label: "T10", active: 390, cancelled: 90 },
  { label: "T11", active: 350, cancelled: 65 },
  { label: "T12", active: 380, cancelled: 85 },
];

//
// ─── COMPONENT ──────────────────────────────────────────────────────────────
//

export default function AppointmentsChart() {
  const [mode, setMode] = useState<"hour" | "weekday" | "week" | "monthday" | "yearmonth">("hour");
  const [chartType, setChartType] = useState<"bar" | "line">("bar");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "cancelled">("all");

  const [selectedDate, setSelectedDate] = useState("2025-01-15");
  const [selectedMonth, setSelectedMonth] = useState(1); // 1 - 12
  const [selectedYear, setSelectedYear] = useState(2025);

  //
  // CHỌN DỮ LIỆU THEO MODE
  //
  let title = "";
  let baseData = dataByHour;

  if (mode === "hour") {
    title = "Theo giờ trong ngày";
    baseData = dataByHour;
  } else if (mode === "weekday") {
    title = "Theo ngày trong tuần";
    baseData = dataByDayOfWeek;
  } else if (mode === "week") {
    title = "Theo tuần trong tháng";
    baseData = dataByWeek;
  } else if (mode === "monthday") {
    title = "Theo ngày trong tháng";
    baseData = dataByDayInMonth;
  } else if (mode === "yearmonth") {
    title = "Theo tháng trong năm";
    baseData = dataByMonth;
  }

  //
  // LỌC DỮ LIỆU THEO TRẠNG THÁI
  //
  let data = baseData.map((d) => {
    let obj: any = { label: d.label };
    if (filterStatus === "all" || filterStatus === "active") obj.active = d.active;
    if (filterStatus === "all" || filterStatus === "cancelled") obj.cancelled = d.cancelled;
    return obj;
  });

  //
  // RENDER CHART
  //
  const renderChart = () => {
    if (chartType === "bar") {
      return (
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Legend />

          {(filterStatus === "all" || filterStatus === "active") && (
            <Bar dataKey="active" fill="#2563eb" name="Không huỷ" />
          )}

          {(filterStatus === "all" || filterStatus === "cancelled") && (
            <Bar dataKey="cancelled" fill="#ef4444" name="Huỷ" />
          )}
        </BarChart>
      );
    }

    // Line chart
    return (
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Legend />

        {(filterStatus === "all" || filterStatus === "active") && (
          <Line type="monotone" dataKey="active" stroke="#2563eb" strokeWidth={2} name="Không huỷ" />
        )}

        {(filterStatus === "all" || filterStatus === "cancelled") && (
          <Line type="monotone" dataKey="cancelled" stroke="#ef4444" strokeWidth={2} name="Huỷ" />
        )}
      </LineChart>
    );
  };

  //
  // GIAO DIỆN
  //
  return (
    <div className="h-full flex flex-col gap-3">

      {/* ─── OPTIONS BAR ───────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        {/* Mode chọn dạng thời gian */}
        <div className="inline-flex rounded-lg border bg-white p-1">
          {[
            { key: "hour", label: "Giờ" },
            { key: "weekday", label: "Ngày (Tuần)" },
            { key: "week", label: "Tuần (Tháng)" },
            { key: "monthday", label: "Ngày (Tháng)" },
            { key: "yearmonth", label: "Tháng (Năm)" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setMode(item.key as any)}
              className={`px-3 py-1 text-xs sm:text-sm rounded-md ${
                mode === item.key ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Chọn chart type */}
        <div className="inline-flex rounded-lg border bg-white p-1">
          {[
            { key: "bar", label: "Cột" },
            { key: "line", label: "Đường" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setChartType(item.key as any)}
              className={`px-3 py-1 text-xs sm:text-sm rounded-md ${
                chartType === item.key
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Filter trạng thái */}
        <div className="inline-flex rounded-lg border bg-white p-1">
          {[
            { key: "all", label: "Cả hai" },
            { key: "active", label: "Không huỷ" },
            { key: "cancelled", label: "Huỷ" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setFilterStatus(item.key as any)}
              className={`px-3 py-1 text-xs sm:text-sm rounded-md ${
                filterStatus === item.key
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── CHỌN NGÀY/THÁNG/NĂM ───────────────────────── */}
      <div className="flex gap-3 text-sm text-gray-600">

        {(mode === "hour" || mode === "weekday") && (
          <input
            type="date"
            className="border p-2 rounded"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        )}

        {(mode === "week" || mode === "monthday") && (
          <input
            type="number"
            min={1}
            max={12}
            className="border p-2 rounded w-28"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          />
        )}

        {mode === "yearmonth" && (
          <input
            type="number"
            className="border p-2 rounded w-28"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          />
        )}
      </div>

      {/* ─── BIỂU ĐỒ ───────────────────────── */}
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
