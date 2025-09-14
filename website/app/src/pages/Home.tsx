import React from "react";
import { useAuth } from "../context/useAuth";
import Navbar from "../components/layout/Navbar";

export default function Home() {
  const { user, login, logout } = useAuth();

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <h1 className="text-4xl font-bold mb-6">Welcome to Hospital System</h1>

        {user ? (
          <>
            <p className="mb-4 text-lg">Hello, {user}!</p>
            <button
              onClick={logout}
              className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <p className="mb-4 text-lg">You are not logged in.</p>
            <button
              onClick={() => login("DemoUser")}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}
