import { apiService } from "./apiService";

export const cartApi = {
  addToCart: (data) => {
    return apiService.post("/cart/add-to-cart", data);
  },
  getCart: () => {
    return apiService.get("/cart/get-cart");
  },
  updateQuantity: (data) => {
    return apiService.put("/cart/update-cart", data);
  },

  removeItem: (cartId) => {
    return apiService.delete(`/cart/delete-cart/${cartId}`);
  },
};
