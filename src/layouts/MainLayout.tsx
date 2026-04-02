import { useState } from "react";
import { Sidebar } from "@/components";
import { Outlet } from "react-router-dom";

function MainLayout() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="h-screen flex overflow-hidden border-box">
      <aside
        className={`transition-all duration-300 bg-gray-900 ${
          isOpen ? "w-1/4" : "w-16"
        } overflow-hidden`}
      >
        <Sidebar setIsOpen={setIsOpen} isOpen={isOpen} />
      </aside>

      <main className="flex-1 h-full  overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
