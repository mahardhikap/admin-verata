export const MenuDashboard = [
    {
        label:'Catalog',
        url:'/dashboard/catalog',
        key:'catalog'
    },
    {
        label:'Category',
        url:'/dashboard/category',
        key:'category'
    },
    {
        label:'Setting',
        url:'/dashboard/setting',
        key:'setting'
    },
]

  export const listSortBy = [
    {
      label: "Nama Produk",
      key: "product",
    },
    {
      label: "Kategori",
      key: "category",
    },
    {
      label: "Harga",
      key: "price",
    },
    {
      label: "Diskon",
      key: "disc",
    },
  ];

  export const quilModules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
      ["link"],
      [{ size: [] }],
      [{ color: [] }],
    ],
    clipboard: {
      matchVisual: false,
    },
  };
  
  export const quilFormats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "align",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "color",
  ];