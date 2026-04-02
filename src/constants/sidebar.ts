import {
  LayoutGrid,
  LogOut,
  MessageSquarePlus,
  Search,
  UserRound,
} from "lucide-react";

const items = [
  {
    id: "new-chat",
    name: "New chat",
    icon: MessageSquarePlus,
  },
  {
    id: "search",
    name: "Search chats",
    icon: Search,
  },
  {
    id: "dashboard",
    name: "Dashboard",
    icon: LayoutGrid,
  },
  {
    id: "profile",
    name: "Profile",
    icon: UserRound,
  },
  {
    id: "logout",
    name: "Logout",
    icon: LogOut,
  },
];

export default items;
