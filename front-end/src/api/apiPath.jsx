const API_BASE_URL = "http://localhost:8080/api";

const apiPaths = {
  COMMENTS: `${API_BASE_URL}/comments`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/user/register`,
  USER_INFO: `${API_BASE_URL}/user/info`,
  SEND_OTP: `${API_BASE_URL}/auth/send-otp`,
};

export default apiPaths;
