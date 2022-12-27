import axios, { AxiosError } from 'axios';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { BadRequestException } from '../../types/BadRequestException';
import { UnauthorizedException } from '../../types/UnauthorizedException';

interface UseErrorHandler {
  handleRequestError: (err: AxiosError) => null | BadRequestException | UnauthorizedException;
}

export const useErrorHandlers = (): UseErrorHandler => {
  const handleRequestError = useCallback(
    (err: AxiosError): null | BadRequestException | UnauthorizedException => {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 400 || err.response?.status === 401) {
          return err.response.data;
        }
        if (err.response?.status === 500) {
          toast.error('something went wrong, please try again later');
        }
        if (err.code === 'ERR_NETWORK') {
          toast.error('failed to connect !');
        }
      }
      return null;
    },
    []
  );

  return { handleRequestError };
};
