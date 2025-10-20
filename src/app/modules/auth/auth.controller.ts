/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import AppError from "../../errorHelpers/AppError";


const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

     const loginInfo = await AuthService.credentialsLogin(req.body);

     sendResponse(res, {
          success: true,
          statusCode: httpStatus.OK,
          message: "User Logged In Successfully",
          data: loginInfo
     })
})




const getNewAccessToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
     
     const refreshToken = req.cookies.refreshToken;

     if(!refreshToken) {
          throw new AppError(httpStatus.UNAUTHORIZED, "Please provide refresh token");
     }

     const tokenInfo = await AuthService.getNewAccessToken(refreshToken as string);

     c

})



export const AuthControllers = {
     credentialsLogin
}