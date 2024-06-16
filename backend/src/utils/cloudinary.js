import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (filename) => {
    let localFilePath=`public/temp/${filename}`
  try {
    if (!filename) return null;

    const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" });
    fs.unlinkSync(localFilePath)
    // console.log(response);
    return response;
  } catch (error) {
    console.log("error while uploading in cloudinary : " + error.message);
    fs.unlinkSync(localFilePath)
    return null;
  }
}


export { uploadOnCloudinary }