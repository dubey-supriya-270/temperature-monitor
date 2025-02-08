
interface ErrorResponse {
  status: number;
  message: string;
  err_stack?: object;
}

export interface CustomError {
  statusCode?: number;
  customMessage: string;
}

import { Request, Response, NextFunction } from "express";

export default (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const errorResponse: ErrorResponse = {
    status: err.statusCode ? err.statusCode : 500,
    message: err.customMessage ? err.customMessage : "Please contact the ADMIN",
  };

  errorResponse.err_stack = err;

  res.status(errorResponse.status).send(errorResponse);
};
