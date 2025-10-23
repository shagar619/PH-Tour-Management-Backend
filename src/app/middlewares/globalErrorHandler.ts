/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import { envVars } from "../config/env";
import { TErrorSources } from "../interfaces/error.types";
import { handlerDuplicateError } from "../helpers/handleDuplicateError";
import { handleCastError } from "../helpers/handleCastError";
import { handlerZodError } from "../helpers/handlerZodError";
import { handlerValidationError } from "../helpers/handlerValidationError";


export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

     let errorSources: TErrorSources[] = [];
     let statusCode = 500;
     let message = "Something Went Wrong!";



     // Duplicate Error
     if(err.code === 11000) {
          const simplifiedError = handlerDuplicateError(err);
          statusCode = simplifiedError.statusCode;
          message = simplifiedError.message;
          errorSources = simplifiedError.errorSources as TErrorSources[];
     }


     // Cast Error/ Invalid ObjectId Error
     else if (err.name === "CastError") {
          const simplifiedError = handleCastError(err);
          statusCode = simplifiedError.statusCode;
          message = simplifiedError.message;
          errorSources = simplifiedError.errorSources as TErrorSources[];
     }


     // zod Error
     else if (err.name === "ZodError") {
          const simplifiedError = handlerZodError(err);
          statusCode = simplifiedError.statusCode;
          message = simplifiedError.message;
          errorSources = simplifiedError.errorSources as TErrorSources[];
     }


     // Mongoose Validation Error
     else if (err.name === "ValidationError") {
          const simplifiedError = handlerValidationError(err);
          statusCode = simplifiedError.statusCode;
          message = simplifiedError.message;
          errorSources = simplifiedError.errorSources as TErrorSources[];
     }




     // Application Error
     else if(err instanceof AppError) {
          statusCode = err.statusCode
          message = err.message
     }


     // Generic Error
     else if (err instanceof Error) {
          statusCode = 500;
          message = err.message
     }


     // Send Error Response
     res.status(statusCode).json({
          success: false,
          message,
          errorSources,
          err: envVars.NODE_ENV === "development" ? err : null,
          stack: envVars.NODE_ENV === "development" ? err.stack : null
     })
}