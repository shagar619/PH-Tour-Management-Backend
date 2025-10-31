/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { createNewAccessTokenWithRefreshToken, createUserTokens } from "../../utils/userTokens";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";


const credentialsLogin = async (payload: Partial<IUser>) => {

     const { email, password } = payload;

     const isUserExist = await User.findOne({ email });

     if (!isUserExist) {
          throw new AppError(httpStatus.NOT_FOUND, "User does not exist");
     }

     const isPasswordMatched = await bcryptjs.compare(password as string, isUserExist.password as string);

     if(!isPasswordMatched) {
          throw new AppError(httpStatus.UNAUTHORIZED, "Password is incorrect");
     }




     // const jwtPayload = {
     //      userId: isUserExist._id,
     //      email: isUserExist.email,
     //      role: isUserExist.role
     // }

     // const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES);

     // const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRES);



     // OR,
     const userTokens = createUserTokens(isUserExist);

     // eslint-disable-next-line @typescript-eslint/no-unused-vars
     const { password: pass, ...rest } = isUserExist.toObject();


     return { 
          accessToken: userTokens.accessToken,
          refreshToken: userTokens.refreshToken,
          user: rest
     };

};


const getNewAccessToken = async (refreshToken: string) => {

     const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken);

     return {
          accessToken: newAccessToken
     }
}



const resetPassword = async () => {

     return {}

}


const setPassword = async (userId: string, plainPassword: string) => {

     const user = await User.findById(userId);

     if (!user) {
          throw new AppError(
               httpStatus.NOT_FOUND,
               "User Not Found!"
          )
     }

     if (user.password && user.auths.some(providerObject => providerObject.provider === "google")) {
          throw new AppError(
               httpStatus.BAD_REQUEST,
               "You have already set your password. Now you can change the password from your profile password update."
          )
     }

     const hashedPassword = await bcryptjs.hash(
          plainPassword,
          Number(envVars.BCRYPT_SALT_ROUND)
     );

     const credentialProvider: IAuthProvider = {
          provider: "credentials",
          providerId: user.email
     }

     const auths: IAuthProvider[] = [...user.auths, credentialProvider];

     user.password = hashedPassword;
     user.auths = auths;

     await user.save()

}


const changePassword = async (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => {

     const user = await User.findById(decodedToken.userId)

     const isOldPasswordMatch = await bcryptjs.compare(oldPassword, user!.password as string)
     if (!isOldPasswordMatch) {
          throw new AppError(httpStatus.UNAUTHORIZED, "Old Password does not match");
     }

     user!.password = await bcryptjs.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUND))

     user!.save();

}








//user - login - token (email, role, _id) - booking / payment / booking / payment cancel - token

export const AuthService = {
     credentialsLogin,
     getNewAccessToken,
     resetPassword,
     changePassword,
     setPassword
}