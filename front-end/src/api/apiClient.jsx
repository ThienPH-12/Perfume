import axios from "axios";
import apiPaths from "./apiPath";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    'Access-Control-Allow-Origin': '*',
    "Content-Type": "application/json",
    "Referrer-Policy": "strict-origin-when-cross-origin", // Added header
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export function logout() {
  delete apiClient.defaults.headers.common["Authorization"];
  localStorage.removeItem("token");
}

export function registerUser(username, email, password, gender) {
  return apiClient.post(apiPaths.register, {
    username,
    email,
    password,
    gender,
  });
}

export function sendOtp(email) {
  return apiClient.post(apiPaths.sendotp, { email });
}

export function verifyOtp(email, otp) {
  return apiClient.post(apiPaths.verifyOtp, { email, otp });
}

export async function initUserInfo(username) {
  const response = await apiClient.get(apiPaths.initUserInfo, {
    params: { username },
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch user info");
  }

  return response.data;
}

export default apiClient;
