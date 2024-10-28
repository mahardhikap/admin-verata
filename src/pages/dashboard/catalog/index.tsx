import React, { useEffect, useState } from "react";
import Dashboard from "@/containers/dashboard.container";
import Pagination from "@/components/atomic/pagination";
import { MdAddBox } from "react-icons/md";
import { FaArrowDownAZ, FaArrowUpAZ } from "react-icons/fa6";
import { useRouter } from "next/router";
import { listProductFilter, deleteProduct, detailProduct } from "@/api/catalog.api";
import {
  CatalogParamsI,
  FilterCatalogResI,
} from "@/interfaces/catalog.interface";
import { toast } from "react-toastify";
import { listSortBy } from "@/data/menu.data";
import { deleteFiles } from "@/api/upload-file.api";
import { extractFilename } from "@/utils/extract-file-name";

const Catalog: React.FC = () => {
  const router = useRouter();
  const [filterOrderList, setFilterOrderList] = useState<boolean>(false);
  const [params, setParams] = useState<CatalogParamsI>({
    limit: 10,
    page: 1,
    search: "",
    searchby: "product",
    sortby: "created_at",
    sort: filterOrderList ? "ASC" : "DESC",
  });
  const [products, setProducts] = useState<FilterCatalogResI | undefined>(
    undefined
  );
  const [searchInput, setSearchInput] = useState<string>("");

  const fetchDataProduct = async () => {
    try {
      const response = await listProductFilter(params);
      setProducts(response?.data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDataProduct();
  }, [params]);

  const handlePageChange = (newPage: number) => {
    setParams((prev) => ({ ...prev, page: newPage }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setParams((prev) => ({ ...prev, search: searchInput, page: 1 })); // reset to first page
    }
  };
  const handleSortToggle = () => {
    setFilterOrderList((prev) => !prev);
    setParams((prev) => ({
      ...prev,
      sort: filterOrderList ? "ASC" : "DESC"
    }));
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const detail = await detailProduct(id);
      if (detail?.code === 200) {
        const imagesToDelete = detail?.data?.image?.map(extractFilename);
        await deleteFiles(imagesToDelete);
        const response = await deleteProduct(id);
        if (response?.code === 204) {
          toast.success(response?.message);
          fetchDataProduct();
        } else {
          toast.warning(response?.message);
        }
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  

  return (
    <Dashboard>
      <div className="overflow-y-auto h-screen">
        <div className="flex justify-between m-5">
          <div className="flex items-center gap-5">
            <input
              placeholder="search product..."
              className="px-2 py-1 outline-none border-2 border-[#919295] text-black"
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
            />
            <div className="border-2 border-[#919295] px-2 py-1">
              <select
                name="sortby"
                id="sortby"
                className="outline-none text-black"
                onChange={(e) =>
                  setParams((prev) => ({
                    ...prev,
                    sortby: e.target.value,
                    page: 1,
                  }))
                }
              >
                <option value="" disabled selected>
                  Select Category
                </option>
                {listSortBy.map((category, i) => (
                  <option key={i} value={category.key}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={handleSortToggle}>
              {filterOrderList ? (
                <FaArrowUpAZ size={30} className="text-[#919295]" />
              ) : (
                <FaArrowDownAZ size={30} className="text-[#919295]" />
              )}
            </button>
          </div>
          <button onClick={()=>router.push('/dashboard/catalog/create')}>
            <MdAddBox size={40} className="text-[#919295]" />
          </button>
        </div>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">id</th>
              <th className="py-3 px-6 text-left">product</th>
              <th className="py-3 px-6 text-left">discount</th>
              <th className="py-3 px-6 text-left">description</th>
              <th className="py-3 px-6 text-left">price</th>
              <th className="py-3 px-6 text-left">stock</th>
              <th className="py-3 px-6 text-left">category</th>
              <th className="py-3 px-6 text-left">actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {products?.list?.map((item) => (
              <tr
                className="border-b border-gray-300 hover:bg-gray-100"
                key={item.id}
              >
                <td className="py-3 px-6">{item.id}</td>
                <td className="py-3 px-6">{item.product}</td>
                <td className="py-3 px-6">{item.disc}</td>
                <td className="py-3 px-6">{item.description}</td>
                <td className="py-3 px-6">{item.price}</td>
                <td className="py-3 px-6">{item.stock ? "Ada" : "Kosong"}</td>
                <td className="py-3 px-6">{item.category}</td>
                <td className="py-3 px-6 flex flex-col items-center justify-center">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => router.push(`/dashboard/catalog/${item.id}`)}
                  >
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline ml-2" onClick={()=>handleDeleteProduct(item.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="my-5 flex justify-center">
          <Pagination
            totalPage={products?.pagination?.totalPage || 1}
            pageNow={params.page}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </Dashboard>
  );
};

export default Catalog;
