import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
// import Header from '../components/layout/Header';
// import Footer from '../components/layout/Footer';
// import { ParallaxProvider } from 'react-scroll-parallax';

const MainPage: React.FC = () => {
  return (
    <div className="font-sans flex flex-col min-h-screen text-black dark:bg-[#030712] dark:text-white bg-gradient-to-br from-green-200 via-green-50 to-white">
      {/* <ParallaxProvider> */}
        {/* <Header /> */}
        <Navbar />
        {/* <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto mt-6"> */}
        <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
          <Outlet />
        </main>
        {/* <Footer /> */}
      {/* </ParallaxProvider> */}
    </div>
  );
};

export default MainPage;