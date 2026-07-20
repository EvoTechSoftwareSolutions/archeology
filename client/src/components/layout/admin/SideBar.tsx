import { Link } from "react-router-dom";
import {
  MdDashboard,
  MdPeople,
  MdLocationOn,
  MdSettings
} from "react-icons/md";


const SideBar = () => {

  return (

    <aside className="
      w-64 
      min-h-screen 
      bg-gray-900 
      text-white
      p-5
    ">


      <h1 className="
        text-2xl 
        font-bold 
        mb-8
      ">
        Admin Panel
      </h1>



      <nav className="space-y-3">


        <Link
          to="/admin/dashboard"
          className="
          flex items-center gap-3 
          p-3 rounded
          hover:bg-gray-700
          "
        >

          <MdDashboard />

          Dashboard

        </Link>



        <Link
          to="/admin/users"
          className="
          flex items-center gap-3 
          p-3 rounded
          hover:bg-gray-700
          "
        >

          <MdPeople />

          Users

        </Link>




        <Link
          to="/admin/heritage"
          className="
          flex items-center gap-3 
          p-3 rounded
          hover:bg-gray-700
          "
        >

          <MdLocationOn />

          Heritage Places

        </Link>




        <Link
          to="/admin/settings"
          className="
          flex items-center gap-3 
          p-3 rounded
          hover:bg-gray-700
          "
        >

          <MdSettings />

          Settings

        </Link>


      </nav>


    </aside>

  );

};


export default SideBar;