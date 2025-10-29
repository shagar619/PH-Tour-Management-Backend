import { v2 as cloudinary } from "cloudinary";
import { envVars } from "./env";


cloudinary.config({
     cloud_name: envVars.CLOUDINARY.CLOUDINARY_CLOUD_NAME,
     api_key: envVars.CLOUDINARY.CLOUDINARY_API_KEY,
     api_secret: envVars.CLOUDINARY.CLOUDINARY_API_SECRET
})






export const cloudinaryUpload = cloudinary;






// Frontend -> Form Data with Image File -> Multer -> Form data -> Req (Body + File)

// Our folder -> image -> form data -> File -> Multer -> Our project /In pc folder(temporary) -> Req.file

//req.file -> cloudinary(req.file) -> url -> mongoose -> mongodb



// const uploadToCloudinary = cloudinary.uploader.upload()

//

//Multer storage cloudinary
//Our folder -> image -> form data -> File -> Multer -> storage in cloudinary -> url ->  req.file  -> url  -> mongoose -> mongodb