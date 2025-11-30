export const APP_CONFIG = {
  api: {
    baseURL: import.meta.env.VITE_API_BASE_URL || "https://localhost:7043/Api/v1",
    timeout: Number(import.meta.env.VITE_TIMEOUT) || 10000,
  },
  auth: {
    externalCallbackUrl: import.meta.env.VITE_EXTERNAL_CALLBACK_URL,
  },
};
