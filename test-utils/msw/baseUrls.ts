/* eslint-disable import/prefer-default-export */

export const apiEndPoint = (path: string) => {
  return import.meta.env.VITE_API_ENDPOINT + path;
};
