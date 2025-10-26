
import AppError from "../../errorHelpers/AppError";
import { ITour, ITourType } from "./tour.interface";
import { Tour, TourType } from "./tour.model";
import httpStatus from "http-status-codes";




// -----------------------Tour Services-----------------------


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



const updateTour = async (id: string, payload: Partial<ITour>) => {

     const existingTour = await Tour.findById(id);

     if (!existingTour) {
          throw new AppError(httpStatus.NOT_FOUND, "Tour Not Found!")
     }

     // if (payload.title) {
     //     const baseSlug = payload.title.toLowerCase().split(" ").join("-")
     //     let slug = `${baseSlug}`

     //     let counter = 0;
     //     while (await Tour.exists({ slug })) {
     //         slug = `${slug}-${counter++}` // dhaka-division-2
     //     }

     //     payload.slug = slug
     // }

     const updatedTour = await Tour.findByIdAndUpdate(id, payload, { new: true });

     return updatedTour;
}

const deleteTour = async (id: string) => {

     return await Tour.findByIdAndDelete(id);
}




// -----------------------Tour Type Services-----------------------

const createTourType = async (payload: ITourType) => {

     const existingTourType = await TourType.findOne({ name: payload.name });

     if (existingTourType) {
          throw new AppError(httpStatus.CONFLICT, "Tour Type already exists");
     }

     return await TourType.create(payload);
}



const getAllTourTypes = async () => {
     return await TourType.find();
}



const updateTourType = async (id: string, payload: ITourType) => {

     const existingTourType = await TourType.findById(id);

     if (!existingTourType) {
          throw new AppError(httpStatus.NOT_FOUND, "Tour Type Not Found!")
     }

     return await TourType.findByIdAndUpdate(id, payload, { new: true });
}



const deleteTourType = async (id: string) => {

     const existingTourType = await TourType.findById(id);

     if (!existingTourType) {
          throw new AppError(httpStatus.NOT_FOUND, "Tour Type Not Found!")
     }

     return await TourType.findByIdAndDelete(id);
}






export const TourServices = {
     createTour,
     updateTour,
     deleteTour,
     createTourType,
     getAllTourTypes,
     updateTourType,
     deleteTourType,
}