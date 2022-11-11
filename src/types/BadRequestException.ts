export type BadRequestException = {
  statusCode: 400;
  message: {
    property: string;
    constraints: {
      [key: string]: string;
    };
  }[];
  error: 'Bad Request';
};
