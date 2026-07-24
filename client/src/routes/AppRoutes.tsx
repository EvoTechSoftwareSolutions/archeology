import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";


import MainLayout from "../layout/MainLayout";
import AdminLayout from "../layout/AdminLayout";


// Public Pages
import Home from "../pages/public/Home";


// Admin Pages
import Dashboard from "../pages/admin/Dashboard";
import TempleOfToothDetails from "../pages/public/TempleOfToothDetails";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "temple-of-the-tooth",
        element: <TempleOfToothDetails />,
      },
    ],
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
]);



const AppRoutes = () => {

  return (
    <RouterProvider router={router}/>
  );

};


export default AppRoutes;