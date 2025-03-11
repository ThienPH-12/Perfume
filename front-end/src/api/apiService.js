import apiPaths from './apiPath';
import axios from 'axios';

export const login = async (username, password) => {
  const response = await fetch(apiPaths.LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();
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
  const response = await fetch(apiPaths.USER_INFO, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user info');
  }

  return response.json();
};

export const registerUser = (username, email, password, gender) => {
  return axios.post('/api/auth/register', { username, email, password, gender }); // Corrected endpoint
};

export const sendOtp = (email) => {
  return axios.post('/api/auth/send-otp', { email }); // Corrected endpoint
};

export const verifyOtp = (email, otp) => {
  return axios.post('/api/auth/verify-otp', { email, otp }); // Corrected endpoint
};

export const saveUser = (username, email, password, gender) => {
  return axios.post('/api/auth/save-user', { username, email, password, gender }); // Corrected endpoint
};