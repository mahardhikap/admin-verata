import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_UPLOAD_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export const uploadFiles = async (files: File[]) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const formData = new FormData();
    files.forEach(file => {
      formData.append("image", file);
    });

    const response = await apiClient.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.data && response.data.message && response.data.filePaths) {
      return response.data;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
};


export const deleteFiles = async (filenames: string[]) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    const response = await apiClient.delete("/delete", {
      data: {
        filenames: filenames,
      },
    });

    if (response.data && response.data.deletedFiles) {
      return response.data;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
};