import axios from "axios";

// const apiClient = axios.create({
//   baseURL: "http://localhost:8080/api",
// });

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL_BE + "/api" || "http://localhost:8080/api",
});

export const setupInterceptors = (setLoading) => {
  apiClient.interceptors.request.use((config) => {
    setLoading(true); // Set loading to true before request
    const token = localStorage.getItem("token");

    if (!config.headers["Authorization"]) {
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  });

  apiClient.interceptors.response.use(
    (response) => {
      setLoading(false); // Set loading to false after response
      return response;
    },
    (error) => {
      setLoading(false); // Set loading to false on error
      if (error.response.status === 403) {
        console.log("Access denied", error);
      }
      if (error.response.status === 401) {
        if (error.response.data.message === "JWT token has expired") {
          localStorage.removeItem("token");
          window.location.href = "/home";
        }
        console.log("Unauthorized", error);
      }
      return Promise.reject(error);
    }
  );
};
export default apiClient;
