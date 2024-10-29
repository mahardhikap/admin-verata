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
        label:'About',
        url:'/dashboard/about',
        key:'about'
    },
    {
        label:'Article',
        url:'/dashboard/article',
        key:'article'
    },
    {
        label:'Setting',
        url:'/dashboard/setting',
        key:'setting'
    },
]

export const CatalogDummy = [
    {
      id: 1,
      product: "Wallpaper 01",
      disc: 0,
      desc: "Lorem ipsum dolor sit amet adisplicing",
      price: 10000,
      image: [
        "https://fastly.picsum.photos/id/164/200/200.jpg?hmac=UA4QhIt441pdFJ6Uam2yCxzda_KjWgQgy8fYs_-NFEM",
      ],
      stock: true,
      category: 'Wallpaper'
    },
    {
      id: 2,
      product: "Wallpaper 02",
      disc: 0,
      desc: "Lorem ipsum dolor sit amet adisplicing",
      price: 12000,
      image: [],
      stock:true,
      category: 'Wallpaper'
    },
    {
      id: 3,
      product: "Wallpaper 03",
      disc: 4000,
      desc: "Lorem ipsum dolor sit amet adisplicing",
      price: 15000,
      image: [
        "https://picsum.photos/800/600",
        "https://picsum.photos/800/600",
        "https://picsum.photos/800/600",
      ],
      stock:false,
      category: 'Wallpaper'
    },
    {
      id: 4,
      product: "Wallpaper 04",
      disc: 1000,
      desc: "Lorem ipsum dolor sit amet adisplicing",
      price: 13000,
      image: [
        "https://picsum.photos/800/600",
        "https://picsum.photos/800/600",
        "https://picsum.photos/800/600",
      ],
      stock:true,
      category: 'Gordyn'
    },
    {
      id: 5,
      product: "Wallpaper 05",
      disc: 1000,
      desc: "Lorem ipsum dolor sit amet adisplicing",
      price: 13000,
      image: [
        "https://picsum.photos/800/600",
        "https://picsum.photos/800/600",
        "https://picsum.photos/800/600",
      ],
      stock:false,
      category: 'Gordyn'
    },
    {
      id: 6,
      product: "Wallpaper 06",
      disc: 1000,
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque aspernatur at iste voluptate eveniet nemo ex libero vitae doloremque, sunt recusandae nihil, illum iure vel, facilis consequatur inventore laboriosam ab. Ratione magnam nihil a totam provident odio id cupiditate? Enim laudantium sit asperiores maxime suscipit corrupti recusandae ipsum voluptates, quod quia porro ut obcaecati in velit omnis laboriosam accusantium aperiam! Totam, quibusdam mollitia consequuntur asperiores maiores expedita officiis illum corporis labore? Maxime ea id accusantium amet impedit, optio exercitationem! Minima, vel ab aspernatur placeat ipsum quibusdam. Optio tenetur molestiae impedit. Illum, iusto tenetur. Eum eos ea, architecto culpa accusamus aspernatur quae pariatur ratione? Eveniet eligendi assumenda alias natus doloremque iste dicta quisquam, fuga nisi asperiores sequi officia voluptas maiores autem. Nisi sunt maiores, optio tenetur quaerat quis numquam provident possimus adipisci aperiam minima officiis, totam veritatis. Saepe, reiciendis exercitationem! Incidunt harum perferendis non assumenda? Esse consequuntur omnis dolorum nemo nihil.",
      price: 13000,
      image: [
        "https://picsum.photos/800/600",
        "https://picsum.photos/800/600",
        "https://picsum.photos/800/600",
      ],
      stock:true,
      category: 'Carpet'
    },
    {
      id: 7,
      product: "Wallpaper 07",
      disc: 0,
      desc: "Lorem ipsum dolor sit amet adisplicing",
      price: 30000,
      image: [],
      stock:true,
      category: 'Gordyn'
    },
    {
      id: 8,
      product: "Wallpaper 08",
      disc: 0,
      desc: "Lorem ipsum dolor sit amet adisplicing",
      price: 25000,
      image: [],
      stock:true,
      category: 'Flooring'
    },
    {
      id: 9,
      product: "Wallpaper 09",
      disc: 11000,
      desc: "Lorem ipsum dolor sit amet adisplicing",
      price: 23000,
      image: [],
      stock:true,
      category: 'Flooring'
    },
    {
      id: 10,
      product: "Wallpaper 10",
      disc: 0,
      desc: "Lorem ipsum dolor sit amet adisplicing",
      price: 12000,
      image: [
        "https://fastly.picsum.photos/id/164/200/200.jpg?hmac=UA4QhIt441pdFJ6Uam2yCxzda_KjWgQgy8fYs_-NFEM",
      ],
      stock:true,
      category: 'Flooring'
    },
    {
      id: 11,
      product: "Wallpaper 11",
      disc: 0,
      desc: "Lorem ipsum dolor sit amet adisplicing",
      price: 14000,
      image: [
        "https://fastly.picsum.photos/id/164/200/200.jpg?hmac=UA4QhIt441pdFJ6Uam2yCxzda_KjWgQgy8fYs_-NFEM",
      ],
      stock:true,
      category: 'Flooring'
    },
    {
      id: 12,
      product: "Wallpaper 12",
      disc: 500,
      desc: "Lorem ipsum dolor sit amet adisplicing",
      price: 16000,
      image: [
        "https://fastly.picsum.photos/id/164/200/200.jpg?hmac=UA4QhIt441pdFJ6Uam2yCxzda_KjWgQgy8fYs_-NFEM",
      ],
      stock:true,
      category: 'Furniture'
    },
  ];

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