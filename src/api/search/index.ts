import axiosClient from '../api';
import SearchResponse from './types/SearchResponse';

export default (query: string) =>
  axiosClient.get<SearchResponse>(`/search?q=${encodeURIComponent(query)}`);
