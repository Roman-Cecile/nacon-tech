import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Rediriger vers la page de connexion avec l'emplacement actuel
    // pour pouvoir revenir après la connexion
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
