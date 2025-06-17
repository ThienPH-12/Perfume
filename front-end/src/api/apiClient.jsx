import axios from "axios";
import apiPaths from "./apiPath";

// const apiClient = axios.create({
//   baseURL: "http://localhost:8080/api",

// });
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api",
});

apiClient.interceptors.request.use((config) => {
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
    return response;
  },
  (error) => {
    if (error.response.status === 403) {
      console.log("Access denied", error);
      
    }
    if (error.response.status === 401) {
      console.log("Unauthorized", error);
    }
    return Promise.reject(error);
  }
);

export async function registerUser(username, email, password, gender) {
  try {
    const response = await apiClient.post(apiPaths.register, {
      username,
      email,
      password,
      gender,
    });
    return response.data;
  } catch (error) {
    console.error("User registration failed", error);
    throw error;
  }
}

export async function verifyOtp(email, otp) {
  try {
    const response = await apiClient.post(apiPaths.verifyOtp, { email, otp });
    return response.data;
  } catch (error) {
    console.error("OTP verification failed", error);
    throw error;
  }
}

export async function initUserInfo(username) {
  try {
    const response = await apiClient.get(apiPaths.initUserInfo, {
      params: { username },
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch user info");
    }

    return response.data;
  } catch (error) {
    console.error("Fetching user info failed", error);
    throw error;
  }
}

export async function addBlog(blogData) {
  try {
    const response = await apiClient.post(apiPaths.blogAdd, blogData);
    return response.data;
  } catch (error) {
    console.error("Adding blog failed", error);
    throw error;
  }
}

export default apiClient;
