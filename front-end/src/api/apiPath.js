const apiPaths = {
  blogs: "/blogs",
  blogAdd: "/blog/add",
  getBlogById: (id) => `/blog/search/${id}`,
  getBlogImageById: (id) => `/blog/image/${id}`,

  login: "/auth/login",
  logout: "/auth/logout",

  register: "/user/register",
  verifyOtp: "/auth//user/verify-otp",
  initUserInfo: "/user/initUserInfo",

};

export default apiPaths;
