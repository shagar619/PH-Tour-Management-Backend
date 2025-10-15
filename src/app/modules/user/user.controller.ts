/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";



const createUser =catchAsync(async (req: Request, res: Response, next: NextFunction) => {

     const user = await UserServices.createUser(req.body);

     sendResponse(res, {
          success: true,
          statusCode: httpStatus.CREATED,
          message: "User Created Successfully",
          data: user
     });









     // try {

     //      const user = await UserServices.createUser(req.body);

     //      res.status(httpStatus.CREATED).json({
     //           message: `User Created Successfully!`,
     //           user
     //      })
     // } catch(err: any) {
     //      console.log(err);
     //      next(err);
     // }




})








export const UserControllers = {
     createUser,
}



// function => try-catch catch => req-res function
// route matching -> controller -> service -> model -> DB