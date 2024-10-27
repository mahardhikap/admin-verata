import React, { useState } from "react";
import Dashboard from "@/containers/dashboard.container";
import { CatalogDummy } from "@/data/menu.data";
import Pagination from "@/components/atomic/pagination";
import { MdAddBox } from "react-icons/md";
import { FaArrowDownAZ, FaArrowUpAZ } from "react-icons/fa6";
import { useRouter } from "next/router";

const Catalog: React.FC = () => {
  const router = useRouter()
  const [filterOrderList, setFilterOrderList] = useState<boolean>(false);
  return (
    <Dashboard>
      <div className="overflow-y-auto h-screen">
        <div className="flex justify-between m-5">
          <div className="flex items-center gap-5">
            <input
              placeholder="search..."
              className="px-2 py-1 outline-none border-2 border-[#919295] text-gray-600"
            />
            <div className="border-2 border-[#919295] px-2 py-1">
              <select
                name="wallpaper"
                id="wallpaper"
                className="outline-none text-gray-600"
              >
                <option value="">Search By</option>
                <option value="wallpaper1">Wallpaper 1</option>
                <option value="wallpaper2">Wallpaper 2</option>
              </select>
            </div>
            <button
              onClick={() => setFilterOrderList(!filterOrderList)}
            >
              {filterOrderList ? (
                <FaArrowUpAZ size={30} className="text-[#919295]" />
              ) : (
                <FaArrowDownAZ size={30} className="text-[#919295]" />
              )}
            </button>
          </div>
          <button>
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
            {CatalogDummy.slice(0, 10).map((item, i) => {
              return (
                <tr
                  className="border-b border-gray-300 hover:bg-gray-100"
                  key={i}
                >
                  <td className="py-3 px-6">{item.id}</td>
                  <td className="py-3 px-6">
                    {item.product.split("").length > 40
                      ? `${item.product.slice(0, 40) + "..."}`
                      : item.product}
                  </td>
                  <td className="py-3 px-6">{item.disc}</td>
                  <td className="py-3 px-6">
                    {item.desc.split("").length > 100
                      ? `${item.desc.slice(0, 100) + "..."}`
                      : item.desc}
                  </td>
                  <td className="py-3 px-6">{item.price}</td>
                  <td className="py-3 px-6">{item.stock ? "Ada" : "Kosong"}</td>
                  <td className="py-3 px-6">{item.category}</td>
                  <td className="py-3 px-6 flex flex-col items-center justify-center">
                    <button className="text-blue-600 hover:underline" onClick={()=>router.push(`/dashboard/catalog/${item.id}`)}>
                      Edit
                    </button>
                    <button className="text-red-600 hover:underline ml-2">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="my-5 flex justify-center">
          <Pagination />
        </div>
      </div>
    </Dashboard>
  );
};

export default Catalog;
