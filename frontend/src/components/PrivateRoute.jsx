import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext'; // asegurate de que la ruta es correcta

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  console.log("Mostrando isAuthenticated:", isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
