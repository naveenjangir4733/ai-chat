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

      <main className="flex-1 h-full p-4 overflow-auto">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mb-4 px-3 py-1 bg-black text-white rounded"
        >
          {isOpen ? "Close Sidebar" : "Open Sidebar"}
        </button>

        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
