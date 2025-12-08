import { useEffect, useState } from "react";
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
import dashboardService from "../../../services/dashboardApi";
import type { AppointmentChart } from "../../../types/dashboardType";
import dayjs from "dayjs";

export default function AppointmentsChart() {
  const [mode, setMode] = useState<
    "hour" | "weekday" | "week" | "monthday" | "yearmonth"
  >("hour");
  const [chartType, setChartType] = useState<"bar" | "line">("bar");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "cancelled"
  >("all");

  const [shiftMode, setShiftMode] = useState<
    "all" | "morning" | "afternoon" | "evening"
  >("all");

  const now = dayjs();

  const [selectedDate, setSelectedDate] = useState(now.format("YYYY-MM-DD"));
  const [selectedMonth, setSelectedMonth] = useState(now.month() + 1); 
  const [selectedYear, setSelectedYear] = useState(now.year());

  const [hourData, setHourData] = useState<AppointmentChart[]>([]);
  const [weekdayData, setWeekdayData] = useState<AppointmentChart[]>([]);
  const [weekData, setWeekData] = useState<AppointmentChart[]>([]);
  const [monthdayData, setMonthdayData] = useState<AppointmentChart[]>([]);
  const [yearMonthData, setYearMonthData] = useState<AppointmentChart[]>([]);


  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (mode === "hour") {
          const data = await dashboardService.getHourlyStats(
            selectedDate,
            shiftMode
          );
          setHourData(data);
        }

        if (mode === "weekday") {
          const data = await dashboardService.getWeekdayStats(selectedDate);
          setWeekdayData(data);
        }

        if (mode === "week") {
          const data = await dashboardService.getWeeklyStats(selectedMonth, selectedYear);
          setWeekData(data);
        }

        if (mode === "monthday") {
          const data = await dashboardService.getMonthDayStats(selectedMonth, selectedYear);
          setMonthdayData(data);
        }

        if (mode === "yearmonth") {
          const data = await dashboardService.getStatsYearMonth(selectedYear);
          setYearMonthData(data);
        }

      } catch (e) {
        console.error("Fetch stats failed:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mode, selectedDate, shiftMode, selectedMonth, selectedYear]);

  //
  // CHỌN DỮ LIỆU THEO MODE
  //
  let title = "";
  let baseData: AppointmentChart[] = [];

  if (mode === "hour") {
    title = "Theo giờ trong ngày";
    baseData = hourData;
  } else if (mode === "weekday") {
    title = "Theo ngày trong tuần";
    baseData = weekdayData;
  } else if (mode === "week") {
    title = "Theo tuần trong tháng";
    baseData = weekData;
  } else if (mode === "monthday") {
    title = "Theo ngày trong tháng";
    baseData = monthdayData;
  } else if (mode === "yearmonth") {
    title = "Theo tháng trong năm";
    baseData = yearMonthData;
  }

  // // LỌC DỮ LIỆU THEO TRẠNG THÁI
  let data = baseData.map((d) => {
    let obj: any = { label: d.label };
    if (filterStatus === "all" || filterStatus === "active")
      obj.active = d.active;
    if (filterStatus === "all" || filterStatus === "cancelled")
      obj.cancelled = d.cancelled;
    return obj;
  });

  // RENDER CHART
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

    return (
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="label" />
        <YAxis allowDecimals={false}/>
        <Tooltip />
        <Legend />

        {(filterStatus === "all" || filterStatus === "active") && (
          <Line
            type="monotone"
            dataKey="active"
            stroke="#2563eb"
            strokeWidth={2}
            name="Không huỷ"
          />
        )}

        {(filterStatus === "all" || filterStatus === "cancelled") && (
          <Line
            type="monotone"
            dataKey="cancelled"
            stroke="#ef4444"
            strokeWidth={2}
            name="Huỷ"
          />
        )}
      </LineChart>
    );
  };

  //
  // GIAO DIỆN
  //
  return (
    <div className="h-full flex flex-col gap-3">
      {/* OPTIONS BAR */}
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
                mode === item.key
                  ? "bg-[#0E8DA1] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mode CHỌN BUỔI (chỉ hiện khi mode = hour) */}
        {mode === "hour" && (
          <div className="inline-flex rounded-lg border bg-white p-1">
            {[
              { key: "all", label: "Tất cả" },
              { key: "morning", label: "Sáng" },
              { key: "afternoon", label: "Chiều" },
              { key: "evening", label: "Tối" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setShiftMode(item.key as any)}
                className={`px-3 py-1 text-xs sm:text-sm rounded-md ${
                  shiftMode === item.key
                    ? "bg-[#0E8DA1] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

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
                  ? "bg-[#0E8DA1] text-white"
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
                  ? "bg-[#0E8DA1] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* CHỌN NGÀY/THÁNG/NĂM */}
      <div className="flex gap-3 text-sm text-gray-600">
        {(mode === "hour" || mode === "weekday") && (
          <input
            type="date"
            className="border p-2 rounded"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        )}

        {mode === "week" && (
          <>
            <input
              type="number"
              min={1}
              max={12}
              className="border p-2 rounded w-28"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            />

            <input
              type="number"
              className="border p-2 rounded w-28"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            />
          </>
        )}

        {(mode === "monthday") && (
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

      {/* BIỂU ĐỒ */}
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
