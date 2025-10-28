import AppError from "../../errorHelpers/AppError";
import { PAYMENT_STATUS } from "../payment/payment.interface";
import { Payment } from "../payment/payment.model";
import { Tour } from "../tour/tour.model";
import { User } from "../user/user.model";
import { BOOKING_STATUS, IBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { getTransactionId } from "./TransactionIdGenerator";
import httpStatus from "http-status-codes";


const createBooking = async (payload: Partial<IBooking>, userId: string) => {

     const transactionId = getTransactionId();


     const user = await User.findById(userId);

     // if (!user?.phone || !user?.address) {
     //      throw new AppError(
     //           httpStatus.BAD_REQUEST,
     //           "Please Update Your Profile to Book a Tour!"
     //      )
     // }

     const tour = await Tour.findById(payload.tour).select("costFrom");

     if(!tour?.costFrom) {
          throw new AppError(
               httpStatus.BAD_REQUEST,
               "No Tour Cost Found!"
          )
     }

     const amount = Number(tour.costFrom) * Number(payload.guestCount);

     const booking = await Booking.create({
          user: userId,
          status: BOOKING_STATUS.PENDING,
          ...payload
     });

     const payment = await Payment.create({
          booking: booking._id,
          status: PAYMENT_STATUS.UNPAID,
          transactionId: transactionId,
          amount: amount
     });

     const updateBooking = await Booking.findByIdAndUpdate(
          booking._id,
          { payment: payment._id },
          { new: true, runValidators: true }
     )

     return updateBooking;

}




const getUserBookings = async () => {

     return {}
};

const getBookingById = async () => {
     return {}
};

const updateBookingStatus = async () => {

     return {}
};

const getAllBookings = async () => {

     return {}
};



export const BookingService = {
     createBooking,
     getUserBookings,
     getBookingById,
     updateBookingStatus,
     getAllBookings,
};