import axiosClient from '..';
import { CreateBoardRequestDto } from './dto/request/CreateBoardRequest.dto';
import { AllBoardsResponseDto } from './dto/response/AllBoardsResponse.dto';
import { CreateBoardResponseDto } from './dto/response/CreateBoardResponse.dto';

export const getAllBoards = () =>
  axiosClient
    .get<AllBoardsResponseDto>('/boards/all', { withCredentials: true })
    .then((res) => res.data);

export const createBoard = (data: CreateBoardRequestDto) =>
  axiosClient
    .post<CreateBoardResponseDto>('/boards/new', data, { withCredentials: true })
    .then((res) => res.data);
