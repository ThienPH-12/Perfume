const apiPaths = {
  blogs: "/blogs",
  blogAdd: "/blog/add",
  getBlogById: (id) => `/blog/search/${id}`,
  getBlogImageById: (id) => `/blog/image/${id}`,

  productSave: "/product", // Unified for add/update
  deleteProduct: (id) => `/product/${id}`,
  getAllProducts: "/products",
  getProductById: (id) => `/product/search/${id}`,
  getProductImageById: (id) => `/product/image/${id}`,
  getProductsByCategory: (categoryId) => `/products/category/${categoryId}`,

  capacitySave: "/capacity", // Unified for add/update
  deleteCapacity: (id) => `/capacity/${id}`,
  getAllCapacities: "/capacities",

  login: "/auth/login",
  logout: "/auth/logout",

  register: "/user/register", // Added field
  activateUser: "/user/activateUser", // Added field
  initUserInfo: "/user/initUserInfo", // Already existing, kept as is
  resendActivation: "/user/resendActivation", // Added field

  mixProductSave: "/mixProduct", // Updated from sellProductSave
  deleteMixProduct: (id) => `/mixProduct/${id}`, // Updated from deleteSellProduct
  getAllMixProducts: "/mixProducts", // Updated from getAllSellProducts
  getMixProductImageByCompIds: (compIds) => `/mixProduct/image/${compIds}`, // New API path
  getMixProductByCompIds: (compIds) => `/mixProduct/search?compIds=${compIds}`, // New API path

  priceSave: "/price", // Unified for add/update
  deletePrice:"/price",
  getAllPrices: "/prices",
  getPriceById: "/price/search",
  getPriceListByProductId: (productId) => `/price/list/${productId}`,

  categorySave: "/category", // Unified for add/update
  deleteCategory: (id) => `/category/${id}`,
  getAllCategories: "/categories",
  getCategoryById: (id) => `/category/${id}`,

  payment: "/createPayment", // Unified for add/update
  deleteOrder: (id) => `/order/${id}`,
  getAllOrders: "/orders",
  getOrderById: (id) => `/order/${id}`,
};

export default apiPaths;
