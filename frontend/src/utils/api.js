import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Contract API calls
export const contractAPI = {
  generate: async (description) => {
    try {
      const response = await api.post('/contracts/generate', { description });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

// Flow blockchain API calls
export const flowAPI = {
  deploy: async (contract, name) => {
    try {
      const response = await api.post('/flow/deploy', { contract, name });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getAccount: async (address) => {
    try {
      const response = await api.get(`/flow/account/${address}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

// Health check
export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export default api;

