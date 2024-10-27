import React from "react";
import Dashboard from "@/containers/dashboard.container";

const CatalogDetail: React.FC = () => {
  return (
    <Dashboard>
      <div className="flex flex-col gap-5 p-3">
        <div className="flex flex-col gap-2">
          <div>Product</div>
          <input type="text" className="px-3 py-2 border-2 border-black" />
        </div>
        <div>
          <div className="flex flex-row gap-3">
            <div className="flex flex-col gap-2">
              <div>Price</div>
              <input type="text" className="px-3 py-2 border-2 border-black" />
            </div>
            <div className="flex flex-col gap-2">
              <div>Discount</div>
              <input type="text" className="px-3 py-2 border-2 border-black" />
            </div>
            <div className="flex flex-col gap-2">
              <div>Stock</div>
              <div className="border-2 border-black px-3 py-2">
                <select
                  name="wallpaper"
                  id="wallpaper"
                  className="outline-none text-black"
                >
                  <option value="" disabled selected>
                    Stock
                  </option>
                  <option value="wallpaper1">Ada</option>
                  <option value="wallpaper2">Tidak Ada</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>Category</div>
              <div className="border-2 border-black px-3 py-2">
                <select
                  name="wallpaper"
                  id="wallpaper"
                  className="outline-none text-black"
                >
                  <option value="" disabled selected>
                    Select Category
                  </option>
                  <option value="wallpaper1">Wallpaper 1</option>
                  <option value="wallpaper2">Wallpaper 2</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div>Description</div>
          <textarea
            name=""
            id=""
            className="px-3 py-2 border-2 border-black h-72"
          ></textarea>
        </div>
        <div className="flex flex-row items-center gap-4">
          <div className="aspect-square h-40 w-40 bg-gray-500"></div>
          <div className="aspect-square h-40 w-40 bg-gray-500"></div>
          <div className="aspect-square h-40 w-40 bg-gray-500"></div>
          <button className="aspect-square h-40 w-40 bg-gray-300 flex items-center justify-center text-4xl font-semibold">+</button>
        </div>
      </div>
    </Dashboard>
  );
};

export default CatalogDetail;
