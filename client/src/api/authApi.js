import { apiService } from "./apiService";

export const authApi = {
  login: (data) => {
    return apiService.post("/auth/login", data);
  },

  signup: (data) => {
    return apiService.post("/auth/signup", data);
  },
  logout: () => {
    return apiService.post("/auth/logout");
  },
};
