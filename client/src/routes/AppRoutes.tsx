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
import RuwanwelisayaDetails from "../pages/public/RuwanwelisayaDetails";
import AllPlaces from "../pages/public/AllPlaces";
import OurMission from "../pages/public/OurMission";
import ContactUs from "../pages/public/ContactUs";
import PrivacyPolicy from "../pages/public/PrivacyPolicy";
import TermsAndConditions from "../pages/public/TermsAndConditions";
import FAQs from "../pages/public/FAQs";

// Admin Pages
import Dashboard from "../pages/admin/Dashboard";
import AdminLogin from "../pages/admin/AdminLogin";
import HistoricalPlaces from "../pages/admin/HistoricalPlaces";
import MediaLibrary from "../pages/admin/MediaLibrary";
import Categories from "../pages/admin/Categories";
import Analytics from "../pages/admin/Analytics";
import Users from "../pages/admin/Users";
import AdminProfile from "../pages/admin/AdminProfile";
import AdminSettings from "../pages/admin/AdminSettings";




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
      { path: "ruwanwelisaya", element: <RuwanwelisayaDetails /> },
      { path: "all-places",          element: <AllPlaces /> },
      { path: "our-mission",         element: <OurMission /> },
      { path: "contact-us",          element: <ContactUs /> },
      { path: "privacy-policy",      element: <PrivacyPolicy /> },
      { path: "terms-and-conditions",element: <TermsAndConditions /> },
      { path: "faqs",                element: <FAQs /> },
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "heritage", element: <HistoricalPlaces /> },
      { path: "media", element: <MediaLibrary /> },
      { path: "categories", element: <Categories /> },
      { path: "analytics", element: <Analytics /> },
      { path: "users", element: <Users /> },
      { path: "profile", element: <AdminProfile /> },
      { path: "settings", element: <AdminSettings /> },
    ],
  },
]);


const AppRoutes = () => {
  return (
    <RouterProvider router={router} />
  );
};


export default AppRoutes;
