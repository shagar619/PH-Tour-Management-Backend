import { IsActive } from "../user/user.interface";
import { User } from "../user/user.model";


const now = new Date();
const sevenDaysAgo = new Date(now).setDate(now.getDate() - 7);
const thirtyDaysAgo = new Date(now).setDate(now.getDate() - 30);




const getUserStats = async () => {

     const totalUsersPromise = User.countDocuments();

     const totalActiveUsersPromise = User.countDocuments({ isActive: IsActive.ACTIVE });
     const totalInActiveUsersPromise = User.countDocuments({ isActive: IsActive.INACTIVE });
     const totalBlockedUsersPromise = User.countDocuments({ isActive: IsActive.BLOCKED });

     const newUsersInLast7DaysPromise = User.countDocuments({
          createdAt: { $gte: sevenDaysAgo }
     });

     const newUsersInLast30DaysPromise = User.countDocuments({
          createdAt: { $gte: thirtyDaysAgo }
     });

     const usersByRolePromise = User.aggregate([
          // stage -1 : Grouping users by role and count total users in each role
          {
               $group: {
                    _id: "$role",
                    count: { $sum: 1 }
               }
          }
     ]);

     const [totalUsers, totalActiveUsers, totalInActiveUsers, totalBlockedUsers, newUsersInLast7Days, newUsersInLast30Days, usersByRole] = await Promise.all([
          totalUsersPromise,
          totalActiveUsersPromise,
          totalInActiveUsersPromise,
          totalBlockedUsersPromise,
          newUsersInLast7DaysPromise,
          newUsersInLast30DaysPromise,
          usersByRolePromise
     ]);

     return {
          totalUsers,
          totalActiveUsers,
          totalInActiveUsers,
          totalBlockedUsers,
          newUsersInLast7Days,
          newUsersInLast30Days,
          usersByRole
     }
}



const getTourStats = async () => {

     return null;
}



const getBookingStats = async () => {

     return null;
}



const getPaymentStats = async () => {

     return null;
}


export const StatsService = {
     getBookingStats,
     getPaymentStats,
     getTourStats,
     getUserStats
}