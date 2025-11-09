
const blogModel = require("../models/blog.models")


const cloudinary = require("../utils/cloudinary")

const addBlog = async (req, res) => {

    const { title, content, image } = req.body

    try {

        // Check if user is logged in or not

        let userId = req.user.userId;

      
        // Extract the image from the req
        const imageLocalPath = req.file.path;


        

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unaouthorized request"
            })
        }
        // try to create the request

        const cloudinaryURL = await cloudinary.uploadImageIntoCloudinary(imageLocalPath)

        const newBlog = await blogModel.create({
            title,userId,imageUrl:cloudinaryURL,content,status:"POSTED"
        })

        return res.status(200).json({
            success:true,
            message:{
                newBlog
            }
        })


    } catch (error) {
        console.log("Internal Sever Error :", error);
        return res.status(500).json({
            success: false,
            message: "Internal Sever"
        })
    }
}


module.exports = {
    addBlog
}