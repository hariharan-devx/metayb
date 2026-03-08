import { apiService } from "./apiService";

export const orderApi = {
  createOrder: (data) => {
    return apiService.post("/order/create-order", data);
  },
  getMyOrders: async () => {
    return apiService.get("/order/my-orders");
  },

  getOrderDetails: async (id) => {
    return apiService.get(`/order/order/${id}`);
  },
};
