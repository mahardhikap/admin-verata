import React, { useState } from "react";
import Dashboard from "@/containers/dashboard.container";
import { createCategory } from "@/api/category.api";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const CreateCategory: React.FC = () => {
  const router = useRouter();
  const [categoryName, setCategoryName] = useState("");

  const handleCreateCategory = async () => {
    try {
      const response = await createCategory({ name: categoryName });
      if (response?.code === 201) {
        toast.success(response?.message);
        setCategoryName("");
        router.replace('/dashboard/category')
      } else {
        toast.warning(response?.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Dashboard>
      <div className="py-2 px-3">
        <div className="mb-2">Category Name</div>
        <div className="w-full">
          <div className="flex flex-row gap-5">
            <input
              type="text"
              name="category"
              className="px-3 py-2 border-2 border-black w-2/3"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <button
              className="py-2 bg-[#919295] text-lg text-white font-semibold w-1/3"
              onClick={handleCreateCategory}
            >
              Create Category
            </button>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default CreateCategory;
