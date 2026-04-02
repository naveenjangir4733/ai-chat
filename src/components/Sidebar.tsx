import {
  MoreHorizontal,
  PanelLeftClose,
  PanelRightClose,
  Search,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import type { ChatSidebarProps } from "./types";
import items from "../constants/sidebar";

const ChatSidebar = ({ isOpen, setIsOpen }: ChatSidebarProps) => {
  const navigate = useNavigate();
  const {
    activeChat,
    createChat,
    deleteChat,
    filteredChats,
    logout,
    renameChat,
    searchTerm,
    selectChat,
    sessionUser,
    setSearchTerm,
  } = useAppContext();

  const handleQuickAction = (actionId: string) => {
    if (actionId === "new-chat") {
      navigate("/");
      createChat();
      return;
    }

    if (actionId === "search") {
      if (!isOpen) {
        setIsOpen(true);
      }
      return;
    }

    if (actionId === "dashboard") {
      navigate("/dashboard");
      return;
    }

    if (actionId === "profile") {
      navigate("/profile");
      return;
    }

    logout();
    navigate("/login", { replace: true });
  };

  const handleRename = (chatId: string, currentTitle: string) => {
    const nextTitle = window.prompt("Rename this chat", currentTitle);
    if (nextTitle) {
      renameChat(chatId, nextTitle);
    }
  };

  return (
    <div className="relative flex h-full flex-col border-r border-white/10 bg-[linear-gradient(180deg,rgba(3,7,18,0.98),rgba(15,23,42,0.98))] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_32%)]" />

      <div className="relative flex h-full flex-col">
        <div
          className={`flex items-center justify-between border-b border-white/10 ${
            isOpen ? "p-4" : "p-3"
          }`}
        >
          <h1
            className={`${isOpen ? "block px-2" : "hidden"} text-lg font-semibold text-cyan-100`}
          >
            AI Chats
          </h1>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-xl border px-4.5 border-white/10 bg-white/5 p-3 transition hover:bg-white/10"
          >
            {isOpen ? (
              <PanelLeftClose
                size={20}
                className="transition hover:text-cyan-200"
              />
            ) : (
              <PanelRightClose
                size={20}
                className="transition hover:text-cyan-200"
              />
            )}
          </button>
        </div>

        <div className={`${isOpen ? "px-4 pt-4" : "px-3 pt-3"}`}>
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleQuickAction(item.id)}
                className={`my-2 flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 py-3 transition hover:border-cyan-400/30 hover:bg-cyan-400/10 ${
                  isOpen ? "justify-start px-4" : "justify-center"
                }`}
              >
                <Icon size={18} className="shrink-0" />
                {isOpen ? (
                  <span className="text-sm text-slate-100">{item.name}</span>
                ) : null}
              </button>
            );
          })}
        </div>

        {isOpen ? (
          <div className="mx-4 mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3">
            <Search size={16} className="text-slate-400" />
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              placeholder="Search conversations"
            />
          </div>
        ) : null}

        <div className="mt-4 flex-1 overflow-y-auto px-3 pb-32 custom-scrollbar">
          <div className={`${isOpen ? "px-1" : "px-0"}`}>
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                className={`group mb-2 rounded-2xl border transition ${
                  activeChat?.id === chat.id
                    ? "border-cyan-400/40 bg-cyan-400/12"
                    : "border-white/8 bg-white/4 hover:bg-white/8"
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    selectChat(chat.id);
                    navigate("/");
                  }}
                  className={`flex w-full items-center ${
                    isOpen
                      ? "justify-between gap-3 px-3 py-3"
                      : "justify-center px-2 py-3"
                  }`}
                >
                  <div className="min-w-0 text-left">
                    <p className="truncate text-sm font-medium text-white">
                      {isOpen ? chat.title : chat.title.charAt(0).toUpperCase()}
                    </p>
                    {isOpen ? (
                      <p className="mt-1 text-xs text-slate-400">
                        {chat.messages.length} messages
                        {chat.isTemporary ? " • Temporary" : ""}
                      </p>
                    ) : null}
                  </div>

                  {isOpen ? (
                    <span className="opacity-0 transition group-hover:opacity-100">
                      <MoreHorizontal size={16} className="text-slate-400" />
                    </span>
                  ) : null}
                </button>

                {isOpen ? (
                  <div className="flex gap-2 border-t border-white/8 px-3 py-2">
                    <button
                      type="button"
                      onClick={() => handleRename(chat.id, chat.title)}
                      className="rounded-xl border border-white/10 px-3 py-1 text-xs text-slate-300 transition hover:bg-white/6"
                    >
                      Rename
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteChat(chat.id)}
                      className="inline-flex items-center gap-1 rounded-xl border border-red-400/20 px-3 py-1 text-xs text-red-200 transition hover:bg-red-500/10"
                    >
                      <Trash2 size={12} />
                      Delete
                    </button>
                  </div>
                ) : null}
              </div>
            ))}

            {filteredChats.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-center text-sm text-slate-400">
                No chats match your search.
              </div>
            ) : null}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-slate-950/80 p-4 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400 font-semibold text-slate-950">
              {sessionUser?.name?.charAt(0).toUpperCase() ?? "U"}
            </div>
            {isOpen ? (
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">
                  {sessionUser?.name}
                </p>
                <p className="truncate text-xs text-slate-400">
                  {sessionUser?.plan} plan
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
