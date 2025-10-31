
import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";
import { IsActive } from "../modules/user/user.interface";



export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {

     try {

          // Get token from headers
          const accessToken = req.headers.authorization;

          if(!accessToken) {
               throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized to access this route");
          }

          // Verify token
          const decoded = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload;


          const isUserExist = await User.findOne({ email: decoded.email });

          if (!isUserExist) {
               throw new AppError(httpStatus.NOT_FOUND, "User does not exist");
          }

          if(isUserExist.isActive === IsActive.BLOCKED || isUserExist.isActive === IsActive.INACTIVE) {
               throw new AppError(httpStatus.UNAUTHORIZED, "User is not allowed to access");
          }
          
          if(isUserExist.isDeleted) {
               throw new AppError(httpStatus.UNAUTHORIZED, "User is not allowed to access");
          }

          if (!isUserExist.isVerified) {
               throw new AppError(httpStatus.UNAUTHORIZED, "User is not verified");
          }


          if(!authRoles.includes(decoded.role)) {
               throw new AppError(httpStatus.FORBIDDEN, "You are not allowed to access this route");
          }

          req.user = decoded;
          next();

     } catch(error) {
          next(error);
     }
}