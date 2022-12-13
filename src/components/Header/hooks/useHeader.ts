import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { useErrorHandlers } from '../../../hooks/useErrorHandlers';

interface UseHeader {
  handleLogout: () => Promise<void>;
}

export const useHeader = (): UseHeader => {
  const { logOut } = useAuth();
  const { handleRequestError } = useErrorHandlers();
  const navigate = useNavigate();
  const handleLogout = useCallback(async () => {
    try {
      await logOut();
      navigate('/');
    } catch (err) {
      handleRequestError(err as AxiosError);
    }
  }, [handleRequestError, logOut, navigate]);

  return {
    handleLogout,
  };
};
