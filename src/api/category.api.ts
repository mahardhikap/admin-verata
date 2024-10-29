import axios from "axios";
import { toast } from "react-toastify";
import { CreateCategoryI } from "@/interfaces/category.interface";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export const categoryList = async () => {
  try {
    const response = await apiClient.get("/category/list");
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const createCategory = async (data: CreateCategoryI) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await apiClient.post("/category/create", data);
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const updateCategory = async (id: string, data: CreateCategoryI) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await apiClient.put(`/category/${id}/update`, data);
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const detailCategory = async (id: string) => {
  try {
    const response = await apiClient.get(`/category/${id}/detail`);
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await apiClient.delete(`/category/${id}/delete`);
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
  }
};
