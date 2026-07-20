import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";


const MainLayout = () => {


  return (

    <div className="min-h-screen flex flex-col">


      {/* Common Navbar */}
      <Navbar />


      {/* Page Content */}
      <main className="flex-1">

        <Outlet />

      </main>


      {/* Common Footer */}
      <Footer />


    </div>

  );

};


export default MainLayout;