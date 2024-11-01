import React, { useEffect, useState } from "react";
import Dashboard from "@/containers/dashboard.container";
import { toast } from "react-toastify";
import { updateCategory, detailCategory } from "@/api/category.api";
import { useRouter } from "next/router";
import { CreateCategoryI } from "@/interfaces/category.interface";
import withAuth from "@/utils/with-auth";
import Loading from "@/components/atomic/loading";

const DetailCategory: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState<CreateCategoryI>({
    name: "",
  });
  const [loading, setLoading] = useState<boolean>(true);

  const handleInitialData = async () => {
    try {
      setLoading(true);
      const response = await detailCategory(id as string);
      setData({ name: response?.data?.name });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCategory = async () => {
    setLoading(true);
    try {
      const response = await updateCategory(id as string, data);
      if (response?.code === 200) {
        toast.success(response?.message);
        router.replace("/dashboard/category");
      } else {
        toast.warning(response?.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleInitialData();
  }, []);

  return (
    <Dashboard>
      {loading ? (
        <Loading />
      ) : (
        <div className="py-2 px-3">
          <div className="mb-2">Category Name</div>
          <div className="w-full">
            <div className="flex flex-row gap-5">
              <input
                type="text"
                name="product"
                className="px-3 py-2 border-2 border-black w-2/3"
                value={data?.name}
                onChange={(e) => setData({ name: e.target.value })}
              />
              <button
                className="py-2 bg-[#919295] text-lg text-white font-semibold w-1/3"
                onClick={handleUpdateCategory}
              >
                Update Category
              </button>
            </div>
          </div>
        </div>
      )}
    </Dashboard>
  );
};

export default withAuth(DetailCategory);
