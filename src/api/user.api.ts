import axios from 'axios';
import { toast } from 'react-toastify';
import { UserLoginI } from '@/interfaces/user.interface';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export const loginUser = async (data:UserLoginI) => {
  try {
    const response = await apiClient.post('/user/login', data);
    return response.data;
  } catch (error:any) {
    toast.error(error.message)
  }
};

export const getProducts = async (endpoint: string) => {
  try {
    const token = localStorage.getItem('token'); // Ambil token dari local storage

    // Atur header Authorization jika token ada
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
    throw error; // Penting untuk melempar ulang error jika ingin ditangani di tempat lain
  }
};