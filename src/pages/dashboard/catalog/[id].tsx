import React, { useState, useEffect } from "react";
import Dashboard from "@/containers/dashboard.container";
import { CreateProductI } from "@/interfaces/catalog.interface";
import { updateProduct } from "@/api/catalog.api";
import { uploadFiles } from "@/api/upload-file.api";
import { toast } from "react-toastify";
import { categoryList } from "@/api/category.api";
import { CategoryListI } from "@/interfaces/category.interface";
import { useRouter } from "next/router";
import { detailProduct } from "@/api/catalog.api";
import { deleteFiles } from "@/api/upload-file.api";
import { IoClose } from "react-icons/io5";
import { extractFilename } from "@/utils/extract-file-name";
import withAuth from "@/utils/with-auth";
import Loading from "@/components/atomic/loading";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { quilFormats, quilModules } from "@/data/menu.data";

const CatalogDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
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
  const [loading, setLoading] = useState<boolean>(true);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);

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

  useEffect(() => {
    const fetchData = async (id: string) => {
      try {
        const detail = await detailProduct(id);
        setData(detail?.data);
        setFiles([]); // Clear any existing files state on new fetch
      } catch (error: any) {
        toast.error(error?.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData(id as string);
    }
  }, [id]);

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
    try {
      let imagePaths: string[] = [];
      if (files.length > 0) {
        const uploadResult = await uploadFiles(files);
        if (uploadResult) {
          imagePaths = uploadResult.filePaths;
        }
      }

      // Prepare updated data
      const updatedData = {
        ...data,
        image: [
          ...data.image.filter(
            (img) => !imagesToDelete.includes(extractFilename(img) as string)
          ),
          ...imagePaths,
        ],
      };

      const result = await updateProduct(id as string, updatedData); // Update instead of create
      if (result?.code === 200) {
        toast.success(result?.message);
        router.replace("/dashboard/catalog");
      } else {
        toast.warning(result?.message);
      }

      // If there are images to delete, handle deletion
      if (imagesToDelete.length > 0) {
        await deleteFiles(imagesToDelete);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length + files.length > 5) {
      toast.error("Maximum 3 images can be uploaded.");
      return;
    }
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleRemoveImage = (index: number) => {
    if (index < data.image.length) {
      // If removing an existing image
      const imageToDelete = extractFilename(data.image[index]);
      setImagesToDelete((prev) => [...prev, imageToDelete as string]); // Track for deletion
      setData((prevData) => ({
        ...prevData,
        image: prevData.image.filter((_, i) => i !== index),
      }));
    } else {
      // If removing an uploaded image
      setFiles((prevFiles) =>
        prevFiles.filter((_, i) => i !== index - data.image.length)
      );
    }
  };

  const totalImages = [...data.image, ...files];

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
              value={data?.product}
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
                  className="px-3 py-2 border-2 border-black"
                  value={data?.price ? data?.price : ''}
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
                  value={data?.disc ? data?.disc : ''}
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
                  value={data?.stock ? "Ada" : "Tidak Ada"}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
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
                  value={data?.category_id}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
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
            {totalImages.map((imgSrc, index) => (
              <div
                key={index}
                className="relative aspect-square h-40 w-40 bg-gray-300 flex items-center justify-center"
              >
                <img
                  src={
                    typeof imgSrc === "string"
                      ? imgSrc
                      : URL.createObjectURL(imgSrc)
                  }
                  alt={`Product Image ${index + 1}`}
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
            {totalImages.length < 5 && (
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
            Update Product
          </button>
        </div>
      )}
    </Dashboard>
  );
};

export default withAuth(CatalogDetail);
