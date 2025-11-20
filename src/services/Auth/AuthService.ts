import api from "../api";

export const AuthService = {
  externalLogin: (provider: string) => {
    window.location.href = `${api.defaults.baseURL}/Auth/ExternalLogin/${provider}`;
  },

  login: async (email: string, password: string) => {
    const response = await api.post("/Auth/Login", { email, password });
    return response.data;
  },

  getUser: async () => {
    const response = await api.get("/Auth/GetUser");
    return response.data;
  },
};
