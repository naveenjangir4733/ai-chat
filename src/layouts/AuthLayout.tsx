import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <Outlet />
    </div>
  );
}

export default AuthLayout;
