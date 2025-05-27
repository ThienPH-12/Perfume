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

  capacitySave: "/capacity", // Unified for add/update
  deleteCapacity: (id) => `/capacity/${id}`,
  getAllCapacities: "/capacities",

  login: "/auth/login",
  logout: "/auth/logout",

  sendOtp: "/user/sendOtp",
  saveUser: "/user/saveUser",
  initUserInfo: "/user/initUserInfo",

};

export default apiPaths;
