import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext.jsx'
import axios from 'axios';

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});


// // Import your Publishable Key
// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// if (!PUBLISHABLE_KEY) {
//   throw new Error('Add your Clerk Publishable Key to the .env file')
// }

createRoot(document.getElementById('root')).render(
   <AuthProvider>
     <BrowserRouter>
       <App />
     </BrowserRouter>
   </AuthProvider>
)
