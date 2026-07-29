import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import AdminLayout from "../layout/AdminLayout";

// Public Pages
import Home from "../pages/public/Home";
import TempleOfToothDetails from "../pages/public/TempleOfToothDetails";

// Admin Pages
import Dashboard from "../pages/admin/Dashboard";
import AddNewPlace from "../pages/admin/AddNewPlace";

const router = createBrowserRouter([

  // PUBLIC WEBSITE ROUTES
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },

      // Uncomment this if you want to use this page
      // {
      //   path: "temple-of-tooth",
      //   element: <TempleOfToothDetails />
      // }
    ]
  },

  // ADMIN PANEL ROUTES
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: "heritage/add-new",
        element: <AddNewPlace />
      }
    ]
  }

]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;