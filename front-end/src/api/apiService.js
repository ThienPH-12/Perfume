import apiPaths from './apiPath';
import axios from 'axios';

export const login = async (username, password) => {
  const response = await axios.post(apiPaths.LOGIN, { username, password });
  if (response.status !== 200) {
    throw new Error('Login failed');
  }
  const data = response.data;
  return {
    token: data.accessToken,
    user: {
      id: data.userId,
      username: data.username,
      authority: data.authority,
    },
  };
};

export const getUserInfo = async (token) => {
  const response = await axios.get(apiPaths.CHECK_AUTH, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    throw new Error('Failed to fetch user info');
  }

  return response.data;
};

export const registerUser = (username, email, password, gender) => {
  return axios.post(apiPaths.REGISTER, { username, email, password, gender });
};

export const sendOtp = (email) => {
  return axios.post(apiPaths.SEND_OTP, { email });
};

export const verifyOtp = (email, otp) => {
  return axios.post(apiPaths.VERIFY_OTP, { email, otp });
};

export const saveUser = (username, email, password, gender) => {
  return axios.post(apiPaths.SAVE_USER, { username, email, password, gender });
};

export const initUserInfo = async (email) => {
  const response = await axios.get(apiPaths.INIT_USER_INFO, {
    params: { email },
  });

  if (response.status !== 200) {
    throw new Error('Failed to fetch user info');
  }

  return response.data;
};