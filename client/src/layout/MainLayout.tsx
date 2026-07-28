import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Common Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-1">
        <ScrollToTop />
        <Outlet />
      </main>

      {/* Common Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;