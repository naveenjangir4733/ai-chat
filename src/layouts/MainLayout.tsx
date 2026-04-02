import { useState } from "react";
import { Sidebar } from "@/components";
import { Outlet } from "react-router-dom";

function MainLayout() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      <aside
        className={`shrink-0 overflow-hidden transition-all duration-300 ${
          isOpen ? "w-[320px]" : "w-20"
        } overflow-hidden`}
      >
        <Sidebar setIsOpen={setIsOpen} isOpen={isOpen} />
      </aside>

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
