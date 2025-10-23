/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import { envVars } from "../config/env";
import { TErrorSources } from "../interfaces/error.types";
import { handlerDuplicateError } from "../helpers/handleDuplicateError";


export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

     const errorSources: TErrorSources[] = [];
     let statusCode = 500
     let message = "Something Went Wrong!"



     // Duplicate Error
     if(err.code === 11000) {
          const simplifiedError = handlerDuplicateError(err);
          statusCode = simplifiedError.statusCode;
          message = simplifiedError.message;
     }






     if(err instanceof AppError) {
          statusCode = err.statusCode
          message = err.message
     } else if (err instanceof Error) {
          statusCode = 500;
          message = err.message
     }

     res.status(statusCode).json({
          success: false,
          message,
          err,
          stack: envVars.NODE_ENV === "development" ? err.stack : null
     })
}