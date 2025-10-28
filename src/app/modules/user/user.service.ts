import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import bcrypt from "bcryptjs";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { userSearchableFields } from "./user.constant";




const createUser = async (payload: Partial<IUser>) => {

     const { email, password, ...rest } = payload;

     const isUserExist = await User.findOne({ email });

     if (isUserExist) {
          throw new AppError(httpStatus.CONFLICT, "User already exists!");
     }

     const hashedPassword = await bcrypt.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND));

     const authProvider: IAuthProvider = {
          provider: "credentials",
          providerId: email as string
     }

     const user = await User.create({
          email,
          password: hashedPassword,
          auths: [authProvider],
          ...rest
     });

     return user
}



const updateUser = async (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => {

     const ifUserExist = await User.findById(userId);

     if (!ifUserExist) {
          throw new AppError(httpStatus.NOT_FOUND, "User not found!");
     }

     /**
     * email - can not update
     * name, phone, password address
     * password - re hashing
     *  only admin & super admin - role, isDeleted...
     * 
     * promoting to super admin - super admin
     */

     if(payload.role) {
          if(decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
               throw new AppError(httpStatus.FORBIDDEN, "You are not allowed to change role!");
          }

          if(payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN) {
               throw new AppError(httpStatus.FORBIDDEN, "You are not allowed to promote to super admin!");
          }
     }

     if (payload.isActive || payload.isDeleted || payload.isVerified) {
          if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
               throw new AppError(httpStatus.FORBIDDEN, "You are not allowed to change status!");
          }
     }

     if (payload.password) {
          payload.password = await bcrypt.hash(payload.password as string, Number(envVars.BCRYPT_SALT_ROUND));
     }

     const newUpdateUser = await User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true });

     return newUpdateUser;

}




// const getAllUsers = async () => {

//      const users = await User.find({});
//      const totalUsers = await User.countDocuments();

//      return {
//           data: users,
//           meta : {
//                total: totalUsers
//           }
//      }
// };




// OR--->
const getAllUsers = async (query: Record<string, string>) => {

     const queryBuilder = new QueryBuilder(User.find(), query)
     const usersData = queryBuilder
          .filter()
          .search(userSearchableFields)
          .sort()
          .fields()
          .paginate();

     const [data, meta] = await Promise.all([
          usersData.build(),
          queryBuilder.getMeta()
     ])

     return {
          data,
          meta
     }
};




const getSingleUser = async (id: string) => {

     const user = await User.findById(id);

     return{
          data: user
     }
}



export const UserServices = {
     createUser,
     getAllUsers,
     getSingleUser,
     updateUser
}