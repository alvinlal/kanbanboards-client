import axios, { AxiosError } from 'axios';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { BadRequestException } from '../types/BadRequestException';

interface UseErrorHandler {
  handleRequestError: (err: AxiosError) => null | BadRequestException;
}

const useErrorHandlers = (): UseErrorHandler => {
  const handleRequestError = useCallback((err: AxiosError): null | BadRequestException => {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 400) {
        return err.response.data;
      }
      if (err.response?.status === 401) {
        toast.error('Unauthorized');
      }
      if (err.response?.status === 500) {
        toast.error('something went wrong, please try again later');
      }
      if (err.code === 'ERR_NETWORK') {
        toast.error('failed to connect !');
      }
    }
    return null;
  }, []);

  return { handleRequestError };
};

export default useErrorHandlers;
