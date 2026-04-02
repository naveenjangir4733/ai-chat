/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type {
  AppContextValue,
  AppProviderProps,
  ChatMessage,
  ChatThread,
  RegisterInput,
  SessionUser,
  UserRecord,
} from "./types";

const USERS_KEY = "ai-clone:users";
const SESSION_KEY = "ai-clone:session";
const CHATS_PREFIX = "ai-clone:chats:";

const AppContext = createContext<AppContextValue | undefined>(undefined);

const createId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

const sanitizeUser = (user: UserRecord): SessionUser => ({
  id: user.id,
  name: user.name,
  email: user.email,
  plan: user.plan,
  createdAt: user.createdAt,
});

const safeRead = <T,>(key: string, fallback: T): T => {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
};

const writeStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getChatKey = (email: string) => `${CHATS_PREFIX}${email}`;

const createEmptyChat = (temporary = false): ChatThread => {
  const now = new Date().toISOString();
  return {
    id: createId(),
    title: "New chat",
    createdAt: now,
    updatedAt: now,
    isTemporary: temporary,
    messages: [],
  };
};

const loadChatsForEmail = (email: string) => {
  const storedChats = safeRead<ChatThread[]>(getChatKey(email), []);
  return storedChats.length > 0 ? storedChats : [createEmptyChat()];
};

const buildTitle = (content: string) => {
  const trimmed = content.trim().replace(/\s+/g, " ");
  if (!trimmed) {
    return "New chat";
  }
  return trimmed.length > 36 ? `${trimmed.slice(0, 36)}...` : trimmed;
};

const readInitialState = () => {
  const users = safeRead<UserRecord[]>(USERS_KEY, []);
  const storedSession = safeRead<{ token: string; email: string } | null>(
    SESSION_KEY,
    null,
  );

  if (!storedSession) {
    return {
      users,
      token: null,
      sessionUser: null,
      chats: [] as ChatThread[],
      activeChatId: null as string | null,
    };
  }

  const matchingUser = users.find((user) => user.email === storedSession.email);

  if (!matchingUser) {
    localStorage.removeItem(SESSION_KEY);
    return {
      users,
      token: null,
      sessionUser: null,
      chats: [] as ChatThread[],
      activeChatId: null as string | null,
    };
  }

  const chats = loadChatsForEmail(matchingUser.email);
  return {
    users,
    token: storedSession.token,
    sessionUser: sanitizeUser(matchingUser),
    chats,
    activeChatId: chats[0]?.id ?? null,
  };
};

export function AppProvider({ children }: AppProviderProps) {
  const initialState = useMemo(() => readInitialState(), []);
  const [users, setUsers] = useState<UserRecord[]>(initialState.users);
  const [sessionUser, setSessionUser] = useState<SessionUser | null>(
    initialState.sessionUser,
  );
  const [token, setToken] = useState<string | null>(initialState.token);
  const [chats, setChats] = useState<ChatThread[]>(initialState.chats);
  const [activeChatId, setActiveChatId] = useState<string | null>(
    initialState.activeChatId,
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!sessionUser) {
      return;
    }

    writeStorage(getChatKey(sessionUser.email), chats);
  }, [chats, sessionUser]);

  const login = (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const user = users.find(
      (entry) =>
        entry.email.toLowerCase() === normalizedEmail && entry.password === password,
    );

    if (!user) {
      return { ok: false, message: "Invalid email or password." };
    }

    const nextToken = `session-${createId()}`;
    const nextChats = loadChatsForEmail(user.email);

    writeStorage(SESSION_KEY, { token: nextToken, email: user.email });
    setToken(nextToken);
    setSessionUser(sanitizeUser(user));
    setChats(nextChats);
    setActiveChatId(nextChats[0]?.id ?? null);
    setSearchTerm("");

    return { ok: true, message: "Signed in successfully." };
  };

  const register = ({ name, email, password }: RegisterInput) => {
    const normalizedEmail = email.trim().toLowerCase();

    if (users.some((user) => user.email.toLowerCase() === normalizedEmail)) {
      return { ok: false, message: "An account with this email already exists." };
    }

    const newUser: UserRecord = {
      id: createId(),
      name: name.trim(),
      email: normalizedEmail,
      password,
      plan: "Free",
      createdAt: new Date().toISOString(),
    };

    const nextUsers = [...users, newUser];
    const nextToken = `session-${createId()}`;
    const nextChats = [createEmptyChat()];

    setUsers(nextUsers);
    writeStorage(USERS_KEY, nextUsers);
    writeStorage(SESSION_KEY, { token: nextToken, email: newUser.email });
    writeStorage(getChatKey(newUser.email), nextChats);

    setToken(nextToken);
    setSessionUser(sanitizeUser(newUser));
    setChats(nextChats);
    setActiveChatId(nextChats[0]?.id ?? null);
    setSearchTerm("");

    return { ok: true, message: "Account created successfully." };
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setToken(null);
    setSessionUser(null);
    setChats([]);
    setActiveChatId(null);
    setSearchTerm("");
  };

  const createChat = (temporary = false) => {
    const nextChat = createEmptyChat(temporary);
    setChats((current) => [nextChat, ...current]);
    setActiveChatId(nextChat.id);
    return nextChat.id;
  };

  const selectChat = (chatId: string) => {
    setActiveChatId(chatId);
  };

  const renameChat = (chatId: string, title: string) => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      return;
    }

    setChats((current) =>
      current.map((chat) =>
        chat.id === chatId
          ? { ...chat, title: trimmedTitle, updatedAt: new Date().toISOString() }
          : chat,
      ),
    );
  };

  const deleteChat = (chatId: string) => {
    const remaining = chats.filter((chat) => chat.id !== chatId);
    const nextChats = remaining.length > 0 ? remaining : [createEmptyChat()];
    const nextActiveId =
      activeChatId === chatId ? nextChats[0]?.id ?? null : activeChatId;

    setChats(nextChats);
    setActiveChatId(nextActiveId);
  };

  const toggleTemporary = (chatId: string) => {
    setChats((current) =>
      current.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              isTemporary: !chat.isTemporary,
              updatedAt: new Date().toISOString(),
            }
          : chat,
      ),
    );
  };

  const appendMessage = (
    chatId: string,
    message: Omit<ChatMessage, "id" | "createdAt">,
  ) => {
    setChats((current) =>
      current.map((chat) => {
        if (chat.id !== chatId) {
          return chat;
        }

        const nextMessage: ChatMessage = {
          id: createId(),
          createdAt: new Date().toISOString(),
          ...message,
        };

        return {
          ...chat,
          title:
            chat.messages.length === 0 && message.role === "user"
              ? buildTitle(message.content)
              : chat.title,
          updatedAt: new Date().toISOString(),
          messages: [...chat.messages, nextMessage],
        };
      }),
    );
  };

  const updateLastAssistantMessage = (chatId: string, content: string) => {
    setChats((current) =>
      current.map((chat) => {
        if (chat.id !== chatId || chat.messages.length === 0) {
          return chat;
        }

        const nextMessages = [...chat.messages];
        for (let index = nextMessages.length - 1; index >= 0; index -= 1) {
          if (nextMessages[index]?.role === "assistant") {
            nextMessages[index] = {
              ...nextMessages[index],
              content,
            };
            break;
          }
        }

        return {
          ...chat,
          updatedAt: new Date().toISOString(),
          messages: nextMessages,
        };
      }),
    );
  };

  const filteredChats = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase();
    if (!normalizedTerm) {
      return chats;
    }

    return chats.filter((chat) => {
      const haystack = `${chat.title} ${chat.messages
        .map((message) => message.content)
        .join(" ")}`
        .toLowerCase();
      return haystack.includes(normalizedTerm);
    });
  }, [chats, searchTerm]);

  const activeChat =
    chats.find((chat) => chat.id === activeChatId) ?? chats[0] ?? null;

  const value = {
    users,
    sessionUser,
    token,
    chats,
    filteredChats,
    activeChat,
    searchTerm,
    login,
    register,
    logout,
    setSearchTerm,
    createChat,
    selectChat,
    renameChat,
    deleteChat,
    toggleTemporary,
    appendMessage,
    updateLastAssistantMessage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
}
