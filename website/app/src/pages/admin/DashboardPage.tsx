import React from "react";

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p className="text-sm text-gray-500">Doctors</p>
          <p className="text-2xl font-bold">12</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p className="text-sm text-gray-500">Patients</p>
          <p className="text-2xl font-bold">120</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p className="text-sm text-gray-500">Appointments Today</p>
          <p className="text-2xl font-bold">35</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p className="text-sm text-gray-500">Pending Appointments</p>
          <p className="text-2xl font-bold">10</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow h-64">
          <p className="font-semibold mb-2">Appointments This Week</p>
          {/* Ở đây bạn có thể render chart bằng Recharts hoặc Chart.js */}
          <div className="h-full flex items-center justify-center text-gray-400">
            Chart placeholder
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow h-64">
          <p className="font-semibold mb-2">Patients by Specialty</p>
          <div className="h-full flex items-center justify-center text-gray-400">
            Chart placeholder
          </div>
        </div>
      </div>

      {/* Recent Appointments */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <p className="font-semibold mb-2">Recent Appointments</p>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          <li className="py-2 flex justify-between">
            <span>John Doe - Dr. Smith</span>
            <span>12/09/2025 10:00</span>
          </li>
          <li className="py-2 flex justify-between">
            <span>Jane Doe - Dr. Brown</span>
            <span>12/09/2025 11:00</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;