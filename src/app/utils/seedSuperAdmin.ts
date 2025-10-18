/* eslint-disable no-console */
import { envVars } from "../config/env";
import { User } from "../modules/user/user.model";
import bcryptjs from "bcryptjs";


export const seedSuperAdmin = async () => {

     try {

     const isSuperAdminExist = await User.findOne({ email: envVars.SUPER_ADMIN_EMAIL });
          
     if (isSuperAdminExist) {
          console.log("Super Admin already exists");
          return;
     }

     const hashedPassword = await bcryptjs.hash(envVars.SUPER_ADMIN_PASSWORD, Number(envVars.BCRYPT_SALT_ROUND))

     } catch(error) {
          console.log("Failed to seed Super Admin:", error);
     }
}