export type UserRecord = {
  id: string;
  name: string;
  email: string;
  password: string;
  plan: "Free" | "Pro";
  createdAt: string;
};

export type SessionUser = Omit<UserRecord, "password">;

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

export type ChatThread = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  isTemporary: boolean;
  messages: ChatMessage[];
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export type AppContextValue = {
  users: UserRecord[];
  sessionUser: SessionUser | null;
  token: string | null;
  chats: ChatThread[];
  filteredChats: ChatThread[];
  activeChat: ChatThread | null;
  searchTerm: string;
  login: (email: string, password: string) => { ok: boolean; message: string };
  register: (input: RegisterInput) => { ok: boolean; message: string };
  logout: () => void;
  setSearchTerm: (value: string) => void;
  createChat: (temporary?: boolean) => string;
  selectChat: (chatId: string) => void;
  renameChat: (chatId: string, title: string) => void;
  deleteChat: (chatId: string) => void;
  toggleTemporary: (chatId: string) => void;
  appendMessage: (
    chatId: string,
    message: Omit<ChatMessage, "id" | "createdAt">,
  ) => void;
  updateLastAssistantMessage: (chatId: string, content: string) => void;
};

export type AppProviderProps = {
  children: React.ReactNode;
};
