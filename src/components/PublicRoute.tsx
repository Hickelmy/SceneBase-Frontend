import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PublicRouteProps {
  children: ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Carregando...</div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/app/dashboard" replace />;
  }

  return <>{children}</>;
};
