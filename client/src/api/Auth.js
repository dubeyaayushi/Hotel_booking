import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

// Register user
const register = async (userData) => {
   console.log("Data being sent:", userData);
  const response = await axios.post(`${API_URL}/register`, userData);
  
  if (response.data) {
     localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  
  if (response.data) {
     localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

// Get current user
const getMe = async () => {
  const response = await axios.get(`${API_URL}/me`);
  return response.data.user;
};



// Logout user
const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

const authService = {
  register,
  login,
  logout,
  getMe
};

export default authService;