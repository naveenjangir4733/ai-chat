import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div style={{ display: "flex" }}>
      <aside style={{ width: "200px", background: "#eee" }}>Sidebar</aside>

      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
