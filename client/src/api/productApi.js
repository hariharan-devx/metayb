import { apiService } from "./apiService";

export const productApi = {
  getProducts: () => {
    return apiService.get("/product/list-product");
  },

  getProductsByCategory: (categoryId) => {
    return apiService.get(`/product/list-product-by-category/${categoryId}`);
  },
};
