import axios from "axios";
import type {
  RefreshResponse,
  RetryableRequestConfig,
  StoredSession,
} from "./types";

const SESSION_KEY = "ai-clone:session";
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
const REFRESH_ENDPOINT =
  import.meta.env.VITE_REFRESH_TOKEN_ENDPOINT || "/auth/refresh-token";

const getStoredSession = (): StoredSession | null => {
  try {
    const value = localStorage.getItem(SESSION_KEY);
    return value ? (JSON.parse(value) as StoredSession) : null;
  } catch {
    return null;
  }
};

const setStoredSession = (session: StoredSession) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

const clearStoredSession = () => {
  localStorage.removeItem(SESSION_KEY);
};

const getAccessTokenFromResponse = (data: RefreshResponse) =>
  data.token || data.accessToken || "";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 15000,
});

let refreshPromise: Promise<string | null> | null = null;

const refreshAccessToken = async () => {
  const session = getStoredSession();

  if (!session?.refreshToken) {
    clearStoredSession();
    return null;
  }

  if (!refreshPromise) {
    refreshPromise = axios
      .post<RefreshResponse>(
        `${API_BASE_URL}${REFRESH_ENDPOINT}`,
        {
          refreshToken: session.refreshToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          timeout: 15000,
        },
      )
      .then((response) => {
        const nextToken = getAccessTokenFromResponse(response.data);

        if (!nextToken) {
          clearStoredSession();
          return null;
        }

        setStoredSession({
          ...session,
          token: nextToken,
          refreshToken: response.data.refreshToken || session.refreshToken,
        });

        return nextToken;
      })
      .catch(() => {
        clearStoredSession();
        return null;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

api.interceptors.request.use((config) => {
  const session = getStoredSession();

  if (session?.token) {
    config.headers.Authorization = `Bearer ${session.token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as typeof error.config &
      RetryableRequestConfig;
    const status = error.response?.status;

    if (status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      const nextToken = await refreshAccessToken();

      if (nextToken) {
        originalRequest.headers.Authorization = `Bearer ${nextToken}`;
        return api(originalRequest);
      }
    }

    if (status === 401) {
      clearStoredSession();
    }

    return Promise.reject(error);
  },
);

export default api;
