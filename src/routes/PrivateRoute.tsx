import { useAppContext } from "@/context/AppContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function PrivateRoute() {
  const location = useLocation();
  const { token, sessionUser } = useAppContext();

  return token && sessionUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}

export default PrivateRoute;
