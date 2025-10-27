
import { excludeField } from "../../constants/tour.constants";
import AppError from "../../errorHelpers/AppError";
import { tourSearchableFields } from "./tour.constant";
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





const getAllToursOld = async (query: Record<string, string>) => {

     const filter = query;
     const searchTerm = query.searchTerm || "";
     const sort = query.sort || "-createdAt";
     const page = Number(query.page) || 1;
     const limit = Number(query.limit) || 10;
     const skip = (page - 1) * limit;

     //field filtering
     const fields = query.fields?.split(",").join(" ") || "";

     //old field => title,location
     //new fields => title location





     // delete filter["searchTerm"]
     // delete filter["sort"]

     // OR--
     for (const field of excludeField) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
          delete filter[field]
     }



     const searchQuery = {
          $or: tourSearchableFields.map(field => ({ [field]: { $regex: searchTerm, $options: "i" } }))
     }





     // skip & limit
     // [remove][remove][remove](SKip)[][][][][][]

     // [][][][][](limit)[remove][remove][remove][remove]




     // 1 page => [1][1][1][1][1][1][1][1][1][1] skip = 0 limit =10
     // 2 page => [1][1][1][1][1][1][1][1][1][1]=>skip=>[2][2][2][2][2][2][2][2][2][2]<=limit skip = 10 limit =10
     // 3 page => [1][1][1][1][1][1][1][1][1][1]=>skip=>[2][2][2][2][2][2][2][2][2][2]<=limit skip = 20 limit = 10

     // skip = (page -1) * 10 = 30




     // SearchURL
     // ?page=3&limit=10





     // const tours = await Tour.find(searchQuery).find(filter).sort(sort).select(fields).skip(skip).limit(limit);

     // OR--Alternative
     const filterQuery = Tour.find(filter)

     const tours = filterQuery.find(searchQuery)

     const allTours = await tours.sort(sort).select(fields).skip(skip).limit(limit)

     // location = Dhaka
     // search = Golf 






     const totalTours = await Tour.countDocuments();
     // const totalPage = 21/10 = 2.1 => ciel(2.1) => 3
     const totalPage = Math.ceil(totalTours / limit)

     const meta = {
          page: page,
          limit: limit,
          total: totalTours,
          totalPage: totalPage,
     }
     return {
          data: allTours,
          meta: meta
     }
};





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
     getAllToursOld
}