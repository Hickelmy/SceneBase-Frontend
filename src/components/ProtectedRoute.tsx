import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Role } from '../types';

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
  directorOnly?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  adminOnly = false,
  directorOnly = false,
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Carregando...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (adminOnly && user.role !== Role.ADMIN) {
    return <Navigate to="/app/dashboard" replace />;
  }

  if (directorOnly && user.role !== Role.DIRECTOR && user.role !== Role.ADMIN) {
    return <Navigate to="/app/dashboard" replace />;
  }

  return <>{children}</>;
};
