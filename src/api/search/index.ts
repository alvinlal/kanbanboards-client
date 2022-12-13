import axiosClient from '..';
import { SearchResponseDto } from './dto/SearchResponse.dto';

export default (query: string, signal: AbortSignal) =>
  axiosClient.get<SearchResponseDto>(`/search?q=${encodeURIComponent(query)}`, {
    signal,
  });
