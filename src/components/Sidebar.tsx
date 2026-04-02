import { PanelLeftClose, PanelRightClose } from "lucide-react";
import items from "../constants/sidebar";

type ChatSidebarProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const ChatSidebar = ({ isOpen, setIsOpen }: ChatSidebarProps) => {
  return (
    <>
      <div className="h-full flex flex-col text-white relative bg-linear-to-b from-gray-900/80 to-black/50 backdrop-blur-sm border-r border-white/10">
        <div
          className={`border-b border-white/20 backdrop-blur-sm flex items-center justify-between ${isOpen ? "p-4" : "p-3"}`}
        >
          <h1
            className={`${isOpen ? "block px-4" : "hidden"} text-xl font-bold bg-linear-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent drop-shadow-sm`}
          >
            Chats
          </h1>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer p-2 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 hover:bg-white/20 transition-colors duration-200"
          >
            {isOpen ? (
              <PanelLeftClose
                size={20}
                className="hover:text-purple-300 transition-colors"
              />
            ) : (
              <PanelRightClose
                size={20}
                className="hover:text-purple-300 transition-colors"
              />
            )}
          </button>
        </div>
        <div className={` ${isOpen ? "p-4" : "p-3"} overflow-y-auto`}>
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`flex items-center gap-2 rounded-2xl py-3 my-2 cursor-pointer backdrop-blur-sm bg-white/5 border border-white/10
    transition-all duration-200 
    hover:bg-linear-to-r hover:from-white/15 hover:to-purple-500/10 hover:border-purple-500/30 hover:shadow-md hover:shadow-purple-500/20
    ${isOpen ? "justify-start px-4" : "justify-center"}
  `}
              >
                <Icon
                  size={20}
                  className="hover:text-purple-300 transition-colors"
                />
                {isOpen && (
                  <span className="hover:text-purple-200 transition-colors">
                    {item.name}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/20 backdrop-blur-sm bg-white/5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 justify-center flex items-center bg-linear-to-br from-blue-500 to-purple-600 text-white p-2 rounded-full shadow-lg ring-1 ring-white/30">
                L
              </div>
              {isOpen && (
                <div>
                  <h2 className="text-sm font-semibold bg-linear-to-r from-white to-gray-200 bg-clip-text text-transparent">
                    learningweb93@
                  </h2>
                  <p className="text-xs text-gray-300 font-medium">Free</p>
                </div>
              )}
            </div>
            {isOpen && (
              <button className="px-4 text-white py-1 rounded-3xl border border-white/50 backdrop-blur-sm bg-white/10 hover:bg-linear-to-r hover:from-emerald-500/20 hover:to-blue-500/20 hover:border-emerald-400/50 hover:shadow-md hover:shadow-emerald-500/25 transition-all duration-200">
                Upgrade
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatSidebar;
