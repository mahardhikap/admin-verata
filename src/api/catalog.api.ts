import axios from "axios";
import { toast } from "react-toastify";
import { CreateProductI, CatalogParamsI } from "@/interfaces/catalog.interface";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export const createProduct = async (data: CreateProductI) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await apiClient.post("/product/create", data);
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const updateProduct = async (id: string, data: CreateProductI) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await apiClient.put(`/product/${id}/update`, data);
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const listProductFilter = async (params: CatalogParamsI) => {
  try {
    const response = await apiClient.get("/product/filtered", { params });
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const detailProduct = async (id: string) => {
  try {
    const response = await apiClient.get(`/product/${id}/detail`);
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await apiClient.delete(`/product/${id}/delete`);
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
  }
};
