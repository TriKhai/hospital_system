import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/layout/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Breadcrumbs from "../../components/layout/Breadcrumbs";

export default function AdminPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="font-sans flex min-h-screen text-black bg-gradient-to-br from-green-200 via-green-50 to-white">
      <Sidebar isOpen={isSidebarOpen} />
      <main className="flex-1 relative p-8 bg-gray-100 border-gray-300 border-l">
        <button
          className="absolute bottom-0 left-0 p-2 bg-gray-300 rounded-tr-lg rounded-br-lg z-50"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className="p-5">
          <div className="pb-2 border-b border-gray-300">
            <Breadcrumbs />
          </div>
          <div className="mt-3">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
