import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const SuperAdminRouter = () => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo.role.includes("SUPER_ADMIN")) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
export default SuperAdminRouter;
