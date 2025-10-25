import AppError from "../../errorHelpers/AppError";
import { ITour } from "./tour.interface";
import { Tour } from "./tour.model";
import httpStatus from "http-status-codes";


const createTour = async (payload: ITour) => {

     const existingTour = await Tour.findOne({ title: payload.title });

     if(existingTour) {
          throw new AppError(httpStatus.CONFLICT, "Tour already exists");
     }




     // const baseSlug = payload.title.toLowerCase().split(" ").join("-")
     // let slug = `${baseSlug}`

     // let counter = 0;
     // while (await Tour.exists({ slug })) {
     //     slug = `${slug}-${counter++}` // dhaka-division-2
     // }

     // payload.slug = slug;


     const tour = await Tour.create(payload);

     return tour;
}



export const TourServices = {
     createTour,
}