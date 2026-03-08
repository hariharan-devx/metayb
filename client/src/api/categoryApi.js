import { apiService } from "./apiService";

export const categoryApi = {
  getCategories: () => {
    return apiService.get("/category/list-category");
  },
};
