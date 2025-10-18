import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";


export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {

     try {

          // Get token from headers
          const accessToken = req.headers.authorization;

          if(!accessToken) {
               throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized to access this route");
          }

          // Verify token
          const decoded = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload;

          if(!authRoles.includes(decoded.role)) {
               throw new AppError(httpStatus.FORBIDDEN, "You are not allowed to access this route");
          }

          req.user = decoded;
          next();

     } catch(error) {
          next(error);
     }
}