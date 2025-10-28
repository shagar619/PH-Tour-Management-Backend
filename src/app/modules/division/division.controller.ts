import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import {  DivisionServices } from "./division.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";


const createDivision = catchAsync(async (req: Request, res: Response) => {

     const result = await DivisionServices.createDivision(req.body);

     sendResponse(res, {
          statusCode: httpStatus.CREATED,
          success: true,
          message: "Division created successfully!",
          data: result
     });
});



const getAllDivisions = catchAsync(async (req: Request, res: Response) => {

     const query = req.query;
     const result = await DivisionServices.getAllDivisions(query as Record<string, string>);

     sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "Divisions retrieved successfully!",
          data: result.data,
          meta: result.meta
     });
});



const getSingleDivision = catchAsync(async (req: Request, res: Response) => {

     const slug = req.params.slug;
     const result = await DivisionServices.getSingleDivision(slug);

     sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "Division retrieved successfully!",
          data: result.data
     });
});



const updateDivision = catchAsync(async (req: Request, res: Response) => {

     const id = req.params.id;

     const result = await DivisionServices.updateDivision(id, req.body);

     sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "Division updated successfully!",
          data: result
     });
});



const deleteDivision = catchAsync(async (req: Request, res: Response) => {

     const result = await DivisionServices.deleteDivision(req.params.id);

     sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "Division deleted successfully!",
          data: result
     });
});



export const DivisionController = {
     createDivision,
     getAllDivisions,
     getSingleDivision,
     updateDivision,
     deleteDivision
}