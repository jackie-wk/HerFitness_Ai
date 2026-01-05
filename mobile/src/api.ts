import axios from 'axios';
import { UserProfile, WellnessPlan } from './types';

const API_URL = process.env.REACT_APP_API_URL || 'http://192.168.1.100:8000';

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const generateWellnessPlan = async (profile: UserProfile): Promise<WellnessPlan> => {
  try {
    const response = await api.post('/generate_plan', profile);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || error.message);
    }
    throw error;
  }
};

export const healthCheck = async (): Promise<boolean> => {
  try {
    const response = await api.get('/health');
    return response.data.status === 'ok';
  } catch {
    return false;
  }
};

export default api;
