import { Request, Response } from "express";
import { UserServices } from "./user.service";
import httpStatus from "http-status-codes";



const createUser = async (req: Request, res: Response) => {

     try {

          const user = await UserServices.createUser(req.body);

          res.status(httpStatus.CREATED).json({
               message: `User Created Successfully!`,
               user
          })
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     } catch(err: any) {
          // eslint-disable-next-line no-console
          console.log(err);
          res.status(httpStatus.BAD_REQUEST).json({
               message: `Something went wrong! ${err.message}`,
               err
          })
     }
}



export const UserControllers = {
     createUser,
}