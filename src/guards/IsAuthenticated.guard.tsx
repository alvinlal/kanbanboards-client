import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser/useUser';

const IsAuthenticated: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children as React.ReactElement;
};

export default IsAuthenticated;
