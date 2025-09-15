import React, { useState, useEffect, useRef } from "react";

const StickyNavbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!navbarRef.current) return;
      const scrollPos = window.scrollY;
      const offsetTop = 100; // khoảng cách từ top muốn sticky
      if (scrollPos >= offsetTop) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={navbarRef}
      className={`bg-blue-600 text-white p-4 transition-all duration-300 ${
        isSticky ? "fixed top-0 left-0 w-full shadow-lg" : "relative mt-24"
      }`}
    >
      Navbar
    </div>
  );
};

export default StickyNavbar;

{/* <div className="sticky top-16 bg-blue-600 p-4 text-white">Navbar</div> */}
{/* <div className="sticky top-16 bg-blue-600 p-4 text-white shadow-lg z-50">
  Navbar
</div> */}

