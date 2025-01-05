import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@lib/hooks/useAuth';
import { ROUTES } from '@lib/constants';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return <>{children}</>;
}