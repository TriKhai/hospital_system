import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarNoFixed from '../../components/layout/NavbarNoFixed';

const MainPage: React.FC = () => {
  return (
    <div className="font-sans flex flex-col min-h-screen text-black dark:bg-[#030712] dark:text-white bg-gradient-to-br from-[#ade6ee] via-blue-50 to-white">
        <NavbarNoFixed />
        {/* <Navbar /> */}
        {/* <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto mt-6"> */}
        <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto mt-22">
          <Outlet />
        </main>
    </div>
  );
};

export default MainPage;