import { AuthLayout, MainLayout } from "@/layouts";
import {
  Dashboard,
  Home,
  ForgotPassword,
  Login,
  Profile,
  Register,
  ResetPassword,
} from "@/pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
