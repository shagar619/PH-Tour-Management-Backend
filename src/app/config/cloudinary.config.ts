/* eslint-disable @typescript-eslint/no-explicit-any */
import { v2 as cloudinary } from "cloudinary";
import { envVars } from "./env";
import AppError from "../errorHelpers/AppError";
import httpStatus from "http-status-codes";


cloudinary.config({
     cloud_name: envVars.CLOUDINARY.CLOUDINARY_CLOUD_NAME,
     api_key: envVars.CLOUDINARY.CLOUDINARY_API_KEY,
     api_secret: envVars.CLOUDINARY.CLOUDINARY_API_SECRET
})


export const deleteImageFromCLoudinary = async (url: string) => {

     try {
          
          //https://res.cloudinary.com/djzppynpk/image/upload/v1753126572/ay9roxiv8ue-1753126570086-download-2-jpg.jpg.jpg

          const regex = /\/v\d+\/(.*?)\.(jpg|jpeg|png|gif|webp)$/i;

          const match = url.match(regex);

          if(match && match[1]) {
               const public_id = match[1];
               await cloudinary.uploader.destroy(public_id)
          }


     } catch(error: any) {
          throw new AppError(
               httpStatus.INTERNAL_SERVER_ERROR,
               `Failed to delete image from Cloudinary ${error.message}`
          )
     }
}





export const cloudinaryUpload = cloudinary;






// Frontend -> Form Data with Image File -> Multer -> Form data -> Req (Body + File)

// Our folder -> image -> form data -> File -> Multer -> Our project /In pc folder(temporary) -> Req.file

//req.file -> cloudinary(req.file) -> url -> mongoose -> mongodb



// const uploadToCloudinary = cloudinary.uploader.upload()

//

//Multer storage cloudinary
//Our folder -> image -> form data -> File -> Multer -> storage in cloudinary -> url ->  req.file  -> url  -> mongoose -> mongodb