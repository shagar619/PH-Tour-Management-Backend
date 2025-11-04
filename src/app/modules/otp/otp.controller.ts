import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { OTPService } from "./otp.service";
import httpStatus from "http-status-codes";


const sendOTP = catchAsync(async (req: Request, res: Response) => {

     const { email, name } = req.body;

     await OTPService.sendOTP(email, name)

     sendResponse(res, {
          success: true,
          statusCode: httpStatus.OK,
          message: "OTP sent successfully.",
          data: null
     });
});

const verifyOTP = catchAsync(async (req: Request, res: Response) => {

     const { email, otp } = req.body;

     await OTPService.verifyOTP(email, otp)

     sendResponse(res, {
          success: true,
          statusCode: httpStatus.OK,
          message: "OTP verify successfully",
          data: null
     });
});

export const OTPController = {
     sendOTP,
     verifyOTP
}