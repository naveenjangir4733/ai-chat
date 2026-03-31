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
      <div className="h-full flex flex-col text-white">
        <div
          className={`border-b border-gray-800 flex items-center justify-between ${isOpen ? "p-4" : "p-3"}`}
        >
          <h1 className={`${isOpen ? "block" : "hidden"} text-xl font-bold`}>
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
        <div className={` ${isOpen ? "p-4" : "p-3"}`}>
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`flex items-center gap-2 my-4 ${isOpen ? "justify-start" : "justify-center"}`}
              >
                <Icon size={20} />
                {isOpen && <span>{item.name}</span>}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ChatSidebar;
