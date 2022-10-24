import axiosClient from '../api';
import SearchResponse from './types/SearchResponse';

export default (query: string) =>
  axiosClient.post<SearchResponse>(
    '/search',
    { query },
    { withCredentials: true }
  );
