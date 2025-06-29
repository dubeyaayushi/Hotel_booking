// import { useAuth } from '../context/AuthContext';
// import { Navigate } from 'react-router-dom';

// export default function ProtectedRoute({ children }) {
//   const { user } = useAuth();
//   return user ? children : <Navigate to="/login" />;
// }

// import { useAuth } from '../context/AuthContext';
// import { Navigate, Outlet } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';

// const ProtectedRoute = ({children}) => {
//   const { user, token, loading } = useAuth();
//   const location = useLocation();
  
//   // if (!user) {
//   //   return <Navigate to="/login" replace />;
//   // }
// if (loading) {
//     return <LoadingSpinner />; // Replace with your loading component
//   }
//   return <Outlet />;
// };

// export default ProtectedRoute;


import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, roles = [] }) => {
  const { user, token, loading } = useAuth();
  const location = useLocation();

  // If still loading, return null or empty fragment
  if (loading) {
    return null; // Or <></> for empty fragment
  }

  // If no token or user exists, redirect to login
  if (!token || !user) {
    return (
      <Navigate 
        to="/login" 
        state={{ from: location }} // Preserve the location they tried to access
        replace 
      />
    );
  }

  // Optional: Role-based access control
  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If using nested routes with Outlet
  if (children) {
    return children;
  }
  
  return <Outlet />;
};

export default ProtectedRoute;
