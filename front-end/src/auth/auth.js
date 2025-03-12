export const isAuthenticated = () => {
  // Implement the logic to check if the user is authenticated
  // For example, check if a token exists in localStorage
  return !!localStorage.getItem('token');
};

export const setToken = (token) => {
  // Implement the logic to set the token
  // For example, save the token to localStorage
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  // Implement the logic to remove the token
  // For example, remove the token from localStorage
  localStorage.removeItem('token');
};

export const getToken = () => {
  // Implement the logic to get the token
  return localStorage.getItem('token');
};

function base64UrlDecode(base64Url) {
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return Buffer.from(base64, 'base64').toString('utf-8');
}

function decodeJWT(jwtToken) {
  const parts = jwtToken.split('.');
  
  if (parts.length !== 3) {
    throw new Error('Invalid JWT token');
  }

  const header = base64UrlDecode(parts[0]);
  const payload = base64UrlDecode(parts[1]);
  const signature = parts[2]; // Signature can't be decoded without verifying.

  return {
    header: JSON.parse(header),
    payload: JSON.parse(payload),
    signature: signature
  };
}

export const getUserInfoFromToken = () => {
  const token = getToken();
  if (!token) {
    return null;
  }

  try {
    const { payload } = decodeJWT(token);
    return {
      username: payload.username,
      exp: payload.exp
    };
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};