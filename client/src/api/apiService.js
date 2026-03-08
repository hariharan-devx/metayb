import axiosClient from "./axiosClient";

export const apiService = {
  get: async (url) => {
    try {
      const response = await axiosClient.get(url);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  post: async (url, data) => {
    try {
      const response = await axiosClient.post(url, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  put: async (url, data) => {
    try {
      const response = await axiosClient.put(url, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  delete: async (url) => {
    try {
      const response = await axiosClient.delete(url);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};
