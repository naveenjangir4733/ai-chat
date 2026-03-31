import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const token = localStorage.getItem("token");
  const isAuth = !!token;

  console.log("PrivateRoute rendered");
  console.log("Token:", token);

  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
