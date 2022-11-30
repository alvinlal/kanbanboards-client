import axiosClient from '..';
import SearchResponse from './types/SearchResponse';

export default (query: string, signal: AbortSignal) =>
  axiosClient.get<SearchResponse>(`/search?q=${encodeURIComponent(query)}`, {
    signal,
  });
