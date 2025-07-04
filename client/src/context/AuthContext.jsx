// // import { createContext, useContext, useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';

// // const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);
// //   const [token, setToken] = useState(localStorage.getItem('token'));
// //   const navigate = useNavigate();

// //   const login = async (credentials) => {
// //     const res = await axios.post('/api/auth/login', credentials);
// //     localStorage.setItem('token', res.data.token);
// //     setToken(res.data.token);
// //     setUser(res.data.user);
// //   };

// //   const logout = () => {
// //     localStorage.removeItem('token');
// //     setToken(null);
// //     setUser(null);
// //     navigate('/login');
// //   };

// //   return (
// //     <AuthContext.Provider value={{ user, token, login, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => useContext(AuthContext);


// import { createContext, useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import authService from '../api/Auth'; // Adjust the import path as necessary
// import axios from 'axios';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem('token'));
//   const [ loading, setLoading ] = useState(true);

//    const navigate = useNavigate();

//     useEffect(() => {
//     const checkAuth = async () => {
//       const savedUser = localStorage.getItem('user');
//       if (savedUser) {
//         setUser(JSON.parse(savedUser));
//       }
//       setLoading(false);
//     };
//     checkAuth();
//   }, []);


//   //login function
//   const register = async (userData) => {
//     try {
//       const data = await authService.register(userData);
//       setUser(data);
//       navigate('/');
//       return { success: true };
//     } catch (error) {
//       return { 
//         success: false, 
//         error: error.response?.data?.message || 'Registration failed' 
//       };
//     }
//   };

//   const login = async (credentials) => {
//     try {
//       const res = await authService.login(credentials);
//       setUser(res);
//       navigate('/');
//       return { success: true };
//     } catch (error) {
//       return { success: false, error: error.response?.data?.message || 'Login failed' };
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setToken(null);
//     setUser(null);
//     // Navigation removed from here - handle it in components
//   };
//   const checkAuth = async () => {
//     const savedUser = localStorage.getItem('user');
//     if (savedUser) {
//       setUser(JSON.parse(savedUser)); 
//     }
//   };

//   // const logout = () => {
//   //   localStorage.removeItem('token');
//   //   setToken(null);
//   //   setUser(null);
//   //   // Navigation removed from here - handle it in components
//   // };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import authService from '../api/Auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Initialize auth state and axios headers
  useEffect(() => {
    const initializeAuth = async () => {
      const savedToken = localStorage.getItem('token');
      
      if (savedToken) {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
          const userData = await authService.getMe(); // Add this to your authService
          setUser(userData);
          setToken(savedToken);
        } catch (error) {
          handleLogout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  // Update axios headers when token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

  const register = async (userData) => {
    try {
      const { user, token } = await authService.register(userData);
      setUser(user);
      setToken(token);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed'
      };
    }
  };

  const login = async (credentials) => {
    try {
      const { user, token } = await authService.login(credentials);
      setUser(user);
      setToken(token);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed'
      };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      register,
      login,
      logout
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);