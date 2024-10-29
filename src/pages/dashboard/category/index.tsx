import React, { useEffect, useState } from "react";
import Dashboard from "@/containers/dashboard.container";
import { MdAddBox } from "react-icons/md";
import { useRouter } from "next/router";
import { categoryList, deleteCategory } from "@/api/category.api";
import { CategoryListI } from "@/interfaces/category.interface";
import { toast } from "react-toastify";
import { truncateText } from "@/utils/truncate-text";
import withAuth from "@/utils/with-auth";
import Loading from "@/components/atomic/loading";

const Category: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<CategoryListI[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const handleGetListCategory = async () => {
    try {
      const response = await categoryList();
      setData(response?.data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const response = await deleteCategory(id);
      if (response?.code === 204) {
        toast.success(response?.message);
        await handleGetListCategory();
      } else {
        toast.warning(response?.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    handleGetListCategory();
  }, []);

  return (
    <Dashboard>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex justify-end p-3">
            <button onClick={() => router.push("/dashboard/category/create")}>
              <MdAddBox size={40} className="text-[#919295]" />
            </button>
          </div>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left w-1/4">id</th>
                <th className="py-3 px-6 text-left w-1/2">category</th>
                <th className="py-3 px-6 w-1/4 text-center">actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {data?.map((item, i) => {
                return (
                  <tr
                    className="border-b border-gray-300 hover:bg-gray-100"
                    key={i}
                  >
                    <td className="py-3 px-6">{truncateText(item.id, 3)}</td>
                    <td className="py-3 px-6">{item.name}</td>
                    <td className="py-3 px-6 flex justify-center items-center">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() =>
                          router.push(`/dashboard/category/${item.id}`)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:underline ml-2"
                        onClick={() => handleDeleteCategory(item.id)}
                        hidden
                        disabled
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </Dashboard>
  );
};

export default withAuth(Category);
