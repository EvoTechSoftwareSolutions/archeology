import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import AdminLayout from "../layout/AdminLayout";

// Public Pages
import Home from "../pages/public/Home";
import TempleOfToothDetails from "../pages/public/TempleOfToothDetails";
import GalViharayaDetails from "../pages/public/GalViharayaDetails";
import SigiriyaDetails from "../pages/public/SigiriyaDetails";
import GalleFortDetails from "../pages/public/GalleFortDetails";
import AllPlaces from "../pages/public/AllPlaces";
import OurMission from "../pages/public/OurMission";
import ContactUs from "../pages/public/ContactUs";
import PrivacyPolicy from "../pages/public/PrivacyPolicy";
import TermsAndConditions from "../pages/public/TermsAndConditions";
import FAQs from "../pages/public/FAQs";

// Admin Pages
import Dashboard from "../pages/admin/Dashboard";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "temple-of-the-tooth", element: <TempleOfToothDetails /> },
      { path: "gal-viharaya", element: <GalViharayaDetails /> },
      { path: "sigiriya-rock-fortress", element: <SigiriyaDetails /> },
      { path: "galle-fort", element: <GalleFortDetails /> },
      { path: "all-places",          element: <AllPlaces /> },
      { path: "our-mission",         element: <OurMission /> },
      { path: "contact-us",          element: <ContactUs /> },
      { path: "privacy-policy",      element: <PrivacyPolicy /> },
      { path: "terms-and-conditions",element: <TermsAndConditions /> },
      { path: "faqs",                element: <FAQs /> },
    ],
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
    ],
  },
]);


const AppRoutes = () => {
  return (
    <RouterProvider router={router} />
  );
};


export default AppRoutes;
