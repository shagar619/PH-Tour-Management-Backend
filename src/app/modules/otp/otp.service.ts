import { redisClient } from "../../config/redis.config";
import AppError from "../../errorHelpers/AppError";
import { generateSecureOTP } from "../../utils/otpGenerator";
import { sendEmail } from "../../utils/sendEmail";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";


const OTP_EXPIRY_SECONDS = 2 * 60; // 52 minutes


const sendOTP = async (email: string, name: string) => {

     const user = await User.findOne({ email });

     if (!user) {
          throw new AppError(
               httpStatus.NOT_FOUND,
               "User not found!"
          )
     }

     if (user.isVerified) {
          throw new AppError(
               httpStatus.FORBIDDEN,
               "You are already verified!"
          )
     }

     const otp = generateSecureOTP(6);
     const redisKey = `otp:${email}`;

     await redisClient.set(redisKey, otp, {
          expiration: {
               type: "EX",
               value: OTP_EXPIRY_SECONDS
          }
     })

     await sendEmail({
          to: email,
          subject: "Your OTP Code",
          templateName: "otp",
          templateData: {
               name: name,
               otp: otp
          }
     })

}


const verifyOTP = async (email: string, otp: string) => {

     return{}
}


export const OTPService = {
     sendOTP,
     verifyOTP
}