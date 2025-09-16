import React from "react";
import Navbar from "../components/layout/Navbar";
// import StickyNavbar from "../components/layout/StickyNavbar";

export default function Home() {

  return (
    <div>
      <div>
        {/* <StickyNavbar /> */}
        <Navbar />
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <h1 className="text-4xl font-bold mb-6">Welcome to Hospital System</h1>
      </div>
    </div>
  );
}
