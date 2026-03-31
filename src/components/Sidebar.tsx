import {
  Images,
  LayoutGrid,
  MessageSquare,
  PanelLeftClose,
  PanelRightClose,
  Search,
  SquarePen,
} from "lucide-react";

type ChatSidebarProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};
const ChatSidebar = ({ isOpen, setIsOpen }: ChatSidebarProps) => {
  const items = [
    {
      id: 1,
      name: "New Chat",
      icon: SquarePen,
    },
    {
      id: 2,
      name: "Search Chats",
      icon: Search,
    },
    {
      id: 3,
      name: "Images",
      icon: Images,
    },
    {
      id: 4,
      name: "Apps",
      icon: LayoutGrid,
    },
    {
      id: 5,
      name: "Deep Serach",
      icon: MessageSquare,
    },
    {
      id: 6,
      name: "Codex",
      icon: MessageSquare,
    },
  ];
  return (
    <>
      <div className="h-full flex flex-col text-white relative">
        <div
          className={`border-b border-gray-800 flex items-center justify-between ${isOpen ? "p-4" : "p-3"}`}
        >
          <h1
            className={`${isOpen ? "block px-4" : "hidden"} text-xl font-bold`}
          >
            Chats
          </h1>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer p-2 rounded-lg"
          >
            {isOpen ? (
              <PanelLeftClose size={20} />
            ) : (
              <PanelRightClose size={20} />
            )}
          </button>
        </div>
        <div className={` ${isOpen ? "p-4" : "p-3"} overflow-y-auto`}>
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`flex items-center gap-2 rounded-2xl py-3 cursor-pointer 
    transition-all duration-200 
    hover:bg-gray-800 
    ${isOpen ? "justify-start px-4" : "justify-center"}
  `}
              >
                <Icon size={20} />
                {isOpen && <span>{item.name}</span>}
              </div>
            );
          })}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 justify-center flex items-center bg-blue-500 text-white p-2 rounded-full">
                L
              </div>
              {isOpen && (
                <div>
                  <h2 className="text-sm font-semibold">learningweb93@</h2>
                  <p className="text-xs text-gray-400">Free</p>
                </div>
              )}
            </div>
            {isOpen && (
              <button
                className=" px-4 text-white py-1 rounded-3xl border border-white
             transition"
              >
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
