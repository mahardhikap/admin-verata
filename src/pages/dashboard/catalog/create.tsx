import React, { useState, useEffect } from "react";
import Dashboard from "@/containers/dashboard.container";
import { CreateProductI } from "@/interfaces/catalog.interface";
import { createProduct } from "@/api/catalog.api";
import { uploadFiles } from "@/api/upload-file.api";
import { toast } from "react-toastify";
import { categoryList } from "@/api/category.api";
import { CategoryListI } from "@/interfaces/category.interface";
import { useRouter } from "next/router";
import { deleteFiles } from "@/api/upload-file.api";
import { extractFilename } from "@/utils/extract-file-name";
import { IoClose } from "react-icons/io5";
import withAuth from "@/utils/with-auth";
import Loading from "@/components/atomic/loading";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { quilFormats, quilModules } from "@/data/menu.data";

const CatalogCreate: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<CreateProductI>({
    product: "",
    disc: 0,
    description: "",
    price: 0,
    image: [],
    stock: true,
    category_id: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [listCategory, setListCategory] = useState<CategoryListI[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategoryList = async () => {
      try {
        const categories = await categoryList();
        setListCategory(categories?.data || []);
      } catch (error: any) {
        toast.error(error?.message);
      }
    };

    fetchCategoryList();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: name === "disc" || name === "price" ? Number(value) : value,
      stock: name === "stock" ? value === "Ada" : prevData.stock,
      category_id: name === "category" ? value : prevData.category_id,
    }));
  };

  const handlePostProduct = async () => {
    let imagePaths: string[] = [];
    try {
      setLoading(true);
      if (files.length > 0) {
        const uploadResult = await uploadFiles(files);
        if (uploadResult) {
          imagePaths = uploadResult.filePaths;
          setData((prevData) => ({
            ...prevData,
            image: imagePaths,
          }));
        }
      }
      const result = await createProduct({ ...data, image: imagePaths });
      if (result?.code === 201) {
        toast.success(result?.message);
        router.replace("/dashboard/catalog");
      } else {
        toast.warning(result?.message);
        const filenamesToDelete = imagePaths
          .map(extractFilename)
          .filter((filename): filename is string => filename !== null);
        await deleteFiles(filenamesToDelete);
      }
    } catch (error: any) {
      toast.error(error?.message);
      if (imagePaths.length > 0) {
        const filenamesToDelete = imagePaths
          .map(extractFilename)
          .filter((filename): filename is string => filename !== null);
        await deleteFiles(filenamesToDelete);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length + files.length > 3) {
      toast.error("Maximum 3 images can be uploaded.");
      return;
    }
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleRemoveImage = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <Dashboard>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-5 p-3">
          <div className="flex flex-col gap-2">
            <div>Product Name</div>
            <input
              type="text"
              name="product"
              className="px-3 py-2 border-2 border-black"
              value={data.product}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <div className="flex flex-wrap xl:flex-row gap-3">
              <div className="flex flex-col gap-2">
                <div>Price</div>
                <input
                  min="0"
                  type="number"
                  pattern="[0-9]"
                  name="price"
                  value={data.price ? data.price : ""}
                  className="px-3 py-2 border-2 border-black"
                  onChange={handleInputChange}
                  onKeyPress={(e) => {
                    if (e.key === "." || e.key === "," || e.key === "-") {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <div>Discount</div>
                <input
                  min="0"
                  type="number"
                  pattern="[0-9]"
                  name="disc"
                  className="px-3 py-2 border-2 border-black"
                  value={data.disc ? data.disc : ''}
                  onChange={handleInputChange}
                  onKeyPress={(e) => {
                    if (e.key === "." || e.key === "," || e.key === "-") {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <div>Stock</div>
                <select
                  name="stock"
                  className="border-2 border-black px-3 py-2"
                  onChange={handleInputChange}
                >
                  <option value="" disabled selected>
                    Select Stock
                  </option>
                  <option value="Ada">Ada</option>
                  <option value="Tidak Ada">Tidak Ada</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <div>Category</div>
                <select
                  name="category"
                  className="border-2 border-black px-3 py-2"
                  onChange={handleInputChange}
                >
                  <option value="" disabled selected>
                    Select Category
                  </option>
                  {listCategory?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>Description</div>
            <ReactQuill
              value={data.description}
              onChange={(value) => setData({ ...data, description: value })}
              className="border-2 border-black h-60 overflow-y-auto"
              modules={quilModules}
              formats={quilFormats}
            />
          </div>
          <div className="flex flex-row items-center gap-4">
            {files.map((file, index) => (
              <div
                key={index}
                className="relative aspect-square h-40 w-40 bg-gray-300 flex items-center justify-center"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="object-cover h-full w-full"
                />
                <button
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                  onClick={() => handleRemoveImage(index)}
                >
                  <IoClose />
                </button>
              </div>
            ))}
            {files.length < 3 && (
              <>
                <input
                  type="file"
                  multiple
                  onChange={handleUploadImage}
                  className="hidden"
                  id="fileUpload"
                />
                <label
                  htmlFor="fileUpload"
                  className="aspect-square h-40 w-40 bg-gray-300 flex items-center justify-center text-4xl font-semibold cursor-pointer"
                >
                  +
                </label>
              </>
            )}
          </div>
          <button
            className="py-2 bg-[#919295] text-lg text-white font-semibold"
            onClick={handlePostProduct}
          >
            Create Product
          </button>
        </div>
      )}
    </Dashboard>
  );
};

export default withAuth(CatalogCreate);
