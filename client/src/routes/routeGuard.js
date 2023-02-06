import React from 'react';
import { Navigate } from 'react-router-dom';
export function Protected({ children }) {
  if (localStorage.getItem('access_token')) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export function ProtectedAuth({ children }) {
  if (!localStorage.getItem('access_token')) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
