/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import AppError from "../../errorHelpers/AppError";
import { setAuthCookie } from "../../utils/setCookie";
import { JwtPayload } from "jsonwebtoken";
import { createUserTokens } from "../../utils/userTokens";
import { envVars } from "../../config/env";
import passport from "passport";






// Manually handle login with email and password

// const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

//      const loginInfo = await AuthService.credentialsLogin(req.body);


     // res.cookie("accessToken", loginInfo.accessToken, {
     // httpOnly: true,
     // secure: false
     // });

     // res.cookie("refreshToken", loginInfo.refreshToken, {
     // httpOnly: true,
     // secure: false,
     // });


     // OR,
//      setAuthCookie(res, loginInfo);


//      sendResponse(res, {
//           success: true,
//           statusCode: httpStatus.OK,
//           message: "User Logged In Successfully",
//           data: loginInfo
//      });
// })







// Handling login using passport local strategy

const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

     passport.authenticate("local", async (err: any, user: any, info: any) => {

          if (err) {
               return next(new AppError(httpStatus.UNAUTHORIZED, err));
          }

          if (!user) {
               return next(new AppError(httpStatus.UNAUTHORIZED, info.message || "Login failed"));
          }

          const  userTokens = await createUserTokens(user);

          // delete user.toObject().password

          // OR,
          const { password: pass, ...rest } = user.toObject();

          // Set cookies
          setAuthCookie(res, userTokens);

          sendResponse(res, {
               success: true,
               statusCode: httpStatus.OK,
               message: "User Logged In Successfully",
               data: {
                    accessToken: userTokens.accessToken,
                    refreshToken: userTokens.refreshToken,
                    user: rest
               }
          })
     })(req, res, next);
})








const getNewAccessToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
     
     const refreshToken = req.cookies.refreshToken;

     if(!refreshToken) {
          throw new AppError(httpStatus.UNAUTHORIZED, "Please provide refresh token");
     }

     const tokenInfo = await AuthService.getNewAccessToken(refreshToken as string);

     // res.cookie("accessToken", tokenInfo.accessToken, {
     //     httpOnly: true,
     //     secure: false
     // })

     setAuthCookie(res, tokenInfo);

     sendResponse(res, {
          success: true,
          statusCode: httpStatus.OK,
          message: "New access token generated successfully",
          data: tokenInfo
     });

})


const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

     res.clearCookie("accessToken", {
          httpOnly: true,
          secure: false,
          sameSite: "lax"
     })

     res.clearCookie("refreshToken", {
          httpOnly: true,
          secure: false,
          sameSite: "lax"
     })

     sendResponse(res, {
          success: true,
          statusCode: httpStatus.ACCEPTED,
          message: "User logged out successfully!",
          data: null
     })

})


const resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

     const newPassword = req.body.newPassword;
     const oldPassword = req.body.oldPassword;
     const decodedToken = req.user

     await AuthService.resetPassword(oldPassword, newPassword, decodedToken as JwtPayload);

     sendResponse(res, {
          success: true,
          statusCode: httpStatus.OK,
          message: "Password Changed Successfully",
          data: null,
     });
})


const googleCallbackController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

     let redirectTo = req.query.state ? req.query.state as string : "/";

     if (redirectTo.startsWith("/")) {
          redirectTo = redirectTo.slice(1);
     }

     const user = req.user;

     if (!user) {
          throw new AppError(httpStatus.UNAUTHORIZED, "Google authentication failed");
     }

     const tokenInfo = createUserTokens(user);

     setAuthCookie(res, tokenInfo);

    // sendResponse(res, {
    //     success: true,
    //     statusCode: httpStatus.OK,
    //     message: "Password Changed Successfully",
    //     data: null,
    // })

     res.redirect(`${envVars.FRONTEND_URL || "http://localhost:5173"}/${redirectTo}`);

})



export const AuthControllers = {
     credentialsLogin,
     getNewAccessToken,
     logout,
     resetPassword,
     googleCallbackController
}