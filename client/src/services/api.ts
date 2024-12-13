import axios from 'axios';
import { Product } from '../types';

const API_URL = 'http://localhost:5000/api';

export const productAPI = {
  getProducts: async (filters = {}) => {
    try {
      const response = await axios.get(`${API_URL}/products`, { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  getProduct: async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  addProduct: async (productData: Partial<Product>) => {
    try {
      const response = await axios.post(`${API_URL}/products`, productData);
      return response.data;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  },

  updateProduct: async (id: string, productData: Partial<Product>) => {
    try {
      const response = await axios.patch(`${API_URL}/products/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  deleteProduct: async (id: string) => {
    try {
      const response = await axios.delete(`${API_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },
};