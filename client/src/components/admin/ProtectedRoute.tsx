import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const location = useLocation();
  const token = localStorage.getItem("adminToken");
  const rawAdminUser = localStorage.getItem("adminUser");

  let adminUser = null;

  try {
    adminUser = rawAdminUser ? JSON.parse(rawAdminUser) : null;
  } catch {
    adminUser = null;
  }

  if (
    !token ||
    token === "undefined" ||
    token === "null" ||
    !adminUser ||
    !["ADMIN", "SUPERADMIN"].includes(adminUser.role)
  ) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;