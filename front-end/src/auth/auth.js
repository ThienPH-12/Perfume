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
