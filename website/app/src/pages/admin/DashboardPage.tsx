import React, { useEffect, useState } from "react";
import ChartTest from "./dashboard/ChartTest";
import AppointmentsChart from "./dashboard/AppointmentsChart";
import RecentAppointments from "./dashboard/RecentAppoinments";
import Summary from "./dashboard/Summary";
import {
  faPills,
  faFileInvoice,
  faUser,
  faUserDoctor,
  faTableColumns,
  faBook,
  faCalendarDay,
  faPenFancy,
} from "@fortawesome/free-solid-svg-icons";
import type { AppointmentStatusStats, DashboardSummary, WeeklyAppointment } from "../../types/dashboardType";
import dashboardService from "../../services/dashboardApi";
import StatusChart from "./dashboard/StatusChart";

const DashboardPage = () => {

  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [weekly, setWeekly] = useState<WeeklyAppointment | null>(null);
  const [statusStats, setStatusStats] = useState<AppointmentStatusStats[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [summaryData, weeklyData, appointmentsStatusData] = await Promise.all([
          dashboardService.getSummary(),
          dashboardService.getWeeklyAppointments(),
          dashboardService.getStatusStats(),
        ]);
            
        setSummary(summaryData);
        setWeekly(weeklyData);
        setStatusStats(appointmentsStatusData);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);


  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (!summary) return <p>Không có dữ liệu</p>;

  const items = [
    { title: "Bệnh nhân", value: summary.totalPatients, icon: faUser },
    { title: "Bác sĩ", value: summary.totalDoctors, icon: faUserDoctor },
    { title: "Khoa", value: summary.totalDepartments, icon: faTableColumns },
    { title: "Chuyên khoa", value: summary.totalSpecialties, icon: faBook },
    { title: "Lịch hôm nay", value: summary.appointmentsToday, icon: faCalendarDay },
    { title: "Tổng lịch khám", value: summary.totalAppointments, icon: faFileInvoice },
    { title: "Thuốc", value: summary.totalDrugs, icon: faPills },
    { title: "Bài viết", value: summary.totalBlogs, icon: faPenFancy },
  ];

  // Dataa cho banrg ben trai
  const chartData =
    weekly?.labels.map((label, i) => ({
      day: label,
      male: weekly.male[i],
      female: weekly.female[i],
  })) ?? [];

  const totalWeek =
  (weekly?.male?.reduce((sum, v) => sum + v, 0) ?? 0) +
  (weekly?.female?.reduce((sum, v) => sum + v, 0) ?? 0);


  return (
    // KHÔNG dùng overflow ở đây nữa, cho body/main tự scroll
    <main className="h-screen overflow-y-auto">
      <div className="flex flex-col gap-6 min-h-screen pr-2 pb-8">
        {/* Header */}
        <h1 className="text-3xl font-bold">Dashboard</h1>

        {/* Statistic Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item) => (
            <Summary
              key={item.title}
              title={item.title}
              value={String(item.value)}
              icon={item.icon}
            />
          ))}

        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Chart 1 */}
          <div className="bg-white p-4 rounded shadow h-72">
            <p className="font-semibold mb-2">Lịch hẹn trong tuần này ({totalWeek})</p>
            <div className="w-full h-[calc(100%-0.5rem)]">
              <ChartTest data={chartData} />
            </div>
          </div>

          {/* Chart 2 */}
          <div className="bg-white p-4 rounded shadow h-72">
            <p className="font-semibold mb-2">Thống kê lịch hẹn theo trạng thái</p>
            <div className="w-full h-[calc(100%-0.5rem)]">
              <StatusChart data={statusStats} />
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="bg-white p-4 rounded shadow h-80">
            <p className="font-semibold mb-2">Thống kê lịch hẹn</p>
            <div className="w-full h-[calc(100%-0.5rem)]">
              <AppointmentsChart />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <RecentAppointments />
        </div>
      </div>
      <div className="h-20" />
    </main>
  );
};

export default DashboardPage;
