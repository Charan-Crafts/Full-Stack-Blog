const cloudinary = require('cloudinary').v2

const fileSystem = require("fs")

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECERT
})

const uploadImageIntoCloudinary = async (localFilePath) => {
    try {
        const response = await cloudinary.v2.uploader.upload(localFilePath);

        // Once the file is upload in the cloudinary remove the file from the local

        fileSystem.unlinkSync(localFilePath)

        return response.url;
    } catch (error) {
        console.log("Cloudinary Error ", error);
        fileSystem.unlinkSync(localFilePath)
    }
}

module.exports = uploadImageIntoCloudinary