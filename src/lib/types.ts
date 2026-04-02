export type StoredSession = {
  token: string;
  email: string;
  refreshToken?: string;
};

export type RefreshResponse = {
  token?: string;
  accessToken?: string;
  refreshToken?: string;
};

export type RetryableRequestConfig = {
  _retry?: boolean;
};
