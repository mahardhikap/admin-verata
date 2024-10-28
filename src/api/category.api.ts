import axios from "axios";
import { toast } from "react-toastify";

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