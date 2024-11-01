import axios from "axios";
import { toast } from "react-toastify";
import { UserLoginI } from "@/interfaces/user.interface";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export const loginUser = async (data: UserLoginI) => {
  try {
    const response = await apiClient.post("/user/login", data);
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const detailUser = async () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await apiClient.get("/user/detail");
    return response.data;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const updateUser = async (id: string, data: { password: string }) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await apiClient.put(`/user/${id}/update`, data);
    return response.data;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const createUser = async (data: { username: string, password:string }) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await apiClient.post(`/user/create`, data);
    return response.data;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const userList = async () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await apiClient.get("/user/list");
    return response.data;
  } catch (error: any) {
    console.error(error.message);
  }
};
