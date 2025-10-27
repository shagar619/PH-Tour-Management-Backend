import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { TourServices } from "./tour.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";



// -----------------------Tour Controller-----------------------


const createTour = catchAsync(async (req: Request, res: Response) => {

     const result = await TourServices.createTour(req.body);

     sendResponse(res, {
          statusCode: httpStatus.CREATED,
          success: true,
          message: "Tour Created Successfully",
          data: result
     });
});



const getAllTours = catchAsync(async (req: Request, res: Response) => {

     const query = req.query;
     const result = await TourServices.getAllTours(query as Record<string, string>);

     sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "Tours retrieved successfully",
          data: result.data,
          meta: result.meta
     });
});



const updateTour = catchAsync(async (req: Request, res: Response) => {

     const result = await TourServices.updateTour(req.params.id, req.body);

     sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "Tour Updated Successfully!",
          data: result
     });
});


const deleteTour = catchAsync(async (req: Request, res: Response) => {

     
     const result = await TourServices.deleteTour(req.params.id);

     sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "Tour deleted successfully!",
          data: result
     });
});







// -----------------------Tour Type Controller-----------------------

const createTourType = catchAsync(async (req: Request, res: Response) => {

     const result = await TourServices.createTourType(req.body);

     sendResponse(res, {
          statusCode: httpStatus.CREATED,
          success: true,
          message: "Tour Type Created Successfully!",
          data: result
     });
});



const getAllTourTypes = catchAsync(async (req: Request, res: Response) => {

     const result = await TourServices.getAllTourTypes();

     sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "Tour types retrieved successfully",
          data: result
     });
});



const updateTourType = catchAsync(async (req: Request, res: Response) => {

     const result = await TourServices.updateTourType(req.params.id, req.body.name);

     sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "Tour Type Updated Successfully!",
          data: result
     });
});



const deleteTourType = catchAsync(async (req: Request, res: Response) => {


     const result = await TourServices.deleteTourType(req.params.id);

     sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "Tour Type deleted successfully!",
          data: result
     });
});



export const TourController = {
     createTour,
     getAllTours,
     updateTour,
     deleteTour,
     createTourType,
     getAllTourTypes,
     updateTourType,
     deleteTourType
}