import axiosClient from '..';
import { AllBoardsResponse } from './dto/response/AllBoardsResponse.dto';

export const getAllBoards = () =>
  axiosClient
    .get<AllBoardsResponse>('/boards/all', { withCredentials: true })
    .then((res) => res.data);
